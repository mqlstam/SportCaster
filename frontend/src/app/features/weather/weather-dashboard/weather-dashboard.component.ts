import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { WeatherState } from '../../../store/weather/weather.reducer';
import * as WeatherActions from '../../../store/weather/weather.actions';

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

  constructor(
    private weatherService: WeatherService,
    private store: Store<{ weather: WeatherState }>
  ) {}

  ngOnInit(): void {
    this.store.select(state => state.weather.mockWeatherEnabled).subscribe(isMockEnabled => {
      if (isMockEnabled) {
        this.store.select(state => state.weather.selectedWeatherType).subscribe(weatherType => {
          this.weatherService.getMockWeather(weatherType as any).subscribe(data => {
            this.weatherData = { current: data };
            this.createMockForecast(data);
          });
        });
      } else {
        this.getUserLocation();
      }
    });
  }

  private mapWeatherConditionToType(condition: string): string {
    const condition_lower = condition.toLowerCase();
    
    // Rainy conditions
    if (condition_lower.includes('rain') || 
        condition_lower.includes('drizzle') ||
        condition_lower.includes('shower') ||
        condition_lower.includes('precipitation') ||
        condition_lower.includes('sprinkle')) {
      return 'rainy';
    }
    
    // Snowy conditions
    if (condition_lower.includes('snow') || 
        condition_lower.includes('sleet') ||
        condition_lower.includes('ice') ||
        condition_lower.includes('frost') ||
        condition_lower.includes('flurr') ||
        condition_lower.includes('blizzard') ||
        condition_lower.includes('hail')) {
      return 'snowy';
    }
    
    // Stormy conditions
    if (condition_lower.includes('thunder') || 
        condition_lower.includes('storm') ||
        condition_lower.includes('lightning') ||
        condition_lower.includes('squall') ||
        condition_lower.includes('tornado') ||
        condition_lower.includes('hurricane') ||
        condition_lower.includes('typhoon')) {
      return 'stormy';
    }
    
    // Cloudy conditions
    if (condition_lower.includes('cloud') || 
        condition_lower.includes('overcast') ||
        condition_lower.includes('fog') ||
        condition_lower.includes('mist') ||
        condition_lower.includes('haz') ||
        condition_lower.includes('grey') ||
        condition_lower.includes('gray') ||
        condition_lower.includes('gloomy') ||
        condition_lower.includes('dim') ||
        condition_lower.includes('dull') ||
        condition_lower.includes('murky') ||
        condition_lower.includes('dust')) {
      return 'cloudy';
    }
    
    // Sunny/Clear conditions
    if (condition_lower.includes('clear') || 
        condition_lower.includes('sunny') ||
        condition_lower.includes('fair') ||
        condition_lower.includes('bright') ||
        condition_lower.includes('sun') ||
        condition_lower.includes('hot')) {
      return 'sunny';
    }
    
    // If no specific condition is matched, default to cloudy
    // as it's the most neutral option
    return 'cloudy';
  }

  private createMockForecast(currentWeather: any) {
    const currentHour = new Date().getHours();
    this.forecastData = Array(3).fill(null).map((_, index) => ({
      time: new Date(Date.now() + (index + 1) * 3600000).toLocaleTimeString(),
      ...currentWeather
    }));
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
        // Map the weather condition to animation type and update store
        const weatherType = this.mapWeatherConditionToType(data.current.condition.text);
        console.log('Current weather:', data.current.condition.text, '→', weatherType);
        this.store.dispatch(WeatherActions.setWeatherType({ weatherType }));
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
        this.forecastWeatherData = data;
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