import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

const orders = [
  {
    id: "PO-2024-001",
    supplier: "Sharma Industries",
    items: "Electronic Components",
    value: 25000,
    status: "Delivered",
    date: new Date(2024, 0, 15),
  },
  {
    id: "PO-2024-002",
    supplier: "Gupta Components",
    items: "Raw Materials",
    value: 18500,
    status: "In Transit",
    date: new Date(2024, 0, 18),
  },
  {
    id: "PO-2024-003",
    supplier: "Patel Materials",
    items: "Packaging Supplies",
    value: 12000,
    status: "Processing",
    date: new Date(2024, 0, 20),
  },
  {
    id: "PO-2024-004",
    supplier: "Singh Supply Co",
    items: "Tools & Equipment",
    value: 8750,
    status: "Pending",
    date: new Date(2024, 0, 22),
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="space-y-1">
            <p className="text-sm font-medium">{order.id}</p>
            <p className="text-xs text-muted-foreground">{order.supplier}</p>
            <p className="text-xs text-muted-foreground">{order.items}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm font-medium">₹{order.value.toLocaleString()}</p>
            <Badge
              variant={
                order.status === "Delivered"
                  ? "default"
                  : order.status === "In Transit"
                    ? "secondary"
                    : order.status === "Processing"
                      ? "outline"
                      : "destructive"
              }
            >
              {order.status}
            </Badge>
            <p className="text-xs text-muted-foreground">{formatDistanceToNow(order.date, { addSuffix: true })}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
