import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "@/lib/userStore";

const JWT_SECRET = "secret_key";
const REFRESH_SECRET = "refresh_secret_key";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate tokens
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ email }, REFRESH_SECRET, { expiresIn: "7d" });

  const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

  // Set cookies (httpOnly)
  response.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 15, sameSite: "strict" });
  response.cookies.set("refreshToken", refreshToken, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "strict" });

  return response;
}
