import { Badge } from "@/components/ui/badge"
import { Truck, Package, Clock, CheckCircle } from "lucide-react"

const shipments = [
  {
    id: "SH-001",
    destination: "New York Warehouse",
    status: "In Transit",
    eta: "2 hours",
    icon: Truck,
    color: "text-blue-600",
  },
  {
    id: "SH-002",
    destination: "Chicago Distribution",
    status: "Delivered",
    eta: "Completed",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: "SH-003",
    destination: "Los Angeles Facility",
    status: "Loading",
    eta: "4 hours",
    icon: Package,
    color: "text-orange-600",
  },
  {
    id: "SH-004",
    destination: "Miami Warehouse",
    status: "Delayed",
    eta: "6 hours",
    icon: Clock,
    color: "text-red-600",
  },
]

export function LogisticsStatus() {
  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <div key={shipment.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <shipment.icon className={`h-5 w-5 ${shipment.color}`} />
            <div>
              <p className="text-sm font-medium">{shipment.id}</p>
              <p className="text-xs text-muted-foreground">{shipment.destination}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant={
                shipment.status === "Delivered"
                  ? "default"
                  : shipment.status === "In Transit"
                    ? "secondary"
                    : shipment.status === "Loading"
                      ? "outline"
                      : "destructive"
              }
            >
              {shipment.status}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">ETA: {shipment.eta}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
