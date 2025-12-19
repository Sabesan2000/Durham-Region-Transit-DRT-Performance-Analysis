"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Users, AlertTriangle, CheckCircle } from "lucide-react"

// Sample report data - would come from analysis scripts
const sampleReport = {
  executive_summary: [
    "Analyzed 125,450 trip records across 52 routes from 2024-01-01 to 2024-01-31",
    "System-wide on-time performance at 84.3%, with significant variation across routes requiring targeted interventions",
    "Route 900 (Pulse Oshawa-Ajax) leads ridership with 18,250 total boardings, indicating strong corridor demand",
    "Productivity analysis reveals opportunities for schedule optimization on underperforming routes while maintaining service equity",
    "Peak hour analysis shows concentrated demand during commute periods, suggesting potential for frequency increases during 7-9 AM and 4-6 PM windows",
  ],
  data_overview: {
    total_records: 125450,
    unique_routes: 52,
    total_boardings: 387240,
    date_range: {
      start: "2024-01-01",
      end: "2024-01-31",
    },
  },
  metrics: {
    ontime_performance: {
      system_ontime_pct: 84.3,
      highest_reliability: [
        { route_id: "905", route_name: "Express Whitby-Oshawa", on_time_pct: 92.5 },
        { route_id: "401", route_name: "Local Ajax Central", on_time_pct: 89.8 },
        { route_id: "902", route_name: "Pulse Pickering Centre", on_time_pct: 88.3 },
      ],
      lowest_reliability: [
        { route_id: "412", route_name: "Local Courtice Loop", on_time_pct: 67.2 },
        { route_id: "408", route_name: "Local Harmony", on_time_pct: 71.5 },
        { route_id: "916", route_name: "Express Durham College", on_time_pct: 74.1 },
      ],
    },
    boardings: {
      top_5_routes: [
        { route_id: "900", route_name: "Pulse Oshawa-Ajax", boardings: 18250, avg_boardings_per_trip: 45.2 },
        { route_id: "901", route_name: "Pulse Whitby-Oshawa", boardings: 16840, avg_boardings_per_trip: 42.8 },
        { route_id: "915", route_name: "Express GO Connector", boardings: 14520, avg_boardings_per_trip: 38.5 },
        { route_id: "405", route_name: "Local Taunton", boardings: 12180, avg_boardings_per_trip: 32.1 },
        { route_id: "902", route_name: "Pulse Pickering Centre", boardings: 11750, avg_boardings_per_trip: 31.8 },
      ],
    },
    productivity: {
      bottom_10_routes: [
        { route_id: "412", route_name: "Local Courtice Loop", boardings_per_hour: 6.2, service_type: "Local" },
        { route_id: "411", route_name: "Local Rossland", boardings_per_hour: 7.8, service_type: "Local" },
        { route_id: "406", route_name: "Local Kingston", boardings_per_hour: 8.5, service_type: "Local" },
      ],
    },
  },
  recommendations: [
    {
      category: "Operational Short-Term",
      priority: "High",
      action: "Increase frequency on Route 900 (Pulse Oshawa-Ajax)",
      rationale: "High average boardings (45.2 per trip) indicates capacity constraints",
      estimated_impact: "12-15% ridership increase",
      implementation_timeline: "2-3 months",
      estimated_cost: "$50,000",
      best_practice: "Adjust headways to accommodate increased demand without compromising service reliability.",
    },
    {
      category: "Mid-Term Planning",
      priority: "High",
      action: "Implement transit priority measures for Route 412 (Local Courtice Loop)",
      rationale: "Poor on-time performance (67.2%) requires infrastructure improvements",
      estimated_impact: "20-25% improvement in reliability",
      implementation_timeline: "6-12 months",
      estimated_cost: "$100,000",
      best_practice: "Collaborate with local municipalities to secure dedicated lanes and signal priority.",
    },
    {
      category: "Mid-Term Planning",
      priority: "Medium",
      action: "Evaluate Route 412 (Local Courtice Loop) schedule adjustment",
      rationale: "Low productivity (6.2 boardings/hour) suggests schedule optimization needed",
      estimated_impact: "Potential 8-10% cost savings",
      implementation_timeline: "6-12 months",
      estimated_cost: "$20,000",
      best_practice: "Conduct detailed ridership studies and adjust schedules accordingly.",
    },
  ],
}

