import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret_key";
const REFRESH_SECRET = "refresh_secret_key";

export async function POST(req: Request) {
  const cookieStore = await cookies(); 
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token provided" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { email: string };

    const newToken = jwt.sign({ email: payload.email }, JWT_SECRET, { expiresIn: "15m" });

    const response = NextResponse.json({ message: "Token refreshed" }, { status: 200 });

    response.cookies.set("token", newToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15,
      sameSite: "strict",
    });

    return response;
  } catch (err) {
    console.error("Refresh token error:", err);
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  }
}
