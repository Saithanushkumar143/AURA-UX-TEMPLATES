import { NextResponse } from "next/server";
import { generateSignedToken } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { resourceSlug, expiresInHours } = body;

    if (!resourceSlug) {
      return NextResponse.json(
        { success: false, error: "resourceSlug is required" },
        { status: 400 }
      );
    }

    const token = await generateSignedToken(resourceSlug, expiresInHours || 72);
    const origin = request.headers.get("origin") || request.headers.get("referer") || "";
    const baseUrl = origin ? new URL(origin).origin : "";
    const cleanSlug = resourceSlug.replace(/^\/+|\/+$/g, "");
    const shareUrl = `${baseUrl}/share/${cleanSlug}?token=${token}`;

    return NextResponse.json({
      success: true,
      resourceSlug: cleanSlug,
      token,
      shareUrl,
      expiresInHours: expiresInHours || 72,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to generate signed token" },
      { status: 500 }
    );
  }
}
