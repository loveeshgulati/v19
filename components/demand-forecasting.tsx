"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const forecastData = [
  { month: "Jan", actual: 450, predicted: 430, trend: 465 },
  { month: "Feb", actual: 520, predicted: 510, trend: 535 },
  { month: "Mar", actual: 480, predicted: 495, trend: 510 },
  { month: "Apr", actual: 650, predicted: 640, trend: 665 },
  { month: "May", actual: 590, predicted: 605, trend: 615 },
  { month: "Jun", actual: 720, predicted: 715, trend: 735 },
  { month: "Jul", actual: null, predicted: 680, trend: 695 },
  { month: "Aug", actual: null, predicted: 750, trend: 765 },
  { month: "Sep", actual: null, predicted: 710, trend: 725 },
]

export function DemandForecasting() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={forecastData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual Demand" />
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="#10b981"
          strokeWidth={2}
          strokeDasharray="5,5"
          name="Predicted Demand"
        />
        <Line
          type="monotone"
          dataKey="trend"
          stroke="#f59e0b"
          strokeWidth={1}
          strokeDasharray="2,2"
          name="Trend Line"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
