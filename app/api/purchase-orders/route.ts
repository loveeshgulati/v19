import { type NextRequest, NextResponse } from "next/server"
import { getPurchaseOrders, createPurchaseOrder } from "@/lib/db-operations"
import { verifyToken, findUserById } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Get authentication token
    const authHeader = request.headers.get("authorization")
    let user = null
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7)
      const decoded = verifyToken(token)
      if (decoded) {
        user = await findUserById(decoded.userId)
      }
    }

    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get("status") || undefined,
      supplier: searchParams.get("supplier") || undefined,
      assignedTo: searchParams.get("assignedTo") || undefined,
    }

    // If user is a supplier, force filter by their name/email
    if (user && user.role === 'supplier') {
      filters.supplier = user.name || user.email
      console.log(`🔍 Filtering orders for supplier: ${filters.supplier}`)
    }

    const orders = await getPurchaseOrders(filters)
    console.log(`📦 Found ${orders.length} orders for filters:`, filters)
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching purchase orders:", error)
    return NextResponse.json({ error: "Failed to fetch purchase orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.supplier || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Supplier and items are required" }, { status: 400 })
    }

    // Calculate total amount
    const totalAmount = body.items.reduce((sum: number, item: any) => sum + item.quantity * item.unitPrice, 0)

    // Generate order number
    const orderNumber = `PO-${Date.now()}`

    const newOrder = await createPurchaseOrder({
      orderNumber,
      supplier: body.supplier,
      assignedTo: body.assignedTo || "Unassigned",
      status: body.status || "Draft",
      items: body.items,
      totalAmount,
      orderDate: new Date().toISOString().split("T")[0],
      expectedDelivery:
        body.expectedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      notes: body.notes || "",
    })

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating purchase order:", error)
    return NextResponse.json({ error: "Failed to create purchase order" }, { status: 500 })
  }
}
