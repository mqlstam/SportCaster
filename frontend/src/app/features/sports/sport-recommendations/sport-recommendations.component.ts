import { Component, OnInit } from '@angular/core';
import { RcmdService } from '../../../service/rcmd.service';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../weather/weather.service';

@Component({
  selector: 'app-sport-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sport-recommendations.component.html',
  styleUrl: './sport-recommendations.component.css'
})
export class SportRecommendationsComponent implements OnInit {
  suggestedSports: any[] = [];

  iconMap: { [key: string]: string } = {
    'Running': 'directions_run',
    'Tennis': 'sports_tennis',
    'Cycling': 'pedal_bike',
    'Surfing': 'surfing',
    'Basketball': 'sports_basketball',
    'Yoga': 'self_improvement',
    'Boxing': 'sports_mma',
    'Climbing': 'terrain',
    'Martial Arts': 'sports_kabaddi',
    'Skiing': 'downhill_skiing',
    'Table Tennis': 'sports_tennis',
    'Volleyball': 'sports_volleyball',
    'Riding': 'sports_horse_riding',
    'Default': 'help_outline',
  };

  weatherData: any;
  errorMessage: string | null = null;
  lat: any;
  lon: any;

  constructor(
    private rcmdService: RcmdService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    console.log(`Sport recommendations console called`)
    this.getSuggestedSports();
    this.fetchWeather();
  }

  getSuggestedSports() {
    this.rcmdService.listSuggestedSports();
    this.rcmdService.suggestedSports$.subscribe(sports => {
      console.log(`SuggestedSports in component: ${sports}`)
      this.suggestedSports = sports;
    });
  }

  async fetchWeather(): Promise<void> {
    try {
      await this.getUserLocation();
      console.log(`lat: ${this.lat}`)
      const location = `${this.lat},${this.lon}`;
      this.weatherService.getWeather(location).subscribe(
        (data) => {
          this.weatherData = data;
          console.log(`Fetched weather: ${this.weatherData}`)
        },
        () => {
          this.errorMessage = 'Error fetching current weather.';
        }
      );
    } catch (error) {
      console.log(`Failed to fetch weather due to loc error`)
    }
  }

  getUserLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            console.log(`Position: ${position.coords.latitude}`)
            resolve();
          },
          (error) => {
            this.errorMessage = 'Unable to retrieve your location. Please allow location access.';
            reject();
          }
        );
      } else {
        this.errorMessage = 'Geolocation is not supported by your browser.';
        reject();
      }
    })
  }
}