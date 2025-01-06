import { WeatherService } from "../features/weather/weather.service";
import { Injectable } from '@angular/core';
import { SportService } from "./sport.service";

@Injectable({
  providedIn: 'root'
})

export class RcmdService {
  constructor(
    private weatherService: WeatherService,
    private sportService: SportService,
  ) { }

  lat: number = 0;
  lon: number = 0;

  temp: number = 0;
  wind_kph: number = 0;
  precip_mm: number = 0;


  listSuitableSports(): void {
    //get current weather stats
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
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
                    return sport.minTemp <= this.temp &&
                      sport.maxTemp >= this.temp &&
                      sport.windSpeedLimit >= this.wind_kph &&
                      (this.precip_mm > 0 ? sport.rainSuitable === true : true) &&
                      (!sport.isOutdoor || sport.isOutdoor === false);
                  });
                  console.log('Filtered Sports:', filteredSports);
                } else {
                  console.error('Sports data is not an array:', response);
                }

              });
            },
            (error: any) => {
              console.error('Error fetching weather data:', error);
            }
          );
        },
        (error) => {
          console.error('Unable to retrieve your location. Please allow location access.');
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }







}
