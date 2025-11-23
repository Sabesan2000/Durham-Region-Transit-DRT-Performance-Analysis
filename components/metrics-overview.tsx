import { TrendingUp, TrendingDown, Clock, Users, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"

const metrics = [
  {
    label: "On-Time Performance",
    value: "85.3%",
    change: "+2.8%",
    trend: "up",
    icon: Clock,
    color: "text-success",
  },
  {
    label: "Daily Ridership",
    value: "45K",
    change: "+4.2%",
    trend: "up",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Active Routes",
    value: "62",
    change: "+3",
    trend: "up",
    icon: TrendingUp,
    color: "text-accent",
  },
  {
    label: "Service Alerts",
    value: "5",
    change: "-2",
    trend: "down",
    icon: AlertTriangle,
    color: "text-warning",
  },
]

export function MetricsOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up" && !metric.label.includes("Alerts")

        return (
          <Card key={metric.label} className="p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${metric.color} bg-opacity-10`}>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${isPositive ? "text-success" : "text-muted-foreground"}`}
              >
                {metric.change}
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
