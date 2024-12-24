import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies handler for Next.js

export async function GET() {
  try {
    // Access cookies using the Next.js `cookies` helper
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { status: false, message: "No token provided" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, "hello"); // Replace "hello" with your secret key

    return NextResponse.json(
      { status: true, message: "Authorized", decoded },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { status: false, message: "Unauthorized", error: e.message },
      { status: 401 }
    );
  }
}
