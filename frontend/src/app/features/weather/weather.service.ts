import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/current/${location}`);
  }

  getWeatherForecast(location: string): Observable<any> {
    return this.http.get(`${this.backendUrl}/forecast/${location}`);
  }
}