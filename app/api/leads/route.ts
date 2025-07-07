import { type NextRequest, NextResponse } from "next/server"
import { getLeads, createLead } from "@/lib/db-operations"
import type { Lead } from "@/lib/models/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const source = searchParams.get("source")
    const assignedTo = searchParams.get("assignedTo")
    const search = searchParams.get("search")

    const filters = {
      status: status || undefined,
      priority: priority || undefined,
      source: source || undefined,
      assignedTo: assignedTo || undefined,
      search: search || undefined,
    }

    const leads = await getLeads(filters)
    return NextResponse.json(leads)
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.assignedTo) {
      return NextResponse.json({ error: "Name, email, company, and assigned to are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create lead in database
    const newLead = await createLead(body as Omit<Lead, "_id" | "createdAt" | "updatedAt">)
    return NextResponse.json(newLead, { status: 201 })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
