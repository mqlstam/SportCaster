import { Component, OnInit } from '@angular/core';
import { RcmdService } from '../../../service/rcmd.service';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../weather/weather.service';
import { LocationService } from '../../../service/location.service';

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

  constructor(
    private rcmdService: RcmdService, 
    private weatherService: WeatherService,
    private locationService: LocationService,
  
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
    this.locationService.location$.subscribe(location => {
      if (location) {
        console.log('CURRENT LAT ION AA');
        console.log(location.lat, location.lon);
        this.lat = location.lat;
        this.lon = location.lon;
        
        const location2 = `${this.lat},${this.lon}`;

        this.weatherService.getWeather(location2).subscribe(
          (data) => {
            this.weatherData = data;
            console.log(`Fetched weater: ${this.weatherData}`)
          },
          () => {
            this.errorMessage = 'Error fetching current weather.';
          }
        );
      this.getSuggestedSports();
      }
    });
  } catch (error) {
    console.error('Error fetching current location:', error);
  }
}



}
