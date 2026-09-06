import { NextResponse, type NextRequest } from "next/server";
import { verifySignedToken, verifyAdminSession } from "@/lib/security";

// Public routes that are always exempt from blocking
const PUBLIC_EXEMPT_ROUTES = [
  "/access-denied",
  "/api/auth/admin-login",
  "/api/auth/admin-logout",
  "/api/auth/generate-token",
  "/favicon.ico",
];

// Helper to extract the normalized template key (e.g. "business/luxe-beauty" or "celebrations/cinematic-birthday")
function extractTemplateKey(pathname: string): string | null {
  const match = pathname.match(/^\/(?:templates|preview|share)\/([a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+)/);
  if (match) {
    return match[1].toLowerCase();
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Skip static assets, next internal files, and exempt routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    PUBLIC_EXEMPT_ROUTES.some((route) => pathname === route || pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // 2. Check for Admin Session (Passcode verified)
  const adminCookie = request.cookies.get("aura_admin_session")?.value;
  const isAdmin = await verifyAdminSession(adminCookie);

  // If Admin is logged in, grant full unrestricted access
  if (isAdmin) {
    return NextResponse.next();
  }

  // 3. Handle Signed Share Route: /share/[...slug]?token=...
  if (pathname.startsWith("/share/")) {
    const resourceSlug = pathname.replace(/^\/share\//, "").replace(/\/$/, "");
    const token = searchParams.get("token") || request.cookies.get(`aura_token_${resourceSlug.replace(/[^a-zA-Z0-9]/g, "_")}`)?.value;

    if (!token) {
      const redirectUrl = new URL("/access-denied", request.url);
      redirectUrl.searchParams.set("reason", "missing_token");
      redirectUrl.searchParams.set("attempted", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const isValid = await verifySignedToken(token, resourceSlug);
    if (!isValid) {
      // User tampered with the URL
      const redirectUrl = new URL("/access-denied", request.url);
      redirectUrl.searchParams.set("reason", "invalid_or_altered_token");
      redirectUrl.searchParams.set("attempted", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    const response = NextResponse.next();
    response.cookies.set("aura_locked_template", resourceSlug.toLowerCase(), {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    response.cookies.set("aura_last_allowed_url", `${pathname}?token=${token}`, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    return response;
  }

  // 4. Handle Direct Template URLs (e.g. /templates/business/luxe-beauty or /preview/business/luxe-beauty)
  const currentTemplateKey = extractTemplateKey(pathname);

  if (currentTemplateKey) {
    const lockedTemplateKey = request.cookies.get("aura_locked_template")?.value;
    const tokenParam = searchParams.get("token");

    // Case A: User is already locked to a template and tries to edit the URL to a DIFFERENT template
    if (lockedTemplateKey && lockedTemplateKey !== currentTemplateKey) {
      // Check if they provided a valid signed token specifically for the new template
      if (tokenParam) {
        const isValid = await verifySignedToken(tokenParam, currentTemplateKey);
        if (isValid) {
          // Token matches new template, update lock
          const response = NextResponse.next();
          response.cookies.set("aura_locked_template", currentTemplateKey, {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
          });
          response.cookies.set("aura_last_allowed_url", pathname, {
            path: "/",
            httpOnly: false,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
          });
          return response;
        }
      }

      // Blocked! User tampered with URL to jump to another template
      const redirectUrl = new URL("/access-denied", request.url);
      redirectUrl.searchParams.set("reason", "tampered_url");
      redirectUrl.searchParams.set("attempted", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Case B: First entry to this template or revisiting the same allowed template
    const response = NextResponse.next();
    response.cookies.set("aura_locked_template", currentTemplateKey, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax",
    });
    response.cookies.set("aura_last_allowed_url", pathname, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    return response;
  }

  // 5. If root catalog page '/', allow only if no active template lock is enforcing single-template view,
  // or allow visiting root to see catalog
  if (pathname === "/") {
    return NextResponse.next();
  }

  // 6. Any other route (e.g. /templates/business overview, /dashboard, etc.)
  const lockedTemplate = request.cookies.get("aura_locked_template")?.value;
  if (lockedTemplate) {
    // User is locked to a specific template and tried to navigate elsewhere
    const redirectUrl = new URL("/access-denied", request.url);
    redirectUrl.searchParams.set("reason", "tampered_url");
    redirectUrl.searchParams.set("attempted", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
