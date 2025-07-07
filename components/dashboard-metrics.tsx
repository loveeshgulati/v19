import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, TrendingUp, Clock } from "lucide-react"

const metrics = [
  {
    title: "Total Inventory Value",
    value: "₹2.4M",
    change: "+8.5% from last month",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Monthly Procurement Cost",
    value: "₹485K",
    change: "+12.3% from last month",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "On-Time Delivery Rate",
    value: "94.2%",
    change: "+2.1% improvement",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Average Lead Time",
    value: "7.5 days",
    change: "-1.2 days improved",
    icon: Clock,
    color: "text-orange-600",
  },
]

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
