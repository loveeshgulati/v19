import { type NextRequest, NextResponse } from "next/server"
import { createUser, findUserByEmail, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, companyName, supplierId } = await request.json()

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Name, email, password, and role are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Validate role
    if (!['manager', 'supplier'].includes(role)) {
      return NextResponse.json({ error: "Role must be either 'manager' or 'supplier'" }, { status: 400 })
    }

    // Additional validation for supplier role
    if (role === 'supplier' && !supplierId) {
      return NextResponse.json({ error: "Supplier ID is required for supplier role" }, { status: 400 })
    }

    // Check if user already exists
    console.log("Checking for existing user with email:", email)
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      console.log("User already exists:", existingUser.email)
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Create new user
    console.log("Creating new user with email:", email, "role:", role)
    const user = await createUser(name, email, password, role, companyName, supplierId)
    const token = generateToken(user._id.toString())

    console.log("User created successfully:", user.email, "with role:", user.role)

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        supplierId: user.supplierId,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
