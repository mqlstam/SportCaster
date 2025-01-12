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

  //TEMPORARY IMPLEMENTATION
  iconMap: { [key: string]: string } = {
    'Soccer': 'https://www.reshot.com/preview-assets/icons/5Y3TB47EMK/football-player-5Y3TB47EMK.svg',
    'Boxing': 'https://www.svgrepo.com/show/171268/soccer-player-running-behind-the-ball.svg',
    'Yoga': 'https://www.reshot.com/preview-assets/icons/9NGDPVTH4B/yoga-9NGDPVTH4B.svg',
    'Skiing': 'https://www.svgrepo.com/show/171268/soccer-player-running-behind-the-ball.svg',
    'Table Tennis': 'https://www.reshot.com/preview-assets/icons/T42E8JLPBU/tennis-player-T42E8JLPBU.svg',
    'Default': ''
  };

  weatherData: any;
  errorMessage: string | null = null;
  lat: any;
  lon: any;

  constructor(private rcmdService: RcmdService, private weatherService: WeatherService) { }

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
        console.log(`Fetched weater: ${this.weatherData}`)
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
