import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Star, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Suppliers",
    value: "48",
    change: "+3 new this month",
    icon: Users,
  },
  {
    title: "Average Rating",
    value: "4.4",
    change: "+0.2 improvement",
    icon: Star,
  },
  {
    title: "On-Time Delivery",
    value: "89.5%",
    change: "+3.2% from last month",
    icon: TrendingUp,
  },
  {
    title: "Total Spend",
    value: "₹2.1M",
    change: "YTD across all suppliers",
    icon: DollarSign,
  },
]

export function SupplierStats() {
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
