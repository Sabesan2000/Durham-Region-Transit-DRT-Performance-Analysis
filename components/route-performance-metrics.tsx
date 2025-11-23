"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const performanceData = [
  { date: "Nov 17", onTime: 78, delayed: 15, cancelled: 7 },
  { date: "Nov 18", onTime: 81, delayed: 13, cancelled: 6 },
  { date: "Nov 19", onTime: 79, delayed: 16, cancelled: 5 },
  { date: "Nov 20", onTime: 84, delayed: 11, cancelled: 5 },
  { date: "Nov 21", onTime: 82, delayed: 13, cancelled: 5 },
  { date: "Nov 22", onTime: 86, delayed: 10, cancelled: 4 },
  { date: "Nov 23", onTime: 83, delayed: 12, cancelled: 5 },
]

const delayReasons = [
  { reason: "Signal Issues", count: 45 },
  { reason: "Weather", count: 32 },
  { reason: "Mechanical", count: 28 },
  { reason: "Crowding", count: 24 },
  { reason: "Track Work", count: 18 },
]

export function RoutePerformanceMetrics({ routeId }: { routeId: string }) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Performance Analysis</h2>
        <p className="text-sm text-muted-foreground">Detailed metrics and trends for this route</p>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="delays">Delay Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="onTime" stroke="hsl(var(--success))" strokeWidth={2} name="On Time (%)" />
              <Line type="monotone" dataKey="delayed" stroke="hsl(var(--warning))" strokeWidth={2} name="Delayed (%)" />
              <Line
                type="monotone"
                dataKey="cancelled"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name="Cancelled (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="delays" className="mt-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={delayReasons} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis type="category" dataKey="reason" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={[0, 4, 4, 0]} name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
