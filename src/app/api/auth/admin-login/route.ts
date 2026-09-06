import { NextResponse } from "next/server";
import { ADMIN_PASSCODE, generateAdminSessionSignature } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode || passcode.trim() !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { success: false, error: "Invalid Admin Passcode" },
        { status: 401 }
      );
    }

    const sessionSig = await generateAdminSessionSignature();
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful. Full access unlocked.",
    });

    // Set secure admin session cookie (valid for 7 days)
    response.cookies.set("aura_admin_session", sessionSig, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
