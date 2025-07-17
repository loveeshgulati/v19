import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar, DollarSign, Package, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"


export function PurchaseOrderList({ purchaseOrders }) {
  if (!purchaseOrders || purchaseOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Purchase Orders Found</h3>
        <p className="text-gray-600">
          You don't have any purchase orders yet. Orders will appear here when they are created.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {purchaseOrders.map((po) => (
        <Card key={po._id || po.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{po.orderNumber}</CardTitle>
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
                  <p className="text-sm font-medium">{po.items?.length || 0} Items</p>
                  <p className="text-xs text-muted-foreground">Total items</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    ₹{po.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total value</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {po.actualDelivery
                      ? formatDistanceToNow(new Date(po.actualDelivery), { addSuffix: true })
                      : formatDistanceToNow(new Date(po.expectedDelivery), { addSuffix: true })}
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
  );
}
