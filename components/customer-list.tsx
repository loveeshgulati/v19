import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, Mail, Phone } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    value: "$125,000",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "TechStart Inc",
    contact: "Sarah Johnson",
    email: "sarah@techstart.com",
    phone: "+1 (555) 987-6543",
    status: "Prospect",
    value: "$75,000",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Global Solutions",
    contact: "Mike Wilson",
    email: "mike@global.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    value: "$200,000",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Enterprise Co",
    contact: "Emily Davis",
    email: "emily@enterprise.com",
    phone: "+1 (555) 321-0987",
    status: "Inactive",
    value: "$50,000",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function CustomerList() {
  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <Card key={customer.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{customer.contact}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                </div>

                <div className="text-right">
                  <Badge
                    variant={
                      customer.status === "Active"
                        ? "default"
                        : customer.status === "Prospect"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {customer.status}
                  </Badge>
                  <p className="text-sm font-medium mt-1">{customer.value}</p>
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
