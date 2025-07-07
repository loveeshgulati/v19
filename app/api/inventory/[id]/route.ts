import { NextRequest, NextResponse } from "next/server"
import { updateInventoryItem, deleteInventoryItem } from "@/lib/db-operations"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { id } = params

    // Validate required fields
    if (!body.name || !body.category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 })
    }

    // Determine stock status based on current stock
    let status: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock"
    if (body.currentStock === 0) {
      status = "Out of Stock"
    } else if (body.currentStock <= body.minStock) {
      status = "Low Stock"
    }

    const updatedItem = await updateInventoryItem(id, {
      ...body,
      status,
      lastUpdated: new Date().toISOString().split("T")[0],
    })

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("Error updating inventory item:", error)
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const deletedItem = await deleteInventoryItem(id)

    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Item deleted successfully" })
  } catch (error) {
    console.error("Error deleting inventory item:", error)
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
  }
}
