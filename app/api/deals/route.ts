import { type NextRequest, NextResponse } from "next/server"

// Mock deals data
const deals = [
  {
    id: 1,
    title: "Enterprise Software License",
    company: "Acme Corporation",
    contact: "John Smith",
    value: 125000,
    stage: "proposal",
    probability: 75,
    expectedCloseDate: "2024-02-15",
    assignedTo: "John Smith",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Startup Package Deal",
    company: "TechStart Inc",
    contact: "Sarah Johnson",
    value: 25000,
    stage: "qualified",
    probability: 50,
    expectedCloseDate: "2024-01-30",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    title: "Consulting Services Contract",
    company: "Global Solutions",
    contact: "Mike Wilson",
    value: 200000,
    stage: "negotiation",
    probability: 80,
    expectedCloseDate: "2024-03-01",
    assignedTo: "John Smith",
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    title: "Digital Marketing Campaign",
    company: "Digital Agency",
    contact: "Alice Brown",
    value: 45000,
    stage: "lead",
    probability: 25,
    expectedCloseDate: "2024-02-28",
    assignedTo: "Emily Davis",
    createdAt: "2024-01-18",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const stage = searchParams.get("stage")

  let filteredDeals = deals

  if (stage && stage !== "all") {
    filteredDeals = filteredDeals.filter((deal) => deal.stage === stage)
  }

  return NextResponse.json(filteredDeals)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.title || !body.company || !body.value) {
      return NextResponse.json({ error: "Title, company, and value are required" }, { status: 400 })
    }

    const newDeal = {
      id: deals.length + 1,
      stage: "lead",
      probability: 25,
      ...body,
      createdAt: new Date().toISOString().split("T")[0],
    }

    deals.push(newDeal)

    return NextResponse.json(newDeal, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
