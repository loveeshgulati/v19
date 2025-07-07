import { type NextRequest, NextResponse } from "next/server"
import { getCampaigns, createCampaign } from "@/lib/db-operations"
import type { Campaign } from "@/lib/models/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const search = searchParams.get("search")

    const filters = {
      status: status || undefined,
      type: type || undefined,
      search: search || undefined,
    }

    const campaigns = await getCampaigns(filters)
    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.type || !body.startDate || !body.endDate || !body.goals) {
      return NextResponse.json({ error: "Name, type, start date, end date, and goals are required" }, { status: 400 })
    }

    // Validate date range
    const startDate = new Date(body.startDate)
    const endDate = new Date(body.endDate)
    if (startDate >= endDate) {
      return NextResponse.json({ error: "End date must be after start date" }, { status: 400 })
    }

    // Create campaign in database
    const newCampaign = await createCampaign(body as Omit<Campaign, "_id" | "createdAt" | "updatedAt">)
    return NextResponse.json(newCampaign, { status: 201 })
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
