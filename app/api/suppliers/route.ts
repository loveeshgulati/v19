import { type NextRequest, NextResponse } from "next/server"
import { getSuppliers, createSupplier } from "@/lib/db-operations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get("status") || undefined,
      category: searchParams.get("category") || undefined,
      search: searchParams.get("search") || undefined,
    }

    const suppliers = await getSuppliers(filters)
    return NextResponse.json(suppliers)
  } catch (error) {
    console.error("Error fetching suppliers:", error)
    return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.contactPerson || !body.email) {
      return NextResponse.json({ error: "Name, contact person, and email are required" }, { status: 400 })
    }

    // Validate password
    if (!body.password) {
      return NextResponse.json({ error: "Password is required for supplier login" }, { status: 400 })
    }

    console.log(`📝 Creating supplier: ${body.name} (${body.email})`);

    const newSupplier = await createSupplier({
      ...body,
      rating: body.rating || 5.0,
      onTimeDelivery: body.onTimeDelivery || 100,
      totalOrders: body.totalOrders || 0,
      totalValue: body.totalValue || 0,
      status: body.status || "Active"
    })

    console.log(`✅ Supplier created successfully: ${newSupplier.name}`);
    return NextResponse.json(newSupplier, { status: 201 })
  } catch (error) {
    console.error("❌ Error creating supplier:", error)
    
    // Return specific error messages
    if (error instanceof Error) {
      if (error.message.includes('already exists')) {
        return NextResponse.json({ error: error.message }, { status: 409 })
      }
      if (error.message.includes('required')) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Failed to create supplier" }, { status: 500 })
  }
}
