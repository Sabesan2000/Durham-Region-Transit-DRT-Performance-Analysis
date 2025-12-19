import { FileUp, Download, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReportUploader } from "@/components/report-uploader"
import { ReportSections } from "@/components/report-sections"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Performance Analysis Reports</h1>
            <p className="text-muted-foreground">Upload CSV data to generate comprehensive transit planning reports</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Upload Section */}
        <Card className="p-6 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <FileUp className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">Upload Trip Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a CSV export containing ridership and trip performance data. Required fields: route_id,
                route_name, service_type, scheduled_departure, actual_departure, boardings, trip_date.
              </p>
              <ReportUploader />
            </div>
          </div>
        </Card>

        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Phase 2 Implementation</p>
            <p className="text-muted-foreground">
              This report generator follows municipal transit planning standards, computing boardings analysis, on-time
              performance, productivity metrics, and providing actionable recommendations for service optimization.
            </p>
          </div>
        </div>

        {/* Report Sections - shown after data upload */}
        <ReportSections />
      </main>
    </div>
  )
}
