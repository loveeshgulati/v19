import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Package, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    type: "critical",
    title: "Out of Stock",
    message: "Steel Reinforcement Bars (STL-RBR-001) - 0 units remaining",
    action: "Reorder Now",
    icon: AlertTriangle,
  },
  {
    type: "warning",
    title: "Low Stock",
    message: "Electronic Circuit Boards (PCB-MAIN-001) - 85 units (below minimum 100)",
    action: "Review Stock",
    icon: Package,
  },
  {
    type: "warning",
    title: "Low Stock",
    message: "Hydraulic Valves (HYD-VLV-025) - 15 units (below minimum 25)",
    action: "Review Stock",
    icon: Package,
  },
  {
    type: "info",
    title: "Slow Moving",
    message: "Industrial Bolts M8x40 - Low turnover rate detected",
    action: "Analyze",
    icon: TrendingDown,
  },
]

export function StockAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            className={
              alert.type === "critical"
                ? "border-red-200 bg-red-50"
                : alert.type === "warning"
                  ? "border-amber-200 bg-amber-50"
                  : "border-blue-200 bg-blue-50"
            }
          >
            <alert.icon
              className={`h-4 w-4 ${
                alert.type === "critical"
                  ? "text-red-600"
                  : alert.type === "warning"
                    ? "text-amber-600"
                    : "text-blue-600"
              }`}
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <div
                  className={`font-medium ${
                    alert.type === "critical"
                      ? "text-red-800"
                      : alert.type === "warning"
                        ? "text-amber-800"
                        : "text-blue-800"
                  }`}
                >
                  {alert.title}
                </div>
                <AlertDescription
                  className={
                    alert.type === "critical"
                      ? "text-red-700"
                      : alert.type === "warning"
                        ? "text-amber-700"
                        : "text-blue-700"
                  }
                >
                  {alert.message}
                </AlertDescription>
              </div>
              <Button size="sm" variant={alert.type === "critical" ? "destructive" : "outline"}>
                {alert.action}
              </Button>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
