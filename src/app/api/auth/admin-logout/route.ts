import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session cleared. Public restrictions restored.",
  });

  // Clear admin session cookie
  response.cookies.delete("aura_admin_session");
  return response;
}
