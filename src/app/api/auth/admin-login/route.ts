import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminPasscode } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode } = body;

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, message: "Passcode is required." },
        { status: 400 }
      );
    }

    if (!verifyAdminPasscode(passcode)) {
      return NextResponse.json(
        { success: false, message: "Invalid admin authorization passcode." },
        { status: 401 }
      );
    }

    // Set secure auth cookie
    const response = NextResponse.json({
      success: true,
      message: "Admin authorization successful.",
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: "aura_admin_authenticated_" + Date.now(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error during authorization." },
      { status: 500 }
    );
  }
}
