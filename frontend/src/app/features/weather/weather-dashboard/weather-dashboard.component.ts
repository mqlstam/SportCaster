import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Voeg deze import toe
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Voeg HttpClientModule toe aan imports
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css'],
})
export class WeatherDashboardComponent implements OnInit {
  currentWeather: any = null;
  forecast: any = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const location = 'Breda'; // Of gebruik een dynamische locatie
    this.weatherService.getCurrentWeather(location).subscribe(
      (data) => {
        this.currentWeather = data;
        console.log('Current Weather:', data);
      },
      (error) => {
        console.error('Error fetching current weather:', error);
      }
    );

    this.weatherService.getWeatherForecast(location).subscribe(
      (data) => {
        this.forecast = data;
        console.log('Weather Forecast:', data);
      },
      (error) => {
        console.error('Error fetching weather forecast:', error);
      }
    );
  }
}