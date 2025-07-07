import { type NextRequest, NextResponse } from "next/server"

// Mock analytics data
const analyticsData = {
  dashboardStats: {
    totalRevenue: 452318.89,
    activeCustomers: 2350,
    conversionRate: 12.5,
    salesGrowth: 15.3,
  },
  salesData: [
    { month: "Jan", sales: 12000, leads: 450 },
    { month: "Feb", sales: 19000, leads: 520 },
    { month: "Mar", sales: 15000, leads: 480 },
    { month: "Apr", sales: 25000, leads: 650 },
    { month: "May", sales: 22000, leads: 590 },
    { month: "Jun", sales: 30000, leads: 720 },
    { month: "Jul", sales: 28000, leads: 680 },
    { month: "Aug", sales: 35000, leads: 750 },
    { month: "Sep", sales: 32000, leads: 690 },
    { month: "Oct", sales: 40000, leads: 820 },
    { month: "Nov", sales: 38000, leads: 780 },
    { month: "Dec", sales: 45000, leads: 850 },
  ],
  pipelineData: [
    { stage: "Leads", count: 45, value: 125000 },
    { stage: "Qualified", count: 32, value: 98000 },
    { stage: "Proposal", count: 18, value: 75000 },
    { stage: "Closed Won", count: 12, value: 45000 },
  ],
  customerSegments: [
    { name: "Enterprise", value: 45 },
    { name: "SMB", value: 35 },
    { name: "Startup", value: 20 },
  ],
  campaignPerformance: [
    { name: "Email", opens: 2400, clicks: 480 },
    { name: "Social", opens: 1800, clicks: 360 },
    { name: "Direct", opens: 1200, clicks: 300 },
    { name: "Referral", opens: 900, clicks: 270 },
  ],
  performanceMetrics: {
    customerAcquisitionCost: 125,
    customerLifetimeValue: 2450,
    leadConversionRate: 12.5,
    averageSalesCycle: 45,
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const metric = searchParams.get("metric")
  const period = searchParams.get("period") || "12months"

  if (metric) {
    // Return specific metric data
    switch (metric) {
      case "sales":
        return NextResponse.json(analyticsData.salesData)
      case "pipeline":
        return NextResponse.json(analyticsData.pipelineData)
      case "segments":
        return NextResponse.json(analyticsData.customerSegments)
      case "campaigns":
        return NextResponse.json(analyticsData.campaignPerformance)
      case "performance":
        return NextResponse.json(analyticsData.performanceMetrics)
      default:
        return NextResponse.json({ error: "Invalid metric" }, { status: 400 })
    }
  }

  // Return all analytics data
  return NextResponse.json(analyticsData)
}
