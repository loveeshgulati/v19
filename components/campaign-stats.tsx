import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Users, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Campaigns",
    value: "24",
    change: "+3 this month",
    icon: Mail,
  },
  {
    title: "Total Reach",
    value: "125,430",
    change: "+15.2% from last month",
    icon: Users,
  },
  {
    title: "Avg. Open Rate",
    value: "24.5%",
    change: "+2.1% improvement",
    icon: TrendingUp,
  },
  {
    title: "Campaign ROI",
    value: "340%",
    change: "+45% from last quarter",
    icon: DollarSign,
  },
]

export function CampaignStats() {
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
