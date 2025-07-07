import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Mail, Phone, MapPin, Star } from "lucide-react"

const suppliers = [
  {
    id: "SUP-001",
    name: "Sharma Industries",
    contact: "Rajesh Sharma",
    email: "rajesh@sharmaindustries.com",
    phone: "+91 98765 43210",
    address: "123 Industrial Area, Gurgaon, Haryana",
    rating: 4.8,
    status: "Active",
    totalOrders: 45,
    totalValue: 1250000,
    onTimeDelivery: 94,
    category: "Electronics",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SUP-002",
    name: "Gupta Components",
    contact: "Priya Gupta",
    email: "priya@guptacomp.com",
    phone: "+91 87654 32109",
    address: "456 Manufacturing Hub, Pune, Maharashtra",
    rating: 4.5,
    status: "Active",
    totalOrders: 32,
    totalValue: 890000,
    onTimeDelivery: 89,
    category: "Components",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SUP-003",
    name: "Patel Materials",
    contact: "Amit Patel",
    email: "amit@patelmaterials.com",
    phone: "+91 76543 21098",
    address: "789 Materials Complex, Ahmedabad, Gujarat",
    rating: 4.3,
    status: "Active",
    totalOrders: 28,
    totalValue: 675000,
    onTimeDelivery: 87,
    category: "Raw Materials",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SUP-004",
    name: "Singh Supply Co",
    contact: "Manpreet Singh",
    email: "manpreet@singhsupply.com",
    phone: "+91 65432 10987",
    address: "321 Supply Chain Park, Ludhiana, Punjab",
    rating: 3.9,
    status: "Under Review",
    totalOrders: 18,
    totalValue: 320000,
    onTimeDelivery: 76,
    category: "General Supplies",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "SUP-005",
    name: "Agarwal Parts Ltd",
    contact: "Neha Agarwal",
    email: "neha@agarwalparts.com",
    phone: "+91 54321 09876",
    address: "654 Industrial Estate, Chennai, Tamil Nadu",
    rating: 4.7,
    status: "Inactive",
    totalOrders: 8,
    totalValue: 180000,
    onTimeDelivery: 92,
    category: "Specialized Parts",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function SupplierList() {
  return (
    <div className="space-y-4">
      {suppliers.map((supplier) => (
        <Card key={supplier.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={supplier.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {supplier.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{supplier.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{supplier.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="text-center">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{supplier.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>

                <div className="text-center">
                  <p className="font-medium">{supplier.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>

                <div className="text-center">
                  <p className="font-medium">₹{(supplier.totalValue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Total Value</p>
                </div>

                <div className="text-center">
                  <p className="font-medium">{supplier.onTimeDelivery}%</p>
                  <p className="text-xs text-muted-foreground">On-Time</p>
                </div>

                <div className="text-center">
                  <Badge
                    variant={
                      supplier.status === "Active"
                        ? "default"
                        : supplier.status === "Under Review"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {supplier.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{supplier.category}</p>
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
