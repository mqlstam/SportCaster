import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherState } from '../../../store/weather/weather.reducer';
import * as WeatherActions from '../../../store/weather/weather.actions';
import { LocationService } from '../../../service/location.service';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css'
})
export class WeatherDashboardComponent implements OnInit {
  weather: any; // Voeg de 'weather' eigenschap toe
  city: string = '';
  selectedLat: number = 0;
  selectedLon: number = 0;
  weatherData: any;
  forecastWeatherData: any;
  forecastData: any[] = [];
  errorMessage: string | null = null;
  manualLat: number = 0;
  manualLon: number = 0;


  constructor(
    private weatherService: WeatherService,
    private store: Store<{ weather: WeatherState }>,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.store.select(state => state.weather.mockWeatherEnabled).subscribe(isMockEnabled => {
      if (isMockEnabled) {
        this.store.select(state => state.weather.selectedWeatherType).subscribe(weatherType => {
          this.weatherService.getMockWeather(weatherType as any).subscribe(data => {
            this.weatherData = { current: data };
            // this.createMockForecast(data);
          });
        });
      } else {
        this.initializeLocation();
      }
    });

    this.locationService.location$.subscribe(location => {
      if (location) {
        this.fetchWeather(location.lat, location.lon);
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

  private initializeLocation(): void {
    this.locationService.fetchUserLocation().subscribe(
      location => {
        console.log('User location fetched:', location);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  // getUserLocation(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lon = position.coords.longitude;
  //         this.fetchWeather(lat, lon);
  //       },
  //       (error) => {
  //         this.errorMessage = 'Unable to retrieve your location. Please allow location access.';
  //       }
  //     );
  //   } else {
  //     this.errorMessage = 'Geolocation is not supported by your browser.';
  //   }
  // }

  getCoordinatesFromCity(city: string): void {
    this.weatherService.getLocation(city).subscribe(
      (coords) => {
        console.log(`Coordinates for ${city}: Latitude ${coords.lat}, Longitude ${coords.lon}`);
        this.fetchWeather(coords.lat, coords.lon);
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error fetching coordinates:', error);
        this.errorMessage = 'Could not retrieve coordinates for the entered city. Please try again.';
      }
    );
  }

  // setLocation(lat: number, lon: number): void {
  //   console.log('Setting location to:', lat, lon);
  //   this.fetchWeather(lat, lon);
  // }
  
  fetchWeather(lat: number, lon: number): void {
    console.log('Fetching weather for:', lat, lon);
    const location = `${lat},${lon}`;
    this.weatherService.getWeather(location).subscribe(
      (data) => {
        console.log('Weather data received:', data);
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





  // onSubmit(): void {
  //   console.log('Manual input:', this.manualLat, this.manualLon);
  //   if (
  //     this.manualLat !== null &&
  //     this.manualLon !== null &&
  //     this.manualLat >= -90 && this.manualLat <= 90 &&
  //     this.manualLon >= -180 && this.manualLon <= 180
  //   ) {
  //     this.setLocation(this.manualLat, this.manualLon);
  //     this.errorMessage = null;
  //   } else {
  //     this.errorMessage = 'Please enter valid latitude (-90 to 90) and longitude (-180 to 180).';
  //   }
  // }


  onSubmit(): void {
    if (this.city.trim()) {
      console.log('Submitting form for city:', this.city);
      this.getCoordinatesFromCity(this.city);
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Please enter a city name.';
    }
  }
  private weatherIconMapping = [
    { code: 1000, customIcon: "assets/weather-icons/icons8-sun-100.png" }, // Sunny / Clear
    { code: 1003, customIcon: "assets/weather-icons/icons8-partly-cloudy-day-100.png" }, // Partly cloudy
    { code: 1006, customIcon: "assets/weather-icons/icons8-clouds-100.png" }, // Cloudy
    { code: 1009, customIcon: "assets/weather-icons/icons8-clouds-100.png" }, // Overcast (no specific overcast icon, using cloudy)
    { code: 1030, customIcon: "assets/weather-icons/icons8-foggy-100.png" }, // Mist
    { code: 1063, customIcon: "assets/weather-icons/icons8-rain-cloud-100.png" }, // Patchy rain possible
    { code: 1066, customIcon: "assets/weather-icons/icons8-light-snow-100.png" }, // Patchy snow possible
    { code: 1069, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Patchy sleet possible
    { code: 1072, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Patchy freezing drizzle possible
    { code: 1087, customIcon: "assets/weather-icons/icons8-storm-100.png" }, // Thundery outbreaks possible
    { code: 1114, customIcon: "assets/weather-icons/icons8-snow-storm-100.png" }, // Blowing snow
    { code: 1117, customIcon: "assets/weather-icons/icons8-snow-storm-100.png" }, // Blizzard
    { code: 1135, customIcon: "assets/weather-icons/icons8-foggy-100.png" }, // Fog
    { code: 1147, customIcon: "assets/weather-icons/icons8-foggy-100.png" }, // Freezing fog
    { code: 1150, customIcon: "assets/weather-icons/icons8-light-rain-100.png" }, // Patchy light drizzle
    { code: 1153, customIcon: "assets/weather-icons/icons8-light-rain-100.png" }, // Light drizzle
    { code: 1168, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Freezing drizzle
    { code: 1171, customIcon: "assets/weather-icons/icons8-heavy-rain-100.png" }, // Heavy freezing drizzle
    { code: 1180, customIcon: "assets/weather-icons/icons8-light-rain-100.png" }, // Patchy light rain
    { code: 1183, customIcon: "assets/weather-icons/icons8-light-rain-100.png" }, // Light rain
    { code: 1186, customIcon: "assets/weather-icons/icons8-moderate-rain-100.png" }, // Moderate rain at times
    { code: 1189, customIcon: "assets/weather-icons/icons8-moderate-rain-100.png" }, // Moderate rain
    { code: 1192, customIcon: "assets/weather-icons/icons8-heavy-rain-100-2.png" }, // Heavy rain at times
    { code: 1195, customIcon: "assets/weather-icons/icons8-heavy-rain-100.png" }, // Heavy rain
    { code: 1198, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Light freezing rain
    { code: 1201, customIcon: "assets/weather-icons/icons8-heavy-rain-100.png" }, // Moderate or heavy freezing rain
    { code: 1204, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Light sleet
    { code: 1207, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Moderate or heavy sleet
    { code: 1210, customIcon: "assets/weather-icons/icons8-light-snow-100.png" }, // Patchy light snow
    { code: 1213, customIcon: "assets/weather-icons/icons8-light-snow-100.png" }, // Light snow
    { code: 1216, customIcon: "assets/weather-icons/icons8-snow-100.png" }, // Patchy moderate snow
    { code: 1219, customIcon: "assets/weather-icons/icons8-snow-100.png" }, // Moderate snow
    { code: 1222, customIcon: "assets/weather-icons/icons8-snow-storm-100.png" }, // Patchy heavy snow
    { code: 1225, customIcon: "assets/weather-icons/icons8-snow-storm-100.png" }, // Heavy snow
    { code: 1237, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Ice pellets
    { code: 1240, customIcon: "assets/weather-icons/icons8-light-rain-100.png" }, // Light rain shower
    { code: 1243, customIcon: "assets/weather-icons/icons8-heavy-rain-100.png" }, // Moderate or heavy rain shower
    { code: 1246, customIcon: "assets/weather-icons/icons8-torrential-rain-100.png" }, // Torrential rain shower
    { code: 1249, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Light sleet showers
    { code: 1252, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Moderate or heavy sleet showers
    { code: 1255, customIcon: "assets/weather-icons/icons8-light-snow-100.png" }, // Light snow showers
    { code: 1258, customIcon: "assets/weather-icons/icons8-snow-100.png" }, // Moderate or heavy snow showers
    { code: 1261, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Light showers of ice pellets
    { code: 1264, customIcon: "assets/weather-icons/icons8-sleet-100.png" }, // Moderate or heavy showers of ice pellets
    { code: 1273, customIcon: "assets/weather-icons/icons8-storm-100.png" }, // Patchy light rain with thunder
    { code: 1276, customIcon: "assets/weather-icons/icons8-storm-with-heavy-rain-100.png" }, // Moderate or heavy rain with thunder
    { code: 1279, customIcon: "assets/weather-icons/icons8-storm-100.png" }, // Patchy light snow with thunder
    { code: 1282, customIcon: "assets/weather-icons/icons8-storm-100.png" }  // Moderate or heavy snow with thunder
];

  // Function to map the condition code to the custom icon
  mapConditionToIcon(code: number): string {
    const condition = this.weatherIconMapping.find(icon => icon.code === code);
    return condition ? condition.customIcon : "assets/weather-icons/icons8-clouds-100.png"; // Default to cloudy if no match
  }
  
}