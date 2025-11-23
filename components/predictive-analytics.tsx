"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Brain, TrendingUp } from "lucide-react"

const forecastData = [
  { date: "Nov 24", actual: 1180000, predicted: 1180000, lower: 1150000, upper: 1210000 },
  { date: "Nov 25", actual: 1220000, predicted: 1220000, lower: 1190000, upper: 1250000 },
  { date: "Nov 26", actual: 1195000, predicted: 1195000, lower: 1165000, upper: 1225000 },
  { date: "Nov 27", actual: null, predicted: 1240000, lower: 1200000, upper: 1280000 },
  { date: "Nov 28", actual: null, predicted: 1265000, lower: 1220000, upper: 1310000 },
  { date: "Nov 29", actual: null, predicted: 1285000, lower: 1235000, upper: 1335000 },
  { date: "Nov 30", actual: null, predicted: 1310000, lower: 1255000, upper: 1365000 },
]

export function PredictiveAnalytics() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold">7-Day Ridership Forecast</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">ML-powered predictions with confidence intervals</p>
        </div>
        <Badge className="bg-accent/10 text-accent border-accent/20">
          <TrendingUp className="mr-1 h-3 w-3" />
          87% Accuracy
        </Badge>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            formatter={(value: number) => value.toLocaleString()}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#1d7a4f"
            strokeWidth={2.5}
            name="Actual Ridership"
            connectNulls={false}
            dot={{ fill: "#1d7a4f", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#2d9a66"
            strokeWidth={2.5}
            strokeDasharray="5 5"
            name="Predicted"
            dot={{ fill: "#2d9a66", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="upper"
            stroke="#808080"
            strokeWidth={1.5}
            dot={{ fill: "#808080", r: 2 }}
            name="Upper Bound"
          />
          <Line
            type="monotone"
            dataKey="lower"
            stroke="#808080"
            strokeWidth={1.5}
            dot={{ fill: "#808080", r: 2 }}
            name="Lower Bound"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg border border-border p-4">
        <div>
          <div className="text-xs text-muted-foreground">Model Type</div>
          <div className="mt-1 text-sm font-semibold">Random Forest</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">R² Score</div>
          <div className="mt-1 text-sm font-semibold">0.87</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">MAE</div>
          <div className="mt-1 text-sm font-semibold">45.2K</div>
        </div>
      </div>
    </Card>
  )
}
