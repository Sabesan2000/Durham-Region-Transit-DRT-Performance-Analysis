import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, DollarSign, Users } from "lucide-react"

const recommendations = [
  {
    id: 1,
    priority: "High",
    route: "Queen Streetcar (R003)",
    title: "Increase Evening Rush Frequency",
    description: "Add 2 additional vehicles during 4-7 PM to reduce crowding and improve on-time performance",
    impact: {
      performance: "+12%",
      ridership: "+8%",
      satisfaction: "+15%",
    },
    cost: "$25,000/month",
    icon: TrendingUp,
    color: "text-destructive",
  },
  {
    id: 2,
    priority: "Medium",
    route: "Yonge-University Line (R001)",
    title: "Optimize Signal Timing at Union Station",
    description: "Implement AI-based signal coordination to reduce dwell time and minimize delays",
    impact: {
      performance: "+8%",
      ridership: "+3%",
      satisfaction: "+10%",
    },
    cost: "$15,000 one-time",
    icon: Lightbulb,
    color: "text-warning",
  },
  {
    id: 3,
    priority: "Medium",
    route: "Spadina Streetcar (R005)",
    title: "Launch Express Service",
    description: "Introduce limited-stop express service during morning and evening peaks",
    impact: {
      performance: "+10%",
      ridership: "+18%",
      satisfaction: "+22%",
    },
    cost: "$35,000/month",
    icon: Users,
    color: "text-warning",
  },
  {
    id: 4,
    priority: "Low",
    route: "System-Wide",
    title: "Mobile App Real-Time Updates",
    description: "Enhanced push notifications for delays and alternative routes to improve rider experience",
    impact: {
      performance: "+5%",
      ridership: "+4%",
      satisfaction: "+25%",
    },
    cost: "$50,000 one-time",
    icon: DollarSign,
    color: "text-primary",
  },
]

export function OptimizationRecommendations() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">AI-Powered Optimization Recommendations</h2>
          <p className="text-sm text-muted-foreground">Data-driven suggestions for service improvement</p>
        </div>
        <Button>Export Report</Button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon
          const priorityColor =
            rec.priority === "High"
              ? "bg-destructive/10 text-destructive border-destructive/20"
              : rec.priority === "Medium"
                ? "bg-warning/10 text-warning border-warning/20"
                : "bg-primary/10 text-primary border-primary/20"

          return (
            <div key={rec.id} className="rounded-lg border border-border p-6 transition-colors hover:bg-muted/50">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`mt-1 rounded-lg p-2 ${rec.color} bg-opacity-10`}>
                    <Icon className={`h-6 w-6 ${rec.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={priorityColor}>{rec.priority} Priority</Badge>
                      <Badge variant="outline" className="font-mono text-xs">
                        {rec.route}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold">{rec.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{rec.description}</p>

                    <div className="mt-4 flex flex-wrap gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Performance Impact</div>
                        <div className="mt-1 text-lg font-semibold text-success">{rec.impact.performance}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Ridership Growth</div>
                        <div className="mt-1 text-lg font-semibold text-primary">{rec.impact.ridership}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                        <div className="mt-1 text-lg font-semibold text-accent">{rec.impact.satisfaction}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Estimated Cost</div>
                        <div className="mt-1 text-lg font-semibold">{rec.cost}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline">Review</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