export function ReportSections() {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <div className="h-1 w-12 bg-primary rounded-full" />
          1. Executive Summary
        </h2>
        <ul className="space-y-3">
          {sampleReport.executive_summary.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Data Overview */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <div className="h-1 w-12 bg-primary rounded-full" />
          2. Data Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Total Records</p>
            <p className="text-2xl font-bold text-foreground">
              {sampleReport.data_overview.total_records.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Unique Routes</p>
            <p className="text-2xl font-bold text-foreground">{sampleReport.data_overview.unique_routes}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Total Boardings</p>
            <p className="text-2xl font-bold text-foreground">
              {sampleReport.data_overview.total_boardings.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Analysis Period</p>
            <p className="text-sm font-semibold text-foreground">{sampleReport.data_overview.date_range.start}</p>
            <p className="text-sm font-semibold text-foreground">to {sampleReport.data_overview.date_range.end}</p>
          </div>
        </div>
      </Card>

      {/* Ridership and Performance Metrics */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <div className="h-1 w-12 bg-primary rounded-full" />
          4. Ridership and Performance Metrics
        </h2>

        {/* On-Time Performance */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            4.2 On-Time and Delay Patterns
          </h3>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">System-Wide On-Time Performance</span>
              <span className="text-3xl font-bold text-primary">
                {sampleReport.metrics.ontime_performance.system_ontime_pct}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Highest Reliability Routes
              </h4>
              <div className="space-y-2">
                {sampleReport.metrics.ontime_performance.highest_reliability.map((route) => (
                  <div key={route.route_id} className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">Route {route.route_id}</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        {route.on_time_pct}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{route.route_name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                Routes Needing Attention
              </h4>
              <div className="space-y-2">
                {sampleReport.metrics.ontime_performance.lowest_reliability.map((route) => (
                  <div key={route.route_id} className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">Route {route.route_id}</span>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                        {route.on_time_pct}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{route.route_name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Routes by Boardings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            4.1 Boardings Analysis
          </h3>
          <div className="space-y-3">
            {sampleReport.metrics.boardings.top_5_routes.map((route, idx) => (
              <div
                key={route.route_id}
                className="p-4 rounded-lg border border-primary/20 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Route {route.route_id}</p>
                      <p className="text-xs text-muted-foreground">{route.route_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{route.boardings.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">total boardings</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Avg per trip: {route.avg_boardings_per_trip}</span>
                  {route.avg_boardings_per_trip > 40 && (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs">
                      High Capacity
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Productivity Routes */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">4.3 Productivity Metrics</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Routes with lowest boardings per revenue hour - candidates for schedule optimization:
          </p>
          <div className="space-y-2">
            {sampleReport.metrics.productivity.bottom_10_routes.map((route) => (
              <div key={route.route_id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <span className="font-semibold text-foreground">Route {route.route_id}</span>
                  <span className="text-sm text-muted-foreground ml-2">- {route.route_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{route.service_type}</Badge>
                  <span className="text-sm font-medium text-foreground">{route.boardings_per_hour} boardings/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Optimization Recommendations */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <div className="h-1 w-12 bg-primary rounded-full" />
          6. Optimization Recommendations
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Data-driven recommendations based on transit planning best practices and your dataset analysis. Grounded in
          industry standards and proven strategies for service improvement.
        </p>
        <div className="space-y-4">
          {sampleReport.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge
                      variant={rec.priority === "High" ? "destructive" : "secondary"}
                      className={rec.priority === "High" ? "bg-red-500/10 text-red-600 border-red-500/20" : ""}
                    >
                      {rec.priority} Priority
                    </Badge>
                    <Badge variant="outline">{rec.category}</Badge>
                    {rec.implementation_timeline && (
                      <Badge variant="outline" className="bg-muted/50">
                        <Clock className="h-3 w-3 mr-1" />
                        {rec.implementation_timeline}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{rec.action}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{rec.rationale}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Impact</p>
                        <p className="text-sm font-medium text-primary">{rec.estimated_impact}</p>
                      </div>
                    </div>
                    {rec.estimated_cost && (
                      <div className="flex items-start gap-2">
                        <span className="text-primary text-sm mt-0.5">$</span>
                        <div>
                          <p className="text-xs text-muted-foreground">Estimated Cost</p>
                          <p className="text-sm font-medium text-foreground">{rec.estimated_cost}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {rec.best_practice && (
                    <div className="p-3 rounded bg-primary/5 border border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Best Practice</p>
                      <p className="text-sm text-foreground">{rec.best_practice}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Guidance */}
        <div className="mt-8 p-5 rounded-lg bg-primary/5 border border-primary/20">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Implementation Guidance
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Prioritization:</span> Focus on High priority
              recommendations first, particularly those with short implementation timelines (2-6 months) for quick wins.
            </p>
            <p>
              <span className="font-medium text-foreground">Phased Approach:</span> Group recommendations by category
              (Operational, Infrastructure, Technology) and implement in coordinated phases to maximize synergies.
            </p>
            <p>
              <span className="font-medium text-foreground">Monitoring:</span> Establish KPIs for each recommendation
              and track progress monthly. Use this dashboard to measure actual vs. expected impacts.
            </p>
            <p>
              <span className="font-medium text-foreground">Stakeholder Engagement:</span> Present recommendations to
              transit commissioners, operations staff, and community groups for feedback before implementation.
            </p>
          </div>
        </div>
      </Card>

      {/* Limitations */}
      <Card className="p-6 border-yellow-500/20 bg-yellow-500/5">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
          7. Limitations
        </h2>
        <ul className="space-y-2">
          {[
            "Analysis based on one month of data; seasonal variations not captured",
            "Passenger sociodemographic data not included in dataset",
            "External factors (weather, special events, construction) not accounted for",
            "Revenue hour calculation simplified; actual operator scheduling data would improve accuracy",
          ].map((limitation, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-yellow-600 mt-1">•</span>
              <span className="text-muted-foreground text-sm">{limitation}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
