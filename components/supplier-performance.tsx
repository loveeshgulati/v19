import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const suppliers = [
  { name: "Sharma Industries", score: 94, status: "Excellent", orders: 45 },
  { name: "Gupta Components", score: 89, status: "Good", orders: 32 },
  { name: "Patel Materials", score: 87, status: "Good", orders: 28 },
  { name: "Singh Supply Co", score: 76, status: "Average", orders: 18 },
  { name: "Agarwal Parts Ltd", score: 68, status: "Needs Improvement", orders: 12 },
]

export function SupplierPerformance() {
  return (
    <div className="space-y-4">
      {suppliers.map((supplier) => (
        <div key={supplier.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{supplier.name}</p>
              <p className="text-xs text-muted-foreground">{supplier.orders} orders</p>
            </div>
            <Badge variant={supplier.score >= 90 ? "default" : supplier.score >= 80 ? "secondary" : "outline"}>
              {supplier.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={supplier.score} className="flex-1" />
            <span className="text-sm font-medium">{supplier.score}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}
