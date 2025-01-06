import { WeatherService } from "../features/weather/weather.service";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
  export class RcmdService {
    constructor(private weatherService: WeatherService) {}

    lat: number = 0;
    lon: number = 0;
    errorMessage: string | null = null;

    getWeatherData(): void {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.lat = position.coords.latitude;
              this.lon = position.coords.longitude;
              const location = `${this.lat},${this.lon}`;
              this.weatherService.getWeather(location).subscribe(
                (data: any) => {
                    console.log(data); // Handle the data as required
                },
                (error: any) => {
                    console.error('Error fetching weather data:', error); 
                }
            );
            },
            (error) => {
              this.errorMessage = 'Unable to retrieve your location. Please allow location access.';
            }
          );
        } else {
          this.errorMessage = 'Geolocation is not supported by your browser.';
        }
      }
}
