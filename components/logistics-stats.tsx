import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, Clock, MapPin } from "lucide-react"

const stats = [
  {
    title: "Active Shipments",
    value: "24",
    change: "6 in transit",
    icon: Truck,
  },
  {
    title: "Delivered Today",
    value: "18",
    change: "94% on-time rate",
    icon: Package,
  },
  {
    title: "Average Transit Time",
    value: "2.8 days",
    change: "-0.3 days improved",
    icon: Clock,
  },
  {
    title: "Delivery Locations",
    value: "12",
    change: "Across 8 states",
    icon: MapPin,
  },
]

export function LogisticsStats() {
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
