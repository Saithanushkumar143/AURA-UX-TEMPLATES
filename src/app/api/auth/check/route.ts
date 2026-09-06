import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME);
  const isAuthenticated = !!(sessionCookie && sessionCookie.value.startsWith("aura_admin_authenticated_"));

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}
