"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Bar,
  BarChart,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 12000, leads: 450 },
  { month: "Feb", sales: 19000, leads: 520 },
  { month: "Mar", sales: 15000, leads: 480 },
  { month: "Apr", sales: 25000, leads: 650 },
  { month: "May", sales: 22000, leads: 590 },
  { month: "Jun", sales: 30000, leads: 720 },
]

const customerSegments = [
  { name: "Enterprise", value: 45, color: "#3b82f6" },
  { name: "SMB", value: 35, color: "#10b981" },
  { name: "Startup", value: 20, color: "#f59e0b" },
]

const campaignPerformance = [
  { name: "Email", opens: 2400, clicks: 480 },
  { name: "Social", opens: 1800, clicks: 360 },
  { name: "Direct", opens: 1200, clicks: 300 },
  { name: "Referral", opens: 900, clicks: 270 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sales & Lead Trends</CardTitle>
          <CardDescription>Monthly sales revenue and lead generation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
          <CardDescription>Distribution of customers by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {customerSegments.map((segment) => (
              <div key={segment.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="text-sm">
                  {segment.name} ({segment.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Opens vs clicks by channel</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="opens" fill="#3b82f6" />
              <Bar dataKey="clicks" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>Lead to customer conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Leads</span>
              <span className="text-sm">2,450</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Qualified</span>
              <span className="text-sm">1,225 (50%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Proposals</span>
              <span className="text-sm">490 (20%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Customers</span>
              <span className="text-sm">245 (10%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
