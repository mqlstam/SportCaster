import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'http://api.weatherapi.com/v1';
  private apiKey = '233e6c2040494734a82132204241712';

  constructor(private http: HttpClient) {}

  getWeather(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current.json?key=${this.apiKey}&q=${location}`);
  }

  getForecast(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=1`);
  }
}