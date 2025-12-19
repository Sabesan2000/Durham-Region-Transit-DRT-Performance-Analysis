"""
Durham Region Transit Ridership Analysis Module
Processes CSV data to compute boardings, productivity, and ridership patterns
"""

import pandas as pd
import numpy as np
from datetime import datetime, time
from typing import Dict, List, Tuple

class RidershipAnalyzer:
    """Analyzes DRT ridership data and computes key performance metrics"""
    
    def __init__(self, data_path: str):
        """
        Initialize analyzer with CSV data
        
        Args:
            data_path: Path to CSV file containing trip records
        """
        self.df = pd.read_csv(data_path)
        self._validate_data()
        self._segment_time_periods()
    
    def _validate_data(self):
        """Validate data quality and check for missing values"""
        required_columns = [
            'route_id', 'route_name', 'service_type',
            'scheduled_departure', 'actual_departure',
            'scheduled_arrival', 'actual_arrival',
            'boardings', 'trip_date'
        ]
        
        missing_cols = [col for col in required_columns if col not in self.df.columns]
        if missing_cols:
            raise ValueError(f"Missing required columns: {missing_cols}")
        
        # Check for null values
        null_counts = self.df[required_columns].isnull().sum()
        print(f"[v0] Data validation - Null counts:\n{null_counts}")
        
        # Convert timestamps
        self.df['scheduled_departure'] = pd.to_datetime(self.df['scheduled_departure'])
        self.df['actual_departure'] = pd.to_datetime(self.df['actual_departure'])
        self.df['scheduled_arrival'] = pd.to_datetime(self.df['scheduled_arrival'])
        self.df['actual_arrival'] = pd.to_datetime(self.df['actual_arrival'])
        self.df['trip_date'] = pd.to_datetime(self.df['trip_date'])
        
        # Calculate delay in minutes
        self.df['delay_minutes'] = (
            self.df['actual_arrival'] - self.df['scheduled_arrival']
        ).dt.total_seconds() / 60
        
        # On-time performance (≤5 min late)
        self.df['on_time'] = self.df['delay_minutes'] <= 5
    
    def _segment_time_periods(self):
        """Segment trips into peak/off-peak periods"""
        self.df['hour'] = self.df['scheduled_departure'].dt.hour
        self.df['day_of_week'] = self.df['trip_date'].dt.dayofweek  # 0=Mon, 6=Sun
        self.df['is_weekend'] = self.df['day_of_week'] >= 5
        
        # Define time periods
        def categorize_period(row):
            if row['is_weekend']:
                return 'Weekend All Day'
            elif 6 <= row['hour'] < 9:
                return 'Weekday AM Peak'
            elif 15 <= row['hour'] < 19:
                return 'Weekday PM Peak'
            else:
                return 'Weekday Off-Peak'
        
        self.df['time_period'] = self.df.apply(categorize_period, axis=1)
    
    def get_data_overview(self) -> Dict:
        """Generate data overview statistics"""
        return {
            'total_records': len(self.df),
            'date_range': {
                'start': self.df['trip_date'].min().strftime('%Y-%m-%d'),
                'end': self.df['trip_date'].max().strftime('%Y-%m-%d')
            },
            'unique_routes': self.df['route_id'].nunique(),
            'total_boardings': int(self.df['boardings'].sum()),
            'fields': list(self.df.columns)
        }
    
    def compute_boardings_analysis(self) -> Dict:
        """Compute boardings metrics by route and time period"""
        
        # Average boardings per hour by route
        route_boardings = self.df.groupby('route_id').agg({
            'boardings': 'sum',
            'route_name': 'first',
            'service_type': 'first'
        }).reset_index()
        
        # Calculate trips per route to get hourly rate
        trips_count = self.df.groupby('route_id').size()
        route_boardings['total_trips'] = route_boardings['route_id'].map(trips_count)
        route_boardings['avg_boardings_per_trip'] = (
            route_boardings['boardings'] / route_boardings['total_trips']
        )
        
        # Top 5 routes by ridership
        top_5 = route_boardings.nlargest(5, 'boardings')
        
        # Peak vs off-peak comparison
        period_comparison = self.df.groupby('time_period')['boardings'].agg([
            'sum', 'mean', 'count'
        ]).reset_index()
        
        return {
            'top_5_routes': top_5.to_dict('records'),
            'all_routes': route_boardings.to_dict('records'),
            'period_comparison': period_comparison.to_dict('records')
        }
    
    def compute_ontime_performance(self) -> Dict:
        """Calculate on-time performance metrics"""
        
        # System-wide on-time performance
        system_ontime = (self.df['on_time'].sum() / len(self.df)) * 100
        
        # Route-level on-time performance
        route_reliability = self.df.groupby(['route_id', 'route_name']).agg({
            'on_time': 'mean',
            'delay_minutes': 'mean'
        }).reset_index()
        
        route_reliability['on_time_pct'] = route_reliability['on_time'] * 100
        route_reliability = route_reliability.sort_values('on_time_pct', ascending=False)
        
        # Highest and lowest reliability
        highest_reliability = route_reliability.head(5)
        lowest_reliability = route_reliability.tail(5)
        
        # Correlation between delays and boardings
        route_stats = self.df.groupby('route_id').agg({
            'boardings': 'sum',
            'delay_minutes': 'mean'
        })
        correlation = route_stats['boardings'].corr(route_stats['delay_minutes'])
        
        return {
            'system_ontime_pct': round(system_ontime, 2),
            'highest_reliability': highest_reliability.to_dict('records'),
            'lowest_reliability': lowest_reliability.to_dict('records'),
            'delay_boarding_correlation': round(correlation, 3),
            'all_routes': route_reliability.to_dict('records')
        }
    
    def compute_productivity_metrics(self) -> Dict:
        """Calculate boardings per revenue hour by service type"""
        
        # Assume each trip = 1 revenue hour (simplified - would use actual schedule data)
        route_productivity = self.df.groupby(['route_id', 'route_name', 'service_type']).agg({
            'boardings': 'sum'
        }).reset_index()
        
        trips_per_route = self.df.groupby('route_id').size()
        route_productivity['revenue_hours'] = route_productivity['route_id'].map(trips_per_route)
        route_productivity['boardings_per_hour'] = (
            route_productivity['boardings'] / route_productivity['revenue_hours']
        )
        
        # Service type comparison
        service_type_productivity = route_productivity.groupby('service_type').agg({
            'boardings_per_hour': 'mean',
            'boardings': 'sum'
        }).reset_index()
        
        # Bottom 10 routes by productivity
        bottom_10 = route_productivity.nsmallest(10, 'boardings_per_hour')
        
        return {
            'service_type_productivity': service_type_productivity.to_dict('records'),
            'bottom_10_routes': bottom_10.to_dict('records'),
            'all_routes': route_productivity.to_dict('records')
        }
    
    def generate_time_series_data(self) -> Dict:
        """Generate time series data for trend visualization"""
        
        # Daily on-time performance
        daily_ontime = self.df.groupby(self.df['trip_date'].dt.date).agg({
            'on_time': 'mean',
            'delay_minutes': 'mean',
            'boardings': 'sum'
        }).reset_index()
        
        daily_ontime['on_time_pct'] = daily_ontime['on_time'] * 100
        daily_ontime['trip_date'] = daily_ontime['trip_date'].astype(str)
        
        # Hourly ridership patterns
        hourly_ridership = self.df.groupby(['hour', 'is_weekend'])['boardings'].sum().reset_index()
        hourly_ridership['period_type'] = hourly_ridership['is_weekend'].map({
            True: 'Weekend',
            False: 'Weekday'
        })
        
        return {
            'daily_trends': daily_ontime.to_dict('records'),
            'hourly_patterns': hourly_ridership.to_dict('records')
        }
    
    def generate_heatmap_data(self) -> List[Dict]:
        """Generate ridership heatmap data by route and time period"""
        
        heatmap = self.df.groupby(['route_id', 'route_name', 'time_period'])['boardings'].sum().reset_index()
        
        # Pivot for heatmap format
        heatmap_pivot = heatmap.pivot_table(
            index=['route_id', 'route_name'],
            columns='time_period',
            values='boardings',
            fill_value=0
        ).reset_index()
        
        return heatmap_pivot.to_dict('records')
    
    def generate_recommendations(self, metrics: Dict) -> List[Dict]:
        """Generate data-driven recommendations based on analysis"""
        
        recommendations = []
        
        # Check for high-ridership routes needing more service
        top_routes = metrics['boardings']['top_5_routes']
        for route in top_routes:
            if route['avg_boardings_per_trip'] > 40:  # High load
                recommendations.append({
                    'category': 'Operational Short-Term',
                    'priority': 'High',
                    'action': f"Increase frequency on Route {route['route_id']} ({route['route_name']})",
                    'rationale': f"High average boardings ({route['avg_boardings_per_trip']:.1f} per trip) indicates capacity constraints",
                    'estimated_impact': '12-15% ridership increase'
                })
        
        # Check for low productivity routes
        low_prod = metrics['productivity']['bottom_10_routes']
        for route in low_prod[:3]:
            if route['boardings_per_hour'] < 10:
                recommendations.append({
                    'category': 'Mid-Term Planning',
                    'priority': 'Medium',
                    'action': f"Evaluate Route {route['route_id']} ({route['route_name']}) schedule adjustment",
                    'rationale': f"Low productivity ({route['boardings_per_hour']:.1f} boardings/hour) suggests schedule optimization needed",
                    'estimated_impact': 'Potential 8-10% cost savings'
                })
        
        # Check for reliability issues
        unreliable = metrics['ontime']['lowest_reliability']
        for route in unreliable[:2]:
            if route['on_time_pct'] < 70:
                recommendations.append({
                    'category': 'Mid-Term Planning',
                    'priority': 'High',
                    'action': f"Implement transit priority measures for Route {route['route_id']} ({route['route_name']})",
                    'rationale': f"Poor on-time performance ({route['on_time_pct']:.1f}%) requires infrastructure improvements",
                    'estimated_impact': '20-25% improvement in reliability'
                })
        
        return recommendations


if __name__ == '__main__':
    # Example usage
    analyzer = RidershipAnalyzer('data/drt_trip_data.csv')
    
    print("Data Overview:")
    print(analyzer.get_data_overview())
    
    print("\nBoardings Analysis:")
    boardings = analyzer.compute_boardings_analysis()
    print(f"Top 5 routes: {boardings['top_5_routes']}")
    
    print("\nOn-Time Performance:")
    ontime = analyzer.compute_ontime_performance()
    print(f"System on-time: {ontime['system_ontime_pct']}%")
