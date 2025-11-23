"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { hour: "6AM", passengers: 12500 },
  { hour: "7AM", passengers: 28400 },
  { hour: "8AM", passengers: 42300 },
  { hour: "9AM", passengers: 35200 },
  { hour: "10AM", passengers: 18500 },
  { hour: "11AM", passengers: 16800 },
  { hour: "12PM", passengers: 22100 },
  { hour: "1PM", passengers: 19300 },
  { hour: "2PM", passengers: 17600 },
  { hour: "3PM", passengers: 21400 },
  { hour: "4PM", passengers: 31200 },
  { hour: "5PM", passengers: 45600 },
  { hour: "6PM", passengers: 38700 },
]

export function RidershipTrends() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Hourly Ridership Pattern</h2>
        <p className="text-sm text-muted-foreground">Today's passenger volume by hour</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            formatter={(value: number) => value.toLocaleString()}
          />
          <Bar dataKey="passengers" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
