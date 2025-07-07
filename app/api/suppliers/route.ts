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

    const newSupplier = await createSupplier({
      ...body,
      rating: body.rating || 0,
      onTimeDelivery: body.onTimeDelivery || 0,
      totalOrders: body.totalOrders || 0,
      totalValue: body.totalValue || 0,
      status: body.status || "Active",
    })

    return NextResponse.json(newSupplier, { status: 201 })
  } catch (error) {
    console.error("Error creating supplier:", error)
    return NextResponse.json({ error: "Failed to create supplier" }, { status: 500 })
  }
}
