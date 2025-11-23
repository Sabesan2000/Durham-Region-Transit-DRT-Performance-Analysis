-- Toronto Transit Commission (TTC) Performance Analysis Database Schema
-- Creates tables for transit routes, stops, schedules, ridership, and performance metrics

-- Routes Table
CREATE TABLE IF NOT EXISTS routes (
    route_id VARCHAR(50) PRIMARY KEY,
    route_short_name VARCHAR(50) NOT NULL,
    route_long_name VARCHAR(255) NOT NULL,
    route_type VARCHAR(50) NOT NULL,
    route_color VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stops Table
CREATE TABLE IF NOT EXISTS stops (
    stop_id VARCHAR(50) PRIMARY KEY,
    stop_name VARCHAR(255) NOT NULL,
    stop_lat DECIMAL(10, 8) NOT NULL,
    stop_lon DECIMAL(11, 8) NOT NULL,
    location_type VARCHAR(50),
    parent_station VARCHAR(50),
    wheelchair_accessible BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips Table
CREATE TABLE IF NOT EXISTS trips (
    trip_id VARCHAR(100) PRIMARY KEY,
    route_id VARCHAR(50) NOT NULL,
    service_id VARCHAR(50) NOT NULL,
    trip_headsign VARCHAR(255),
    direction_id INTEGER,
    block_id VARCHAR(50),
    wheelchair_accessible BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE
);

-- Stop Times Table
CREATE TABLE IF NOT EXISTS stop_times (
    id SERIAL PRIMARY KEY,
    trip_id VARCHAR(100) NOT NULL,
    arrival_time TIME NOT NULL,
    departure_time TIME NOT NULL,
    stop_id VARCHAR(50) NOT NULL,
    stop_sequence INTEGER NOT NULL,
    pickup_type INTEGER DEFAULT 0,
    drop_off_type INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (stop_id) REFERENCES stops(stop_id) ON DELETE CASCADE
);

-- Ridership Data Table
CREATE TABLE IF NOT EXISTS ridership (
    id SERIAL PRIMARY KEY,
    route_id VARCHAR(50) NOT NULL,
    stop_id VARCHAR(50) NOT NULL,
    ride_date DATE NOT NULL,
    hour_of_day INTEGER NOT NULL CHECK (hour_of_day BETWEEN 0 AND 23),
    boardings INTEGER DEFAULT 0,
    alightings INTEGER DEFAULT 0,
    total_passengers INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE,
    FOREIGN KEY (stop_id) REFERENCES stops(stop_id) ON DELETE CASCADE,
    UNIQUE(route_id, stop_id, ride_date, hour_of_day)
);

-- Performance Metrics Table
CREATE TABLE IF NOT EXISTS performance_metrics (
    id SERIAL PRIMARY KEY,
    route_id VARCHAR(50) NOT NULL,
    metric_date DATE NOT NULL,
    scheduled_trips INTEGER DEFAULT 0,
    completed_trips INTEGER DEFAULT 0,
    on_time_trips INTEGER DEFAULT 0,
    delayed_trips INTEGER DEFAULT 0,
    cancelled_trips INTEGER DEFAULT 0,
    avg_delay_minutes DECIMAL(5, 2) DEFAULT 0,
    on_time_performance DECIMAL(5, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE,
    UNIQUE(route_id, metric_date)
);

-- Service Alerts Table
CREATE TABLE IF NOT EXISTS service_alerts (
    id SERIAL PRIMARY KEY,
    route_id VARCHAR(50),
    alert_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    alert_message TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(route_id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ridership_date ON ridership(ride_date);
CREATE INDEX IF NOT EXISTS idx_ridership_route ON ridership(route_id);
CREATE INDEX IF NOT EXISTS idx_performance_date ON performance_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_performance_route ON performance_metrics(route_id);
CREATE INDEX IF NOT EXISTS idx_trips_route ON trips(route_id);
CREATE INDEX IF NOT EXISTS idx_stop_times_trip ON stop_times(trip_id);
