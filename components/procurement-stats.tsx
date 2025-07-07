import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Purchase Orders",
    value: "156",
    change: "+12 this month",
    icon: ShoppingCart,
  },
  {
    title: "Monthly Spend",
    value: "₹485K",
    change: "+8.5% from last month",
    icon: DollarSign,
  },
  {
    title: "Average Processing Time",
    value: "3.2 days",
    change: "-0.5 days improved",
    icon: Clock,
  },
  {
    title: "Cost Savings",
    value: "₹45K",
    change: "+15% from negotiations",
    icon: TrendingUp,
  },
]

export function ProcurementStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
