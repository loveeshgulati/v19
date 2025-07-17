import { NextRequest, NextResponse } from "next/server"
import { updatePurchaseOrderStatus, getPurchaseOrderById } from "@/lib/db-operations"
import { verifyToken, findUserById } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { id } = params

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

    // Validate required fields
    if (!body.status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // Valid status options
    const validStatuses = ["Draft", "Pending Approval", "Approved", "Processing", "In Transit", "Delivered", "Cancelled"]
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    console.log(`📦 Updating order ${id} status to: ${body.status}`)

    const updated = await updatePurchaseOrderStatus(id, body.status)

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    console.log(`✅ Order ${id} status updated successfully`)
    return NextResponse.json({ message: "Order status updated successfully", status: body.status })
  } catch (error) {
    console.error("❌ Error updating purchase order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    // Implement get single order logic here
    const order = await getPurchaseOrderById(id)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching purchase order:", error)
    return NextResponse.json({ error: "Failed to fetch purchase order" }, { status: 500 })
  }
}
