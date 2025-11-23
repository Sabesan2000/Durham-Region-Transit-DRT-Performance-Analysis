"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "Nov 17", performance: 78, target: 85 },
  { date: "Nov 18", performance: 81, target: 85 },
  { date: "Nov 19", performance: 79, target: 85 },
  { date: "Nov 20", performance: 84, target: 85 },
  { date: "Nov 21", performance: 82, target: 85 },
  { date: "Nov 22", performance: 86, target: 85 },
  { date: "Nov 23", performance: 83, target: 85 },
]

export function PerformanceChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">On-Time Performance Trend</h2>
        <p className="text-sm text-muted-foreground">Last 7 days system-wide performance</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[70, 90]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))" }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
