# Durham Region Transit (DRT) Performance Analysis Application - Comprehensive Overview

## Executive Summary

This is a full-stack transit analytics platform designed specifically for Durham Region Transit to monitor, analyze, and optimize their public transportation network. The application transforms raw GTFS (General Transit Feed Specification) data and operational metrics into actionable insights for transit planners, operations managers, and decision-makers.

## Technical Architecture & Design Decisions

### Database Layer (SQL Scripts)

**Structure:**
The application uses a relational database with four core tables designed to handle 500K+ transit records:

1. **`routes` table** - Stores route metadata including route_id, route_name, route_type (Pulse/Express/Local), and operational status. This is the central reference table that all other tables link to.
2. **`trips` table** - Contains individual trip records with foreign key relationships to routes. Each trip represents a single journey by a bus on a specific route, tracking departure time, arrival time, actual vs scheduled times, ridership count, and delay minutes.
3. **`stops` table** - Geographical and operational data for each bus stop including coordinates, accessibility features, average wait times, and daily boardings. This enables stop-level performance analysis.
4. **`service_alerts` table** - Real-time operational issues, delays, and service disruptions with severity levels, affected routes, and timestamps for incident tracking.


**Why this schema?**

- **Normalized design** prevents data redundancy and ensures referential integrity through foreign keys
- **Indexed columns** on route_id, trip_date, and stop_id enable fast query performance on large datasets
- **Timestamp tracking** allows for temporal analysis and trend identification over months/years
- **Separation of concerns** makes it easy to update routes without affecting historical trip data


The `02-seed-sample-data.sql` script populates the database with realistic Durham Region data including actual route numbers (Pulse 900, 901, 915, 916, local routes 401-412) and municipalities (Oshawa, Whitby, Ajax, Pickering, Courtice).

### Data Processing Pipeline (Python Scripts)

**ETL Pipeline (`etl_pipeline.py`):**
This script handles the Extract-Transform-Load workflow:

1. **Data Extraction** - Fetches GTFS feeds from Durham Region Transit's API endpoints (routes.txt, trips.txt, stop_times.txt, stops.txt) plus ridership data from their operational database
2. **Data Transformation** - Cleans data (removes nulls, standardizes formats), calculates derived metrics (on-time performance = actual_arrival - scheduled_arrival within 5-minute tolerance), aggregates ridership by route/time period
3. **Data Loading** - Bulk inserts into the database using parameterized queries to prevent SQL injection


**Why Python for ETL?**

- **Pandas library** provides powerful DataFrame operations for handling large CSV/JSON datasets efficiently
- **SQLAlchemy** offers database-agnostic ORM capabilities, making it easy to switch between PostgreSQL/MySQL/SQLite
- **Requests library** simplifies HTTP API calls to fetch GTFS data
- **Native datetime handling** for temporal data manipulation


**Predictive Model (`predictive_model.py`):**
Implements machine learning for 7-day ridership forecasting:

1. **Feature Engineering** - Creates time-based features (day_of_week, hour, is_weekend), weather data integration, holiday flags, and historical ridership patterns
2. **Model Selection** - Uses Random Forest Regressor because it handles non-linear relationships well, is robust to outliers, and provides feature importance rankings
3. **Training** - Splits data 80/20 train/test, uses 3-month historical window for training
4. **Prediction** - Generates forecasts with confidence intervals (upper/lower bounds based on prediction variance)


**Why Random Forest?**

- **Ensemble method** reduces overfitting compared to single decision trees
- **Handles missing data** gracefully without requiring imputation
- **Non-parametric** - doesn't assume linear relationships between ridership and time/weather
- **Interpretable** - can explain which features (holidays, weather, day of week) most impact ridership


### Frontend Application (Next.js/React)

**Framework Choice - Next.js 16 with App Router:**

I chose Next.js because:

- **Server Components** allow data fetching on the server, reducing client-side JavaScript and improving initial page load (critical for data-heavy dashboards)
- **File-based routing** (`app/page.tsx`, `app/routes/[id]/page.tsx`, `app/analytics/page.tsx`) makes the URL structure intuitive
- **Built-in optimization** - automatic code splitting, image optimization, and font optimization
- **TypeScript support** provides type safety for complex data structures


**Design System & Color Scheme:**

I adopted Durham Region Transit's official brand colors from their logo:

- **Primary Green (`#1d7a4f`)** - The dark forest green from the DRT logo, used for headers, primary actions, and key metrics
- **Accent Green (`#2d9a66`)** - A lighter green for hover states and secondary elements
- **Neutral Palette** - White backgrounds, gray text (zinc-400/500/600) for hierarchy, and dark text for readability
- **Semantic tokens** - Success (green), warning (yellow), destructive (red) for alert severity


**Why this color scheme?**

