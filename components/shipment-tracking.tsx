import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Truck, Package, CheckCircle, Clock } from "lucide-react"

const shipments = [
  {
    id: "SH-001",
    from: "Sharma Industries",
    to: "Warehouse A",
    status: "In Transit",
    progress: 75,
    eta: "2 hours",
    trackingNumber: "SI123456789",
    icon: Truck,
  },
  {
    id: "SH-002",
    from: "Gupta Components",
    to: "Warehouse B",
    status: "Delivered",
    progress: 100,
    eta: "Completed",
    trackingNumber: "GC987654321",
    icon: CheckCircle,
  },
  {
    id: "SH-003",
    from: "Patel Materials",
    to: "Warehouse C",
    status: "Preparing",
    progress: 25,
    eta: "8 hours",
    trackingNumber: "PM456789123",
    icon: Package,
  },
  {
    id: "SH-004",
    from: "Singh Supply Co",
    to: "Warehouse D",
    status: "Delayed",
    progress: 45,
    eta: "6 hours",
    trackingNumber: "SS789123456",
    icon: Clock,
  },
]

export function ShipmentTracking() {
  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <div key={shipment.id} className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <shipment.icon
                className={`h-5 w-5 ${
                  shipment.status === "Delivered"
                    ? "text-green-600"
                    : shipment.status === "In Transit"
                      ? "text-blue-600"
                      : shipment.status === "Delayed"
                        ? "text-red-600"
                        : "text-gray-600"
                }`}
              />
              <span className="font-medium">{shipment.id}</span>
            </div>
            <Badge
              variant={
                shipment.status === "Delivered"
                  ? "default"
                  : shipment.status === "In Transit"
                    ? "secondary"
                    : shipment.status === "Delayed"
                      ? "destructive"
                      : "outline"
              }
            >
              {shipment.status}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>From: {shipment.from}</p>
            <p>To: {shipment.to}</p>
            <p>Tracking: {shipment.trackingNumber}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>ETA: {shipment.eta}</span>
            </div>
            <Progress value={shipment.progress} />
          </div>
        </div>
      ))}
    </div>
  )
}
