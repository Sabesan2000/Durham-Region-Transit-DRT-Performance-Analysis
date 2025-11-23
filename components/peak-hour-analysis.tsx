"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Clock } from "lucide-react"

const peakData = [
  { time: "5AM", weekday: 8500, weekend: 3200 },
  { time: "6AM", weekday: 22000, weekend: 5800 },
  { time: "7AM", weekday: 48500, weekend: 8200 },
  { time: "8AM", weekday: 72300, weekend: 12400 },
  { time: "9AM", weekday: 58200, weekend: 18500 },
  { time: "10AM", weekday: 32500, weekend: 22300 },
  { time: "11AM", weekday: 28800, weekend: 26800 },
  { time: "12PM", weekday: 35100, weekend: 32100 },
  { time: "1PM", weekday: 32300, weekend: 34300 },
  { time: "2PM", weekday: 28600, weekend: 32600 },
  { time: "3PM", weekday: 34400, weekend: 28400 },
  { time: "4PM", weekday: 52200, weekend: 24200 },
  { time: "5PM", weekday: 78600, weekend: 28600 },
  { time: "6PM", weekday: 64700, weekend: 32700 },
  { time: "7PM", weekday: 42300, weekend: 28300 },
  { time: "8PM", weekday: 28500, weekend: 22500 },
]

export function PeakHourAnalysis() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-warning" />
          <h2 className="text-xl font-bold">Peak Hour Distribution</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Weekday vs weekend ridership patterns</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={peakData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            formatter={(value: number) => value.toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey="weekday"
            stackId="1"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
            name="Weekday"
          />
          <Area
            type="monotone"
            dataKey="weekend"
            stackId="2"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent))"
            fillOpacity={0.4}
            name="Weekend"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex gap-4">
        <div className="flex-1 rounded-lg border border-border p-3">
          <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">Morning Peak</Badge>
          <div className="text-sm text-muted-foreground">7:30 AM - 9:00 AM</div>
          <div className="mt-1 text-lg font-bold">72.3K passengers</div>
        </div>
        <div className="flex-1 rounded-lg border border-border p-3">
          <Badge className="mb-2 bg-accent/10 text-accent border-accent/20">Evening Peak</Badge>
          <div className="text-sm text-muted-foreground">4:45 PM - 6:15 PM</div>
          <div className="mt-1 text-lg font-bold">78.6K passengers</div>
        </div>
      </div>
    </Card>
  )
}
