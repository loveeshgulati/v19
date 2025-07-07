import { Progress } from "@/components/ui/progress"

const pipelineData = [
  { stage: "Leads", count: 45, value: 125000, color: "bg-blue-500" },
  { stage: "Qualified", count: 32, value: 98000, color: "bg-yellow-500" },
  { stage: "Proposal", count: 18, value: 75000, color: "bg-orange-500" },
  { stage: "Closed Won", count: 12, value: 45000, color: "bg-green-500" },
]

export function PipelineOverview() {
  const totalValue = pipelineData.reduce((sum, stage) => sum + stage.value, 0)

  return (
    <div className="space-y-4">
      {pipelineData.map((stage) => (
        <div key={stage.stage} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{stage.stage}</span>
            <span className="text-muted-foreground">
              {stage.count} deals • ${stage.value.toLocaleString()}
            </span>
          </div>
          <Progress value={(stage.value / totalValue) * 100} className="h-2" />
        </div>
      ))}
    </div>
  )
}
