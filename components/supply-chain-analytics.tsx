"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Area, AreaChart } from "recharts"

const inventoryTrends = [
  { month: "Jan", inventory: 2200, orders: 450, delivered: 420 },
  { month: "Feb", inventory: 2100, orders: 520, delivered: 510 },
  { month: "Mar", inventory: 2050, orders: 480, delivered: 465 },
  { month: "Apr", inventory: 2150, orders: 650, delivered: 635 },
  { month: "May", inventory: 2300, orders: 590, delivered: 580 },
  { month: "Jun", inventory: 2400, orders: 720, delivered: 695 },
]

const supplierReliability = [
  { month: "Jan", onTime: 87, quality: 92, cost: 85 },
  { month: "Feb", onTime: 89, quality: 94, cost: 88 },
  { month: "Mar", onTime: 91, quality: 93, cost: 87 },
  { month: "Apr", onTime: 88, quality: 95, cost: 89 },
  { month: "May", onTime: 94, quality: 96, cost: 91 },
  { month: "Jun", onTime: 92, quality: 94, cost: 90 },
]

export function SupplyChainAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Inventory & Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={inventoryTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="inventory" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="orders" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="delivered" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={supplierReliability}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="onTime" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