- **Brand consistency** - Users immediately recognize this as an official DRT tool
- **Accessibility** - Green on white provides 4.5:1+ contrast ratio meeting WCAG AA standards
- **Professional appearance** - Conveys trust and authority appropriate for municipal infrastructure


**Typography:**

- **Geist Sans** for UI elements - Clean, modern, highly legible at small sizes on data tables
- **Font size hierarchy** - text-3xl for page titles, text-sm for data labels, text-xs for timestamps
- **Line height** - `leading-relaxed` (1.625) for body text ensures comfortable reading of dense information


### Component Architecture

**1. Dashboard Homepage (`app/page.tsx`)**

The landing page provides a real-time operational overview:

- **Metrics Overview** - Four KPI cards showing on-time performance (89.2%), avg ridership/day (12,450), active routes (52), service alerts (3). Uses color-coded trend indicators (green up arrow = improvement, red down arrow = decline)
- **Performance Chart** - 7-day line chart tracking on-time percentage over time. Shows operational trends at a glance. Uses Recharts library for interactive, responsive charts.
- **Ridership Trends** - Hourly ridership bar chart revealing peak hours (7-9 AM, 4-6 PM). Helps identify when extra buses are needed.
- **Routes List** - Sortable table of all routes with performance metrics. Clicking a route navigates to detailed route analysis.
- **Service Alerts** - Live feed of disruptions with severity badges (critical/high/medium). Color-coded for quick scanning.


**Why this layout?**

- **Progressive disclosure** - Most important metrics above the fold, details accessible via navigation
- **Scannable design** - Grid layout with cards separates information visually
- **Action-oriented** - Every element is clickable/interactive for drill-down analysis


**2. Route Performance View (`app/routes/[id]/page.tsx`)**

Dynamic route page showing granular route analysis:

- **Route Header** - Route number, name, type badge, performance score (calculated from on-time %, ridership, reliability)
- **Performance Metrics** - Multi-line chart showing on-time %, delay minutes, ridership over 30 days. Synchronized tooltips let users compare metrics at specific dates.
- **Delay Analysis** - Pie chart breaking down delay causes (traffic 40%, mechanical 25%, weather 20%, operator 15%). Identifies root causes for improvement focus.
- **Schedule Reliability** - Pie chart showing on-time (65%), early (15%), late (20%) trip distribution. Reveals if issues are systematic.
- **Stop-by-Stop Analysis** - Table ranking stops by avg delay, ridership, accessibility. Helps identify problematic stops needing infrastructure investment.
- **Route Map** - Placeholder for interactive map showing route path and stop locations (would integrate Google Maps or Mapbox in production)


**Why dedicated route pages?**

- **Deep dives** - Operators need to diagnose specific route issues
- **Comparative analysis** - Seeing all metrics for one route side-by-side reveals patterns
- **URL shareable** - Managers can link to specific routes in reports/emails


**3. Analytics Page (`app/analytics/page.tsx`)**

Advanced analytics and predictive modeling:

- **7-Day Ridership Forecast** - Line chart with three data series:

1. Actual historical ridership (green)
2. Predicted ridership (blue dashed line)
3. Confidence intervals (upper/lower bounds shown as lighter lines)


**The blank chart fix:** Initially, the chart lines used CSS variables (hsl(var(--primary))) which didn't render until hover. I fixed this by using explicit hex colors (`#2d9a66`, `#3b82f6`) and adding `dot={true}` to render visible data points, making the forecast immediately visible.


- **Peak Hour Analysis** - Grouped bar chart comparing weekday vs weekend ridership by hour. Shows that weekday peaks are 7-9 AM and 4-6 PM (commute times), while weekend ridership is more evenly distributed.
- **Demographic Insights** - Pie charts showing trip purposes (commute, school, shopping, leisure) and age distributions. Informs service planning (more school routes, senior accessibility).
- **Optimization Recommendations** - AI-generated action items with estimated impact:

- "Increase Pulse 900 frequency 7-9 AM" - 8% ridership increase, $145K cost
- "Add shelters to stops with 15+ min waits" - 12% satisfaction increase, $89K cost
- "Real-time tracking app" - 7% ridership increase, $230K cost


Each recommendation shows impact metrics, estimated cost, and implementation timeline.




**Why machine learning forecasts?**

- **Proactive planning** - Predict increased demand before it happens (e.g., add buses for upcoming events)
- **Budget optimization** - Forecast helps allocate resources (driver scheduling, bus maintenance) efficiently
- **Service quality** - Prevents overcrowding by anticipating high-demand periods


### Responsive Design Strategy

**Mobile-First Approach:**

- Base styles assume narrow screens (320px+)
- `md:` breakpoint (768px) adjusts grid to 2 columns
- `lg:` breakpoint (1024px) expands to full desktop layout
- Charts use responsive containers that adapt to viewport width


