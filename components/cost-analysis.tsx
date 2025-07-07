"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"

const costData = [
  { name: "Raw Materials", value: 45, color: "#3b82f6" },
  { name: "Transportation", value: 20, color: "#10b981" },
  { name: "Storage", value: 15, color: "#f59e0b" },
  { name: "Labor", value: 12, color: "#ef4444" },
  { name: "Overhead", value: 8, color: "#8b5cf6" },
]

export function CostAnalysis() {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={costData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
            {costData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {costData.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span>
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
