import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Total Pipeline Value", value: "$1,245,000", change: "+12.5%" },
  { title: "Average Deal Size", value: "$45,000", change: "+8.2%" },
  { title: "Win Rate", value: "32%", change: "+5.1%" },
  { title: "Sales Cycle", value: "45 days", change: "-3 days" },
]

export function PipelineStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
