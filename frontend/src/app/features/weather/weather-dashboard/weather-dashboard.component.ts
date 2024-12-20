import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css'
})
export class WeatherDashboardComponent implements OnInit {
  weatherData: any;
  forecastWeatherData: any;
  forecastData: any[] = [];
  errorMessage: string | null = null;


  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeather(lat, lon);
        },
        (error) => {
          this.errorMessage = 'Unable to retrieve your location. Please allow location access.';
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by your browser.';
    }
  }

  fetchWeather(lat: number, lon: number): void {
    const location = `${lat},${lon}`;
    this.weatherService.getWeather(location).subscribe(
      (data) => {
        this.weatherData = data;
        this.fetchForecast(location);
      },
      () => {
        this.errorMessage = 'Error fetching current weather.';
      }
    );
  }

  fetchForecast(location: string): void {
    this.weatherService.getForecast(location).subscribe(
      (data) => {
        this.forecastWeatherData = data
        const currentHour = new Date().getHours();
        const hourlyData = data.forecast.forecastday[0].hour;
        this.forecastData = hourlyData.filter(
          (hour: any) => new Date(hour.time).getHours() >= currentHour
        ).slice(0, 3);
      },
      () => {
        this.errorMessage = 'Error fetching weather forecast.';
      }
    );
  }
}
