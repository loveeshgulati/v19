import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Package, AlertTriangle } from "lucide-react"

const inventory = [
  {
    id: "ITM-001",
    name: "Industrial Bolts M8x40",
    category: "Fasteners",
    sku: "BOLT-M8-040",
    currentStock: 2500,
    minStock: 500,
    maxStock: 5000,
    unitPrice: 0.25,
    supplier: "Sharma Industries",
    location: "Warehouse A-1-B",
    status: "In Stock",
  },
  {
    id: "ITM-002",
    name: "Electronic Circuit Boards",
    category: "Electronics",
    sku: "PCB-MAIN-001",
    currentStock: 85,
    minStock: 100,
    maxStock: 500,
    unitPrice: 45.0,
    supplier: "Gupta Components",
    location: "Warehouse B-2-A",
    status: "Low Stock",
  },
  {
    id: "ITM-003",
    name: "Packaging Foam Sheets",
    category: "Packaging",
    sku: "FOAM-PKG-001",
    currentStock: 1200,
    minStock: 200,
    maxStock: 2000,
    unitPrice: 2.5,
    supplier: "Patel Materials",
    location: "Warehouse C-1-C",
    status: "In Stock",
  },
  {
    id: "ITM-004",
    name: "Hydraulic Valves",
    category: "Components",
    sku: "HYD-VLV-025",
    currentStock: 15,
    minStock: 25,
    maxStock: 100,
    unitPrice: 125.0,
    supplier: "Singh Supply Co",
    location: "Warehouse A-3-B",
    status: "Low Stock",
  },
  {
    id: "ITM-005",
    name: "Steel Reinforcement Bars",
    category: "Materials",
    sku: "STL-RBR-001",
    currentStock: 0,
    minStock: 50,
    maxStock: 300,
    unitPrice: 8.75,
    supplier: "Agarwal Parts Ltd",
    location: "Warehouse D-1-A",
    status: "Out of Stock",
  },
]

export function InventoryList() {
  return (
    <div className="space-y-4">
      {inventory.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Package className="h-10 w-10 text-muted-foreground" />
                  {item.status === "Low Stock" && (
                    <AlertTriangle className="absolute -top-1 -right-1 h-4 w-4 text-amber-500" />
                  )}
                  {item.status === "Out of Stock" && (
                    <AlertTriangle className="absolute -top-1 -right-1 h-4 w-4 text-red-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    SKU: {item.sku} • Category: {item.category}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supplier: {item.supplier} • Location: {item.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm font-medium">Current Stock</p>
                  <p className="text-2xl font-bold">{item.currentStock.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Min: {item.minStock} • Max: {item.maxStock}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium">Unit Price</p>
                  <p className="text-lg font-semibold">₹{item.unitPrice}</p>
                  <p className="text-xs text-muted-foreground">
                    Total: ₹{(item.currentStock * item.unitPrice).toLocaleString()}
                  </p>
                </div>

                <div className="text-center">
                  <Badge
                    variant={
                      item.status === "In Stock" ? "default" : item.status === "Low Stock" ? "secondary" : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>

                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
