
import { type NextRequest, NextResponse } from "next/server";
import { findUserByEmail, verifyPassword, generateToken, checkSupplierStatus } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

const db = await getDatabase();
    const user = await db.collection("users").findOne({ email, role: "supplier" });

    if (!user) {
      return NextResponse.json({ error: "Invalid supplier credentials" }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid supplier credentials" }, { status: 401 });
    }

    if (user.role === 'supplier' && user.supplierId) {
      const supplierStatus = await checkSupplierStatus(user.supplierId);
      if (supplierStatus && supplierStatus.toLowerCase() !== 'active') {
        return NextResponse.json({ 
          error: `Access denied. Your supplier account status is '${supplierStatus}'. Please contact support.` 
        }, { status: 403 });
      }
    }

    const token = generateToken(user._id.toString());

    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      supplierId: user.supplierId,
    };

    return NextResponse.json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    console.error("Supplier login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

