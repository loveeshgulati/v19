import { NextRequest, NextResponse } from "next/server"
import { getInventoryItems, createInventoryItem } from "@/lib/db-operations"
import { verifyToken, findUserById } from "@/lib/auth"
import type { InventoryItem } from "@/lib/models/inventory"

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
      category: searchParams.get("category") || undefined,
      status: searchParams.get("status") || undefined,
      location: searchParams.get("location") || undefined,
      search: searchParams.get("search") || undefined,
      supplier: searchParams.get("supplier") || undefined,
    }

    // If user is a supplier, force filter by their name/email
    if (user && user.role === 'supplier') {
      filters.supplier = user.name || user.email
    }

    const inventory = await getInventoryItems(filters)
    return NextResponse.json(inventory)
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.category || !body.sku) {
      return NextResponse.json({ error: "Name, category, and SKU are required" }, { status: 400 })
    }

    // Determine stock status based on current stock
    let status: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock"
    if (body.currentStock === 0) {
      status = "Out of Stock"
    } else if (body.currentStock <= body.minStock) {
      status = "Low Stock"
    }

    const newItem = await createInventoryItem({
      ...body,
      status,
      lastUpdated: new Date().toISOString().split("T")[0],
    })

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("Error creating inventory item:", error)
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 })
  }
}
