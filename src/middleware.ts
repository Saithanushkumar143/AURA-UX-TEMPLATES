import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, isValidTemplateRoute } from "./lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass static files, internal Next.js paths, public assets, and auth APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|css|js|ico|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Allow direct access to Admin Login & Access Denied pages
  if (pathname === "/admin/login" || pathname === "/access-denied") {
    return NextResponse.next();
  }

  // Check admin session
  const adminCookie = request.cookies.get(ADMIN_COOKIE_NAME);
  const isAuthenticated = Boolean(
    adminCookie && adminCookie.value.startsWith("aura_admin_authenticated_")
  );

  // 3. Allow direct template access if it is a recognized valid template or preview route
  if (isValidTemplateRoute(pathname)) {
    return NextResponse.next();
  }

  // 4. Main Domain & Protected Routes:
  // If user is authenticated, let them access the main hub "/" and all categories
  if (pathname === "/" || pathname === "/templates" || pathname === "/templates/business" || pathname === "/templates/celebrations") {
    if (isAuthenticated) {
      return NextResponse.next();
    }
    // Unauthorized visitor attempting to access main domain or category listing -> Redirect to Admin Login Gate
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Tampered or Unknown URL:
  // If someone tries to tamper with the URL or guess unauthorized paths:
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("tamper", "1");
    loginUrl.searchParams.set("target", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
