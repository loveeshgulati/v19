import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const pipelineStages = [
  {
    name: "Leads",
    deals: [
      {
        id: 1,
        company: "Tech Innovations",
        value: 25000,
        contact: "Alice Brown",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        company: "Digital Agency",
        value: 15000,
        contact: "Bob Green",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 3,
        company: "StartUp Hub",
        value: 35000,
        contact: "Carol White",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    name: "Qualified",
    deals: [
      {
        id: 4,
        company: "Enterprise Corp",
        value: 75000,
        contact: "David Black",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      { id: 5, company: "Growth Co", value: 45000, contact: "Eva Blue", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    name: "Proposal",
    deals: [
      {
        id: 6,
        company: "Big Client Inc",
        value: 125000,
        contact: "Frank Red",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 7,
        company: "Major Corp",
        value: 85000,
        contact: "Grace Yellow",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    name: "Closed Won",
    deals: [
      {
        id: 8,
        company: "Success Ltd",
        value: 95000,
        contact: "Henry Purple",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
]

export function SalesPipeline() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {pipelineStages.map((stage) => (
        <div key={stage.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{stage.name}</h3>
            <Badge variant="secondary">{stage.deals.length}</Badge>
          </div>

          <div className="space-y-3">
            {stage.deals.map((deal) => (
              <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{deal.company}</h4>
                    <p className="text-lg font-bold text-green-600">${deal.value.toLocaleString()}</p>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={deal.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {deal.contact
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{deal.contact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
