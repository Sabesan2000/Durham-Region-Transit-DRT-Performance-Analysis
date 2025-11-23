"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const purposeData = [
  { purpose: "Work Commute", value: 52, color: "hsl(var(--chart-1))" },
  { purpose: "Shopping", value: 18, color: "hsl(var(--chart-2))" },
  { purpose: "Education", value: 15, color: "hsl(var(--chart-3))" },
  { purpose: "Recreation", value: 10, color: "hsl(var(--chart-4))" },
  { purpose: "Other", value: 5, color: "hsl(var(--chart-5))" },
]

const ageData = [
  { age: "18-24", percentage: 22 },
  { age: "25-34", percentage: 28 },
  { age: "35-44", percentage: 20 },
  { age: "45-54", percentage: 15 },
  { age: "55-64", percentage: 10 },
  { age: "65+", percentage: 5 },
]

export function DemographicInsights() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Passenger Demographics & Behavior</h2>
        <p className="text-sm text-muted-foreground">Understanding rider patterns and preferences</p>
      </div>

      <Tabs defaultValue="purpose" className="w-full">
        <TabsList>
          <TabsTrigger value="purpose">Trip Purpose</TabsTrigger>
          <TabsTrigger value="age">Age Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="purpose" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={purposeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ purpose, value }) => `${purpose}: ${value}%`}
                >
                  {purposeData.map((entry, index) => (
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
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col justify-center space-y-3">
              {purposeData.map((item) => (
                <div
                  key={item.purpose}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.purpose}</span>
                  </div>
                  <span className="text-lg font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="age" className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
