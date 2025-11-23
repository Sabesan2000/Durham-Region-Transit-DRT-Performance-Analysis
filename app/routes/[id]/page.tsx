import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Clock, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RoutePerformanceMetrics } from "@/components/route-performance-metrics"
import { RouteScheduleReliability } from "@/components/route-schedule-reliability"
import { RouteStopAnalysis } from "@/components/route-stop-analysis"
import { RouteMap } from "@/components/route-map"

// Sample route data - in production this would come from database
const routesData: Record<string, any> = {
  R001: {
    id: "R001",
    shortName: "1",
    longName: "Yonge-University Line",
    type: "Subway",
    color: "#FFD700",
    performance: 84.2,
    dailyRiders: 325000,
    status: "On Time",
    avgDelay: 3.2,
    totalStops: 32,
    routeLength: 28.5,
  },
  R002: {
    id: "R002",
    shortName: "2",
    longName: "Bloor-Danforth Line",
    type: "Subway",
    color: "#00A651",
    performance: 81.5,
    dailyRiders: 298000,
    status: "Minor Delays",
    avgDelay: 4.8,
    totalStops: 31,
    routeLength: 26.2,
  },
  R003: {
    id: "R003",
    shortName: "501",
    longName: "Queen Streetcar",
    type: "Streetcar",
    color: "#D62828",
    performance: 76.8,
    dailyRiders: 42000,
    status: "Delayed",
    avgDelay: 6.5,
    totalStops: 68,
    routeLength: 24.3,
  },
  R004: {
    id: "R004",
    shortName: "504",
    longName: "King Streetcar",
    type: "Streetcar",
    color: "#D62828",
    performance: 79.3,
    dailyRiders: 38000,
    status: "On Time",
    avgDelay: 5.1,
    totalStops: 52,
    routeLength: 18.7,
  },
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const route = routesData[id]

  if (!route) {
    notFound()
  }

  const statusColor =
    route.status === "On Time"
      ? "bg-success/10 text-success border-success/20"
      : route.status === "Minor Delays"
        ? "bg-warning/10 text-warning border-warning/20"
        : "bg-destructive/10 text-destructive border-destructive/20"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Route Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl font-bold"
                style={{ backgroundColor: route.color }}
              >
                {route.shortName}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-balance">{route.longName}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline">{route.type}</Badge>
                  <Badge className={statusColor}>{route.status}</Badge>
                  <span className="text-sm text-muted-foreground">Route {route.id}</span>
                </div>
              </div>
            </div>

            <Button>Generate Report</Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{route.performance}%</div>
                <div className="text-sm text-muted-foreground">On-Time Performance</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{(route.dailyRiders / 1000).toFixed(0)}K</div>
                <div className="text-sm text-muted-foreground">Daily Riders</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">{route.avgDelay} min</div>
                <div className="text-sm text-muted-foreground">Avg Delay</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <MapPin className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{route.totalStops}</div>
                <div className="text-sm text-muted-foreground">Total Stops</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <RoutePerformanceMetrics routeId={route.id} />
        </div>

        {/* Schedule Reliability & Stop Analysis */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <RouteScheduleReliability routeId={route.id} />
          <RouteStopAnalysis routeId={route.id} />
        </div>

        {/* Route Map */}
        <div className="mb-8">
          <RouteMap routeId={route.id} routeName={route.longName} />
        </div>
      </main>
    </div>
  )
}
