
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from '@/lib/userStore';
import { writeFileSync } from "fs";
import path from "path";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }
  const existingUser = users.find(user => user.email === email);
if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }
const hashedPassword = await bcrypt.hash(password, 10);
const filePath = path.join(process.cwd(), "data", "users.ts"); 
  writeFileSync(filePath, JSON.stringify(users, null, 2));
 users.push({ email, password: hashedPassword });
 
  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
