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
  forecastData: any[] = [];
  errorMessage: string | null = null;
  sunStatus: string | null = null;


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
  
  determineSunStatus(): void {
    if (this.weatherData) {
      const currentTime = new Date();
      const sunrise = new Date(`1970-01-01T${this.weatherData.forecast.forecastday[0].astro.sunrise}`);
      const sunset = new Date(`1970-01-01T${this.weatherData.forecast.forecastday[0].astro.sunset}`);

      // Check if current time is before sunrise or after sunset
      if (currentTime >= sunset) {
        this.sunStatus = `Sunrise at ${this.weatherData.forecast.forecastday[0].astro.sunrise}`;
      } else if (currentTime <= sunrise) {
        this.sunStatus = `Sunset at ${this.weatherData.forecast.forecastday[0].astro.sunset}`;
      } else {
        this.sunStatus = null; // Sun is currently up
      }
    }
  }
}
