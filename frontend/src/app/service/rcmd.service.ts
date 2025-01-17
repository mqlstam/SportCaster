import { WeatherService } from "../features/weather/weather.service";
import { Injectable } from '@angular/core';
import { SportService } from "./sport.service";
import { BehaviorSubject, of, switchMap } from "rxjs";
import { LocationService } from "./location.service";

interface SportFilters {
  intensity?: string;
  duration?: number | null;
  location?: 'indoor' | 'outdoor' | 'both';
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

  constructor(
    private weatherService: WeatherService,
    private sportService: SportService,
    private locationService: LocationService

  ) { }

  private suggestedSports = new BehaviorSubject<Sport[]>([]);
  suggestedSports$ = this.suggestedSports.asObservable();

  private availableEquipment = new BehaviorSubject<string[]>([]);
  availableEquipment$ = this.availableEquipment.asObservable();
  
  private filters: SportFilters = {
    intensity: '',
    duration: null,
    location: 'both'
  };
  
  lat: number = 0;
  lon: number = 0;

  temp: number = 0;
  wind_kph: number = 0;
  precip_mm: number = 0;

  fetchEquipment() {
    this.sportService.getSports().subscribe((response: any) => {
      console.log(response);

      const sports = response.sports;
      let equipmentList: string[] = [];

      if (Array.isArray(sports)) {
        // Loop door elk sport en haal de equipment items op
        sports.forEach((sport: any) => {
          sport.equipment.forEach((item: { item: string }) => {
            if (!equipmentList.includes(item.item)) {
              equipmentList.push(item.item);
            }
          });
        });

        console.log('Available Equipment:', equipmentList);
        this.availableEquipment.next(equipmentList); // Update de lijst van equipment
      } else {
        console.error('Sports data is not an array:', response);
      }
    });
  }

  updateFilters(newFilters: Partial<SportFilters>) {
    this.filters = { ...this.filters, ...newFilters };
    this.listSuggestedSports();
  }

  listSuggestedSports(): void {
    // Combine location updates and weather data using switchMap for streamlined handling
    this.locationService.location$.pipe(
      switchMap(location => {
        if (!location) {
          console.error('Location not available');
          return of(null);
        }
        this.lat = location.lat;
        this.lon = location.lon;
  
        // Fetch weather for the current location
        const locationString = `${this.lat},${this.lon}`;
        return this.weatherService.getWeather(locationString);
      }),
      switchMap(weatherData => {
        if (!weatherData) {
          console.error('Weather data not available');
          return of([]);
        }
  
        // Update weather-related conditions
        this.temp = weatherData.current.temp_c;
        this.wind_kph = weatherData.current.wind_kph;
        this.precip_mm = weatherData.current.precip_mm;
  
        // Fetch sports and apply weather-based filtering
        return this.sportService.getSports();
      })
    ).subscribe(
      (response: any) => {
        const sports = response.sports;
  
        if (!Array.isArray(sports)) {
          console.error('Sports data is not an array:', response);
          this.suggestedSports.next([]);
          return;
        }
  
        // Apply weather and user-defined filters
        const filteredSports = sports.filter((sport: Sport) => {
          const matchesLocation = this.filters.location === 'both' ||
            (this.filters.location === 'indoor' && !sport.isOutdoor) ||
            (this.filters.location === 'outdoor' && sport.isOutdoor);
  
          const matchesIntensity = !this.filters.intensity || sport.intensity === this.filters.intensity;
  
          const matchesDuration = !this.filters.duration ||
            (sport.duration.min <= this.filters.duration && sport.duration.max >= this.filters.duration);
  
          const matchesWeather = !sport.isOutdoor ||
            (sport.minTemp <= this.temp &&
              sport.maxTemp >= this.temp &&
              sport.windSpeedLimit >= this.wind_kph &&
              (this.precip_mm > 0 ? sport.rainSuitable : true));
  
          return matchesLocation && matchesIntensity && matchesDuration && matchesWeather;
        });
  
        console.log('Filtered Sports:', filteredSports);
        this.suggestedSports.next(filteredSports);
      },
      error => {
        console.error('Error in fetching data:', error);
        this.suggestedSports.next([]);
      }
    );
  }
  

}







