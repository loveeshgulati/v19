"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 19000 },
  { name: "Mar", total: 15000 },
  { name: "Apr", total: 25000 },
  { name: "May", total: 22000 },
  { name: "Jun", total: 30000 },
  { name: "Jul", total: 28000 },
  { name: "Aug", total: 35000 },
  { name: "Sep", total: 32000 },
  { name: "Oct", total: 40000 },
  { name: "Nov", total: 38000 },
  { name: "Dec", total: 45000 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
