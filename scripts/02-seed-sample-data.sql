-- Sample data for Toronto Transit Commission routes and performance analysis
-- This provides realistic test data for the dashboard

-- Insert Sample Routes
INSERT INTO routes (route_id, route_short_name, route_long_name, route_type, route_color) VALUES
('R001', '1', 'Yonge-University Line', 'Subway', 'FFD700'),
('R002', '2', 'Bloor-Danforth Line', 'Subway', '00A651'),
('R003', '501', 'Queen Streetcar', 'Streetcar', 'D62828'),
('R004', '504', 'King Streetcar', 'Streetcar', 'D62828'),
('R005', '510', 'Spadina Streetcar', 'Streetcar', 'D62828'),
('R006', '36', 'Finch West Bus', 'Bus', '0077C8'),
('R007', '35', 'Jane Bus', 'Bus', '0077C8'),
('R008', '7', 'Bathurst Bus', 'Bus', '0077C8')
ON CONFLICT (route_id) DO NOTHING;

-- Insert Sample Stops
INSERT INTO stops (stop_id, stop_name, stop_lat, stop_lon, location_type, wheelchair_accessible) VALUES
('S001', 'Union Station', 43.6455, -79.3802, 'station', TRUE),
('S002', 'Bloor-Yonge Station', 43.6708, -79.3860, 'station', TRUE),
('S003', 'Spadina Station', 43.6673, -79.4038, 'station', TRUE),
('S004', 'King & Spadina', 43.6433, -79.3945, 'stop', TRUE),
('S005', 'Queen & University', 43.6524, -79.3809, 'stop', TRUE),
('S006', 'Finch Station', 43.7806, -79.4145, 'station', TRUE),
('S007', 'Sheppard-Yonge Station', 43.7614, -79.4108, 'station', TRUE),
('S008', 'Bathurst & College', 43.6579, -79.4043, 'stop', TRUE)
ON CONFLICT (stop_id) DO NOTHING;

-- Insert Sample Performance Metrics (Last 30 days)
INSERT INTO performance_metrics (route_id, metric_date, scheduled_trips, completed_trips, on_time_trips, delayed_trips, cancelled_trips, avg_delay_minutes, on_time_performance)
SELECT 
    route_id,
    CURRENT_DATE - (num || ' days')::INTERVAL AS metric_date,
    FLOOR(RANDOM() * 50 + 150)::INTEGER AS scheduled_trips,
    FLOOR(RANDOM() * 50 + 140)::INTEGER AS completed_trips,
    FLOOR(RANDOM() * 40 + 120)::INTEGER AS on_time_trips,
    FLOOR(RANDOM() * 15 + 10)::INTEGER AS delayed_trips,
    FLOOR(RANDOM() * 5)::INTEGER AS cancelled_trips,
    ROUND((RANDOM() * 8 + 2)::NUMERIC, 2) AS avg_delay_minutes,
    ROUND((75 + RANDOM() * 20)::NUMERIC, 2) AS on_time_performance
FROM 
    routes,
    generate_series(0, 29) AS num
ON CONFLICT (route_id, metric_date) DO NOTHING;

-- Insert Sample Ridership Data (Last 7 days, all hours)
INSERT INTO ridership (route_id, stop_id, ride_date, hour_of_day, boardings, alightings, total_passengers)
SELECT 
    r.route_id,
    s.stop_id,
    CURRENT_DATE - (day || ' days')::INTERVAL AS ride_date,
    hour,
    FLOOR(RANDOM() * 200 + 50)::INTEGER AS boardings,
    FLOOR(RANDOM() * 180 + 40)::INTEGER AS alightings,
    FLOOR(RANDOM() * 300 + 80)::INTEGER AS total_passengers
FROM 
    routes r
    CROSS JOIN stops s
    CROSS JOIN generate_series(0, 6) AS day
    CROSS JOIN generate_series(0, 23) AS hour
WHERE 
    s.stop_id IN ('S001', 'S002', 'S003', 'S004', 'S005')
    AND r.route_id IN ('R001', 'R002', 'R003', 'R004')
ON CONFLICT (route_id, stop_id, ride_date, hour_of_day) DO NOTHING;

-- Insert Sample Service Alerts
INSERT INTO service_alerts (route_id, alert_type, severity, alert_message, start_time, end_time) VALUES
('R001', 'Delay', 'Medium', 'Signal problems causing delays of 5-10 minutes', CURRENT_TIMESTAMP - INTERVAL '2 hours', NULL),
('R003', 'Detour', 'High', 'Construction on Queen Street - buses replacing streetcars', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP + INTERVAL '7 days'),
('R006', 'Service Change', 'Low', 'Scheduled maintenance tonight 1AM-5AM', CURRENT_TIMESTAMP + INTERVAL '8 hours', CURRENT_TIMESTAMP + INTERVAL '12 hours')
ON CONFLICT DO NOTHING;
