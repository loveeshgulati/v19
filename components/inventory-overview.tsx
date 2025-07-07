"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { category: "Electronics", inStock: 450, lowStock: 25, outOfStock: 5 },
  { category: "Components", inStock: 320, lowStock: 15, outOfStock: 8 },
  { category: "Materials", inStock: 280, lowStock: 35, outOfStock: 12 },
  { category: "Tools", inStock: 150, lowStock: 8, outOfStock: 3 },
  { category: "Packaging", inStock: 200, lowStock: 18, outOfStock: 7 },
  { category: "Chemicals", inStock: 90, lowStock: 12, outOfStock: 2 },
]

export function InventoryOverview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="inStock" fill="#22c55e" name="In Stock" />
        <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" />
        <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" />
      </BarChart>
    </ResponsiveContainer>
  )
}
