import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { PerformanceChart } from "@/components/performance-chart"
import { RoutesList } from "@/components/routes-list"
import { ServiceAlerts } from "@/components/service-alerts"
import { RidershipTrends } from "@/components/ridership-trends"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground">
            Durham Region Transit Performance
          </h1>
          <p className="mt-2 text-lg text-muted-foreground text-pretty">
            Real-time insights and analytics across Oshawa, Whitby, Ajax, Pickering, and Clarington
          </p>
        </div>

        <Suspense fallback={<div className="text-muted-foreground">Loading metrics...</div>}>
          <MetricsOverview />
        </Suspense>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-card" />}>
            <PerformanceChart />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-card" />}>
            <RidershipTrends />
          </Suspense>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-card" />}>
              <RoutesList />
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-card" />}>
              <ServiceAlerts />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
