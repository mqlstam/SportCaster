import { WeatherService } from "../features/weather/weather.service";
import { Injectable } from '@angular/core';
import { SportService } from "./sport.service";
import { BehaviorSubject } from "rxjs";
import { LocationService } from "./location.service";
@Injectable({
  providedIn: 'root'
})

export class RcmdService {
  constructor(
    private weatherService: WeatherService,
    private sportService: SportService,
    private locationService: LocationService

  ) { }

  lat: number = 0;
  lon: number = 0;

  temp: number = 0;
  wind_kph: number = 0;
  precip_mm: number = 0;


  private suggestedSports = new BehaviorSubject<any[]>([]);
  suggestedSports$ = this.suggestedSports.asObservable();

  listSuggestedSports(): void {

    this.locationService.location$.subscribe(location2 => {
      if (location2) {
        console.log('CURRENT LAT ION AA');
        console.log(location2.lat, location2.lon);
        this.lat = location2.lat;
        this.lon = location2.lon;
        const location = `${this.lat},${this.lon}`;

        this.weatherService.getWeather(location).subscribe(
          (data: any) => {
            console.log(data);
            this.temp = data.current.temp_c;
            this.wind_kph = data.current.wind_kph;
            this.precip_mm = data.current.precip_mm;
            console.log(`Precip in mm: ${this.precip_mm}`)

            //get sports
            this.sportService.getSports().subscribe((response: any) => {
              console.log(response);

              const sports = response.sports;

              if (Array.isArray(sports)) {
                const filteredSports = sports.filter((sport: any) => {
                  if (!sport.isOutdoor) {
                    return sport;
                  } else {
                    return sport.minTemp <= this.temp &&
                      sport.maxTemp >= this.temp &&
                      sport.windSpeedLimit >= this.wind_kph &&
                      (this.precip_mm > 0 ? sport.rainSuitable === true : true)
                  }
                });

                console.log('Filtered Sports:', filteredSports);
                this.suggestedSports.next(filteredSports);
              } else {
                console.error('Sports data is not an array:', response);
              }

            });
          },
          (error: any) => {
            console.error('Error fetching weather data:', error);
          }
        );

      }
    }
  )
}

}






