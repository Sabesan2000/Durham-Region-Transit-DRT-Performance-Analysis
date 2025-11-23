"""
TTC Transit Data ETL Pipeline
Extracts, transforms, and loads transit data for performance analysis
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json

# Sample GTFS data processing functions
def extract_gtfs_data():
    """
    Simulates extracting GTFS (General Transit Feed Specification) data
    In production, this would fetch from TTC's GTFS feed
    """
    print("[ETL] Extracting GTFS data...")
    
    # Sample routes data
    routes_data = {
        'route_id': ['R001', 'R002', 'R003', 'R004', 'R005'],
        'route_short_name': ['1', '2', '501', '504', '510'],
        'route_long_name': ['Yonge-University Line', 'Bloor-Danforth Line', 
                           'Queen Streetcar', 'King Streetcar', 'Spadina Streetcar'],
        'route_type': ['Subway', 'Subway', 'Streetcar', 'Streetcar', 'Streetcar']
    }
    
    return pd.DataFrame(routes_data)

def transform_ridership_data(df):
    """
    Transforms raw ridership data with cleaning and feature engineering
    """
    print("[ETL] Transforming ridership data...")
    
    # Remove outliers using IQR method
    Q1 = df['total_passengers'].quantile(0.25)
    Q3 = df['total_passengers'].quantile(0.75)
    IQR = Q3 - Q1
    
    df_clean = df[
        (df['total_passengers'] >= Q1 - 1.5 * IQR) & 
        (df['total_passengers'] <= Q3 + 1.5 * IQR)
    ].copy()
    
    # Add time-based features
    df_clean['is_rush_hour'] = df_clean['hour_of_day'].apply(
        lambda x: 1 if (7 <= x <= 9) or (16 <= x <= 18) else 0
    )
    
    df_clean['time_period'] = df_clean['hour_of_day'].apply(classify_time_period)
    
    # Calculate rolling averages
    df_clean = df_clean.sort_values(['route_id', 'ride_date', 'hour_of_day'])
    df_clean['rolling_avg_7d'] = df_clean.groupby('route_id')['total_passengers'].transform(
        lambda x: x.rolling(window=7, min_periods=1).mean()
    )
    
    print(f"[ETL] Cleaned {len(df_clean)} records (removed {len(df) - len(df_clean)} outliers)")
    
    return df_clean

def classify_time_period(hour):
    """Classifies hour into time periods"""
    if 6 <= hour < 9:
        return 'Morning Rush'
    elif 9 <= hour < 16:
        return 'Midday'
    elif 16 <= hour < 19:
        return 'Evening Rush'
    elif 19 <= hour < 23:
        return 'Evening'
    else:
        return 'Overnight'

def calculate_performance_metrics(df):
    """
    Calculates key performance indicators for transit routes
    """
    print("[ETL] Calculating performance metrics...")
    
    metrics = df.groupby('route_id').agg({
        'completed_trips': 'sum',
        'on_time_trips': 'sum',
        'delayed_trips': 'sum',
        'cancelled_trips': 'sum',
        'avg_delay_minutes': 'mean'
    }).reset_index()
    
    # Calculate on-time performance percentage
    metrics['on_time_performance'] = (
        metrics['on_time_trips'] / metrics['completed_trips'] * 100
    ).round(2)
    
    # Calculate reliability score (composite metric)
    metrics['reliability_score'] = (
        (metrics['on_time_performance'] * 0.6) + 
        ((100 - metrics['cancelled_trips'] / metrics['completed_trips'] * 100) * 0.4)
    ).round(2)
    
    return metrics

def generate_ridership_forecast(df, periods=7):
    """
    Simple time series forecasting for ridership
    Uses moving average for demonstration
    """
    print(f"[ETL] Generating {periods}-day ridership forecast...")
    
    # Calculate daily totals by route
    daily_ridership = df.groupby(['route_id', 'ride_date'])['total_passengers'].sum().reset_index()
    
    forecasts = []
    
    for route_id in daily_ridership['route_id'].unique():
        route_data = daily_ridership[daily_ridership['route_id'] == route_id]
        
        # Calculate 7-day moving average
        recent_avg = route_data.tail(7)['total_passengers'].mean()
        
        # Simple forecast (in production, use ARIMA, Prophet, or ML models)
        for i in range(1, periods + 1):
            forecast_date = route_data['ride_date'].max() + timedelta(days=i)
            # Add random variation (±10%)
            forecast_value = recent_avg * (1 + np.random.uniform(-0.1, 0.1))
            
            forecasts.append({
                'route_id': route_id,
                'forecast_date': forecast_date,
                'predicted_passengers': int(forecast_value)
            })
    
    return pd.DataFrame(forecasts)

def export_analysis_results(metrics_df, forecast_df):
    """
    Exports processed data for dashboard consumption
    """
    print("[ETL] Exporting analysis results...")
    
    # Summary statistics
    summary = {
        'total_routes_analyzed': len(metrics_df),
        'avg_on_time_performance': float(metrics_df['on_time_performance'].mean().round(2)),
        'avg_reliability_score': float(metrics_df['reliability_score'].mean().round(2)),
        'best_performing_route': metrics_df.loc[metrics_df['on_time_performance'].idxmax(), 'route_id'],
        'analysis_timestamp': datetime.now().isoformat()
    }
    
    print("\n" + "="*60)
    print("TTC TRANSIT PERFORMANCE ANALYSIS SUMMARY")
    print("="*60)
    print(f"Total Routes Analyzed: {summary['total_routes_analyzed']}")
    print(f"Average On-Time Performance: {summary['avg_on_time_performance']}%")
    print(f"Average Reliability Score: {summary['avg_reliability_score']}")
    print(f"Best Performing Route: {summary['best_performing_route']}")
    print("="*60 + "\n")
    
    return summary

# Main ETL execution
if __name__ == "__main__":
    print("\n" + "="*60)
    print("TTC TRANSIT DATA ETL PIPELINE")
    print("="*60 + "\n")
    
    # Sample data generation for demonstration
    dates = pd.date_range(end=datetime.now(), periods=30, freq='D')
    
    ridership_sample = pd.DataFrame({
        'route_id': np.random.choice(['R001', 'R002', 'R003', 'R004'], 1000),
        'ride_date': np.random.choice(dates, 1000),
        'hour_of_day': np.random.randint(0, 24, 1000),
        'total_passengers': np.random.randint(50, 500, 1000)
    })
    
    performance_sample = pd.DataFrame({
        'route_id': ['R001', 'R002', 'R003', 'R004', 'R005'],
        'completed_trips': [450, 420, 380, 390, 360],
        'on_time_trips': [380, 350, 310, 330, 295],
        'delayed_trips': [60, 65, 60, 55, 60],
        'cancelled_trips': [10, 5, 10, 5, 5],
        'avg_delay_minutes': [5.2, 6.1, 5.8, 4.9, 6.5]
    })
    
    # Execute ETL pipeline
    routes_df = extract_gtfs_data()
    clean_ridership = transform_ridership_data(ridership_sample)
    metrics = calculate_performance_metrics(performance_sample)
    forecasts = generate_ridership_forecast(clean_ridership)
    summary = export_analysis_results(metrics, forecasts)
    
    print("\n[ETL] Pipeline completed successfully!")
    print(f"[ETL] Processed {len(clean_ridership)} ridership records")
    print(f"[ETL] Generated {len(forecasts)} forecast data points\n")
