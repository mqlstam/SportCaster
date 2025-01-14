// rcmd.service.ts

import { WeatherService } from "../features/weather/weather.service";
import { Injectable } from '@angular/core';
import { SportService } from "./sport.service";
import { BehaviorSubject } from "rxjs";

interface SportFilters {
  intensity?: string;
  duration?: number | null;
}

interface Sport {
  name: string;
  isOutdoor: boolean;
  rainSuitable: boolean;
  windSpeedLimit: number;
  minTemp: number;
  maxTemp: number;
  duration: {
    min: number;
    max: number;
  };
  intensity: string;
  isTeamSport: boolean;
  equipment: Array<{
    item: string;
    required: boolean;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class RcmdService {
  private suggestedSports = new BehaviorSubject<Sport[]>([]);
  suggestedSports$ = this.suggestedSports.asObservable();
  
  private filters: SportFilters = {
    intensity: '',
    duration: null
  };

  lat: number = 0;
  lon: number = 0;

  temp: number = 0;
  wind_kph: number = 0;
  precip_mm: number = 0;

  constructor(
    private weatherService: WeatherService,
    private sportService: SportService,
  ) { }

  updateFilters(newFilters: Partial<SportFilters>) {
    this.filters = { ...this.filters, ...newFilters };
    this.listSuggestedSports();
  }

  listSuggestedSports(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          const location = `${this.lat},${this.lon}`;
          
          this.weatherService.getWeather(location).subscribe(
            (data: any) => {
              this.temp = data.current.temp_c;
              this.wind_kph = data.current.wind_kph;
              this.precip_mm = data.current.precip_mm;

              this.sportService.getSports().subscribe((response: any) => {
                let sports = response.sports as Sport[];

                if (Array.isArray(sports)) {
                  // Weer-gebaseerde filtering
                  sports = sports.filter((sport: Sport) => {
                    if (!sport.isOutdoor) {
                      return true;
                    } else {
                      return sport.minTemp <= this.temp &&
                        sport.maxTemp >= this.temp &&
                        sport.windSpeedLimit >= this.wind_kph &&
                        (this.precip_mm > 0 ? sport.rainSuitable === true : true)
                    }
                  });

                  // Gebruikersfilters toepassen
                  if (this.filters.intensity) {
                    sports = sports.filter((sport: Sport) => 
                      sport.intensity === this.filters.intensity
                    );
                  }

                  if (this.filters.duration !== null) {
                    sports = sports.filter((sport: Sport) =>
                      this.filters.duration! >= sport.duration.min &&
                      this.filters.duration! <= sport.duration.max
                    );
                  }

                  console.log('Filtered Sports:', sports);
                  this.suggestedSports.next(sports);
                }
              });
            },
            (error: any) => {
              console.error('Error fetching weather data:', error);
            }
          );
        },
        (error) => {
          console.error('Unable to retrieve location:', error);
        }
      );
    }
  }
}