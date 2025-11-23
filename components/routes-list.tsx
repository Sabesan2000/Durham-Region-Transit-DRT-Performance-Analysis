import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

const routes = [
  {
    id: "900",
    name: "Pulse - Oshawa to Pickering",
    type: "Pulse",
    performance: 87.2,
    trend: "up",
    passengers: "4.2K",
    status: "On Time",
    municipality: "Regional",
  },
  {
    id: "915",
    name: "Ajax - Whitby Express",
    type: "Express",
    performance: 84.5,
    trend: "up",
    passengers: "2.8K",
    status: "On Time",
    municipality: "Ajax",
  },
  {
    id: "401",
    name: "Oshawa Centre Local",
    type: "Local",
    performance: 79.8,
    trend: "down",
    passengers: "1.5K",
    status: "Minor Delays",
    municipality: "Oshawa",
  },
  {
    id: "302",
    name: "Whitby GO Connector",
    type: "Local",
    performance: 88.3,
    trend: "up",
    passengers: "2.1K",
    status: "On Time",
    municipality: "Whitby",
  },
  {
    id: "920",
    name: "Durham College Express",
    type: "Express",
    performance: 82.1,
    trend: "down",
    passengers: "3.4K",
    status: "On Time",
    municipality: "Oshawa",
  },
]

export function RoutesList() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Route Performance</h2>
          <p className="text-sm text-muted-foreground">Real-time status across Durham Region</p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {routes.map((route) => {
          const statusColor =
            route.status === "On Time"
              ? "bg-success/10 text-success border-success/20"
              : route.status === "Minor Delays"
                ? "bg-warning/10 text-warning border-warning/20"
                : "bg-destructive/10 text-destructive border-destructive/20"

          return (
            <Link key={route.id} href={`/routes/${route.id}`}>
              <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="text-xs font-mono text-muted-foreground">{route.id}</div>
                    <div className="mt-1 text-2xl font-bold text-foreground">{route.performance}%</div>
                  </div>

                  <div>
                    <div className="font-semibold text-foreground">{route.name}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {route.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {route.municipality}
                      </Badge>
                      <Badge className={statusColor}>{route.status}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Daily Riders</div>
                    <div className="mt-1 flex items-center gap-1 text-lg font-semibold text-foreground">
                      {route.passengers}
                      {route.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
