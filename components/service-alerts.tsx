import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, AlertCircle } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "Delay",
    severity: "medium",
    route: "915",
    message: "Traffic congestion on Highway 2 causing delays of 5-8 minutes",
    time: "45 minutes ago",
  },
  {
    id: 2,
    type: "Detour",
    severity: "high",
    route: "302",
    message: "Road closure on Brock Street - buses detouring via Dundas",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "Service Change",
    severity: "low",
    route: "920",
    message: "Additional service for Durham College exam period",
    time: "1 day ago",
  },
]

export function ServiceAlerts() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Service Alerts</h2>
        <p className="text-sm text-muted-foreground">Active incidents and updates</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.severity === "high" ? AlertCircle : alert.severity === "medium" ? AlertTriangle : Info

          const severityColor =
            alert.severity === "high"
              ? "text-destructive"
              : alert.severity === "medium"
                ? "text-warning"
                : "text-primary"

          const badgeColor =
            alert.severity === "high"
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : alert.severity === "medium"
                ? "bg-warning/10 text-warning border-warning/20"
                : "bg-primary/10 text-primary border-primary/20"

          return (
            <div key={alert.id} className="rounded-lg border border-border p-4">
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-5 w-5 ${severityColor}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {alert.route}
                    </Badge>
                    <Badge className={`text-xs ${badgeColor}`}>{alert.type}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{alert.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
