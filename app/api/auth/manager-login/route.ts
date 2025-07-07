
import { type NextRequest, NextResponse } from "next/server";
import { findUserByEmail, verifyPassword, generateToken } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

const db = await getDatabase();
    const user = await db.collection("users").findOne({ email, role: "manager" });

    if (!user) {
      return NextResponse.json({ error: "Invalid manager credentials" }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid manager credentials" }, { status: 401 });
    }

    const token = generateToken(user._id.toString());

    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return NextResponse.json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    console.error("Manager login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

