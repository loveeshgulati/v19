import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Mail, Users, TrendingUp } from "lucide-react"

const campaigns = [
  {
    id: 1,
    name: "Summer Product Launch",
    type: "Email",
    status: "Active",
    sent: 5420,
    opened: 2156,
    clicked: 432,
    budget: 15000,
    spent: 8500,
  },
  {
    id: 2,
    name: "Customer Retention Drive",
    type: "Multi-channel",
    status: "Completed",
    sent: 3200,
    opened: 1890,
    clicked: 567,
    budget: 12000,
    spent: 11800,
  },
  {
    id: 3,
    name: "New Feature Announcement",
    type: "Email",
    status: "Draft",
    sent: 0,
    opened: 0,
    clicked: 0,
    budget: 8000,
    spent: 0,
  },
  {
    id: 4,
    name: "Holiday Special Offer",
    type: "Social Media",
    status: "Scheduled",
    sent: 0,
    opened: 0,
    clicked: 0,
    budget: 20000,
    spent: 2500,
  },
]

export function CampaignList() {
  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{campaign.type}</Badge>
                  <Badge
                    variant={
                      campaign.status === "Active"
                        ? "default"
                        : campaign.status === "Completed"
                          ? "secondary"
                          : campaign.status === "Draft"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{campaign.sent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Sent</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{campaign.opened.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Opened ({campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{campaign.clicked.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Clicked ({campaign.opened > 0 ? Math.round((campaign.clicked / campaign.opened) * 100) : 0}%)
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget</span>
                  <span>
                    ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                  </span>
                </div>
                <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
