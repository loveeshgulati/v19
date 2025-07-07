import { type NextRequest, NextResponse } from "next/server"
import { getCustomers, createCustomer } from "@/lib/db-operations"
import type { Customer } from "@/lib/models/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const industry = searchParams.get("industry")
    const companySize = searchParams.get("companySize")
    const assignedTo = searchParams.get("assignedTo")
    const search = searchParams.get("search")

    const filters = {
      status: status || undefined,
      industry: industry || undefined,
      companySize: companySize || undefined,
      assignedTo: assignedTo || undefined,
      search: search || undefined,
    }

    const customers = await getCustomers(filters)
    return NextResponse.json(customers)
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.contactPerson || !body.email) {
      return NextResponse.json({ error: "Name, contact person, and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create customer in database
    const newCustomer = await createCustomer(body as Omit<Customer, "_id" | "createdAt" | "updatedAt">)
    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
