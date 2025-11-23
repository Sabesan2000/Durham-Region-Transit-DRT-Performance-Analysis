import { DashboardHeader } from "@/components/dashboard-header"
import { RidershipOverview } from "@/components/ridership-overview"
import { PredictiveAnalytics } from "@/components/predictive-analytics"
import { DemographicInsights } from "@/components/demographic-insights"
import { PeakHourAnalysis } from "@/components/peak-hour-analysis"
import { OptimizationRecommendations } from "@/components/optimization-recommendations"

export const metadata = {
  title: "Ridership Analytics | TTC Performance",
  description: "Advanced ridership forecasting and predictive analytics",
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-balance">Ridership Analytics</h1>
          <p className="mt-2 text-lg text-muted-foreground text-pretty">
            AI-powered forecasting and insights for passenger demand optimization
          </p>
        </div>

        <RidershipOverview />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <PredictiveAnalytics />
          <PeakHourAnalysis />
        </div>

        <div className="mt-8">
          <DemographicInsights />
        </div>

        <div className="mt-8">
          <OptimizationRecommendations />
        </div>
      </main>
    </div>
  )
}
