import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Clock, Package, Truck } from "lucide-react"

const metrics = [
  {
    title: "Inventory Turnover",
    value: "4.2x",
    change: "+0.3x",
    trend: "up",
    icon: Package,
  },
  {
    title: "Order Fulfillment Time",
    value: "2.8 days",
    change: "-0.5 days",
    trend: "down",
    icon: Clock,
  },
  {
    title: "Transportation Cost",
    value: "$125K",
    change: "-8.5%",
    trend: "down",
    icon: Truck,
  },
  {
    title: "Procurement Savings",
    value: "$45K",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
  },
]

export function PerformanceMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
              )}
              <span className="text-green-600">{metric.change}</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
