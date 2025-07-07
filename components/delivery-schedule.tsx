import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"

const deliveries = [
  {
    id: "DEL-001",
    supplier: "Sharma Industries",
    destination: "Warehouse A",
    scheduledTime: new Date(2024, 0, 25, 10, 0),
    estimatedTime: new Date(2024, 0, 25, 10, 30),
    status: "On Time",
    items: "Electronic Components",
  },
  {
    id: "DEL-002",
    supplier: "Gupta Components",
    destination: "Warehouse B",
    scheduledTime: new Date(2024, 0, 25, 14, 0),
    estimatedTime: new Date(2024, 0, 25, 16, 0),
    status: "Delayed",
    items: "Raw Materials",
  },
  {
    id: "DEL-003",
    supplier: "Patel Materials",
    destination: "Warehouse C",
    scheduledTime: new Date(2024, 0, 26, 9, 0),
    estimatedTime: new Date(2024, 0, 26, 9, 0),
    status: "Scheduled",
    items: "Packaging Supplies",
  },
  {
    id: "DEL-004",
    supplier: "Singh Supply Co",
    destination: "Warehouse A",
    scheduledTime: new Date(2024, 0, 26, 15, 0),
    estimatedTime: new Date(2024, 0, 26, 14, 30),
    status: "Early",
    items: "Tools & Equipment",
  },
]

export function DeliverySchedule() {
  return (
    <div className="space-y-4">
      {deliveries.map((delivery) => (
        <div key={delivery.id} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium">{delivery.id}</p>
              <p className="text-sm text-muted-foreground">{delivery.items}</p>
            </div>
            <Badge
              variant={
                delivery.status === "On Time"
                  ? "default"
                  : delivery.status === "Early"
                    ? "secondary"
                    : delivery.status === "Delayed"
                      ? "destructive"
                      : "outline"
              }
            >
              {delivery.status}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {delivery.supplier} → {delivery.destination}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Scheduled: {format(delivery.scheduledTime, "MMM dd, yyyy 'at' HH:mm")}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Estimated: {formatDistanceToNow(delivery.estimatedTime, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
