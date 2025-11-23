import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users } from "lucide-react"

const stops = [
  { name: "Union Station", boardings: 15200, delays: 2.1, status: "good" },
  { name: "Bloor-Yonge Station", boardings: 18500, delays: 3.4, status: "good" },
  { name: "Sheppard-Yonge", boardings: 12800, delays: 5.8, status: "warning" },
  { name: "Finch Station", boardings: 14300, delays: 4.2, status: "good" },
  { name: "King Station", boardings: 9600, delays: 7.3, status: "critical" },
]

export function RouteStopAnalysis({ routeId }: { routeId: string }) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Stop Performance</h2>
        <p className="text-sm text-muted-foreground">Busiest stops and delay hotspots</p>
      </div>

      <div className="space-y-3">
        {stops.map((stop, index) => {
          const statusColor =
            stop.status === "good"
              ? "bg-success/10 text-success border-success/20"
              : stop.status === "warning"
                ? "bg-warning/10 text-warning border-warning/20"
                : "bg-destructive/10 text-destructive border-destructive/20"

          return (
            <div key={stop.name} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{stop.name}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {stop.boardings.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {stop.delays} min avg delay
                    </span>
                  </div>
                </div>
              </div>
              <Badge className={statusColor}>
                {stop.status === "good" ? "Good" : stop.status === "warning" ? "Watch" : "Critical"}
              </Badge>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