**Why mobile-first?**

- **Transit operators** often use tablets in the field to check route status
- **Commissioners/executives** may review dashboards on phones during meetings
- **Performance** - Mobile styles load first, then progressive enhancement for larger screens


### Data Visualization Choices

**Recharts Library:**
I chose Recharts over Chart.js or D3 because:

- **React-native** - Components like `<LineChart>`, `<BarChart>` feel natural in React
- **Responsive by default** - `ResponsiveContainer` handles window resizing
- **Customizable** - Easy to match DRT brand colors and styling
- **Accessible** - Built-in keyboard navigation and ARIA labels


**Chart Types:**

- **Line charts** for trends over time (performance, ridership forecasts)
- **Bar charts** for comparisons across categories (hourly ridership)
- **Pie charts** for part-to-whole relationships (delay causes, trip distribution)
- **Tables** for precise numeric values and sorting


### State Management & Data Flow

**Server Components for Data Fetching:**
All pages use React Server Components to fetch data on the server:

- Reduces client bundle size (no data fetching libraries shipped to browser)
- Faster initial render (HTML arrives pre-populated with data)
- Better SEO (search engines see complete content)


**Client Components for Interactivity:**
Components with `'use client'` directive handle:

- Chart hover interactions (tooltips)
- Table sorting/filtering
- Navigation (route selection)


**Why this split?**

- **Performance** - Only interactive components require JavaScript
- **Security** - Database credentials never exposed to client
- **Simplicity** - No complex Redux/Zustand state management needed


## Business Value & Use Cases

### For Transit Operations Managers:

1. **Real-time monitoring** - Dashboard alerts them to delays/issues within minutes
2. **Resource allocation** - Peak hour analysis shows where to deploy extra buses
3. **Performance accountability** - Route-level metrics track which routes need attention


### For Service Planners:

1. **Route optimization** - Stop-by-stop analysis identifies where to add shelters, benches
2. **Ridership forecasting** - Predict demand for new routes or schedule changes
3. **Budget justification** - Data-driven recommendations with cost estimates help secure funding


### For Executives/Commissioners:

1. **High-level KPIs** - Single dashboard view of system health (on-time %, ridership trends)
2. **Strategic planning** - Demographic insights inform long-term service expansion
3. **Public accountability** - Transparent metrics demonstrate effective stewardship of taxpayer funds


### For Riders (Indirect Benefits):

1. More reliable service (optimized based on delay analysis)
2. Better infrastructure (shelters/benches added where most needed)
3. Improved frequency on high-demand routes


## Technical Implementation Details

### Performance Optimizations:

- **Database indexing** on frequently queried columns (route_id, trip_date)
- **Pagination** for large datasets (routes list shows 20 per page)
- **Memoization** of chart components to prevent unnecessary re-renders
- **Image optimization** - Next.js Image component for logos/icons


### Security Considerations:

- **Parameterized SQL queries** prevent injection attacks
- **Environment variables** for database credentials (never hardcoded)
- **HTTPS enforcement** for API calls
- **Role-based access** (would add authentication in production - only transit staff can access)


### Scalability:

- **Database partitioning** - Could partition trips table by date for faster queries on recent data
- **Caching** - Redis cache for frequently accessed route summaries
- **CDN** - Static assets (charts, icons) served from edge network
- **Horizontal scaling** - Next.js app can run on multiple servers behind load balancer


## Why This Approach Works

**1. Data-Driven Decision Making:**
Instead of gut feelings, transit planners have concrete metrics. "Route 900 has 25% more delays than average" triggers investigation into specific causes (traffic patterns, driver training, vehicle maintenance).

**2. Proactive vs Reactive:**
Traditional transit management is reactive (fix problems after complaints). This system is proactive (predict issues before they happen, optimize routes based on forecasts).

**3. Transparency & Accountability:**
Elected officials and the public can see system performance objectively. This builds trust and justifies budget requests.

**4. Continuous Improvement:**
The recommendations system creates a feedback loop: implement changes → measure impact → refine strategies. Over time, service quality improves systematically.

**5. Cost Efficiency:**
By optimizing routes and schedules, DRT can serve more riders with existing resources. A 10% improvement in on-time performance could mean millions in savings (fewer complaints, less overtime for late-running routes, higher fare revenue from satisfied riders).

## Conclusion

This application transforms raw transit data into strategic intelligence. Every design decision—from the database schema to the color scheme to the chart types—serves the goal of making transit operations more efficient, reliable, and rider-focused. It's not just a dashboard; it's a decision support system that helps Durham Region Transit fulfill its mission of connecting communities through excellent public transportation.
4. Vercel deploys the latest version from this repository
