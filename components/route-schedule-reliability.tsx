"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "On Time", value: 84, color: "hsl(var(--success))" },
  { name: "Delayed (< 5 min)", value: 10, color: "hsl(var(--warning))" },
  { name: "Delayed (> 5 min)", value: 4, color: "hsl(var(--destructive))" },
  { name: "Cancelled", value: 2, color: "hsl(var(--muted))" },
]

const metrics = [
  { label: "Avg Wait Time", value: "4.2 min", change: "-0.3 min" },
  { label: "Service Frequency", value: "12 min", change: "No change" },
  { label: "Trip Completion", value: "98.2%", change: "+0.5%" },
  { label: "Peak Reliability", value: "82.1%", change: "+2.1%" },
]

export function RouteScheduleReliability({ routeId }: { routeId: string }) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Schedule Reliability</h2>
        <p className="text-sm text-muted-foreground">Service consistency metrics</p>
      </div>

      <div className="mb-6">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-border p-3">
            <div className="text-sm text-muted-foreground">{metric.label}</div>
            <div className="mt-1 text-lg font-bold">{metric.value}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{metric.change}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
