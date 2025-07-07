import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar, DollarSign, Package, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const purchaseOrders = [
  {
    id: "PO-2024-001",
    supplier: "Sharma Industries",
    items: 8,
    totalValue: 25000,
    status: "Delivered",
    orderDate: new Date(2024, 0, 15),
    expectedDelivery: new Date(2024, 0, 22),
    actualDelivery: new Date(2024, 0, 21),
    assignedTo: "Arjun Mehta",
  },
  {
    id: "PO-2024-002",
    supplier: "Gupta Components",
    items: 12,
    totalValue: 18500,
    status: "In Transit",
    orderDate: new Date(2024, 0, 18),
    expectedDelivery: new Date(2024, 0, 25),
    actualDelivery: null,
    assignedTo: "Kavya Sharma",
  },
  {
    id: "PO-2024-003",
    supplier: "Patel Materials",
    items: 5,
    totalValue: 12000,
    status: "Processing",
    orderDate: new Date(2024, 0, 20),
    expectedDelivery: new Date(2024, 0, 28),
    actualDelivery: null,
    assignedTo: "Rohit Patel",
  },
  {
    id: "PO-2024-004",
    supplier: "Singh Supply Co",
    items: 3,
    totalValue: 8750,
    status: "Pending Approval",
    orderDate: new Date(2024, 0, 22),
    expectedDelivery: new Date(2024, 0, 30),
    actualDelivery: null,
    assignedTo: "Sneha Singh",
  },
  {
    id: "PO-2024-005",
    supplier: "Agarwal Parts Ltd",
    items: 15,
    totalValue: 35000,
    status: "Draft",
    orderDate: new Date(2024, 0, 23),
    expectedDelivery: new Date(2024, 1, 5),
    actualDelivery: null,
    assignedTo: "Vikram Agarwal",
  },
]

export function PurchaseOrderList() {
  return (
    <div className="space-y-4">
      {purchaseOrders.map((po) => (
        <Card key={po.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{po.id}</CardTitle>
                <p className="text-sm text-muted-foreground">Supplier: {po.supplier}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    po.status === "Delivered"
                      ? "default"
                      : po.status === "In Transit"
                        ? "secondary"
                        : po.status === "Processing"
                          ? "outline"
                          : po.status === "Pending Approval"
                            ? "destructive"
                            : "outline"
                  }
                >
                  {po.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{po.items} Items</p>
                  <p className="text-xs text-muted-foreground">Total items</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">₹{po.totalValue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total value</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {po.actualDelivery
                      ? formatDistanceToNow(po.actualDelivery, { addSuffix: true })
                      : formatDistanceToNow(po.expectedDelivery, { addSuffix: true })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {po.actualDelivery ? "Delivered" : "Expected delivery"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{po.assignedTo}</p>
                  <p className="text-xs text-muted-foreground">Assigned to</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
