import { Card } from "@/components/ui/card"
import { TrendingUp, Calendar, Users, Activity } from "lucide-react"

const stats = [
  {
    label: "Total Weekly Ridership",
    value: "8.4M",
    change: "+12.3%",
    changeLabel: "vs last week",
    icon: Users,
    color: "text-primary",
  },
  {
    label: "Avg Daily Passengers",
    value: "1.2M",
    change: "+8.5%",
    changeLabel: "vs last month",
    icon: Activity,
    color: "text-accent",
  },
  {
    label: "Peak Hour Volume",
    value: "156K",
    change: "+15.2%",
    changeLabel: "vs last week",
    icon: TrendingUp,
    color: "text-success",
  },
  {
    label: "Projected Growth",
    value: "18%",
    change: "Next 6 months",
    changeLabel: "Based on trends",
    icon: Calendar,
    color: "text-warning",
  },
]

export function RidershipOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`rounded-lg p-2 ${stat.color} bg-opacity-10`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-sm font-semibold text-success">{stat.change}</span>
                <span className="text-xs text-muted-foreground">{stat.changeLabel}</span>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
