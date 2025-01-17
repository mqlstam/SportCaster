// frontend/src/app/features/weather/weather.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { WeatherState } from '../../store/weather/weather.reducer';

type WeatherType = 'sunny' | 'rainy' | 'snowy' | 'cloudy' | 'stormy';

interface MockWeatherData {
  condition: {
    text: string;
    icon: string;
  };
  temp_c: number;
}

const mockWeatherData: Record<WeatherType, MockWeatherData> = {
  sunny: { 
    condition: { 
      text: 'Sunny', 
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
    }, 
    temp_c: 25 
  },
  rainy: { 
    condition: { 
      text: 'Rain', 
      icon: '//cdn.weatherapi.com/weather/64x64/day/308.png'
    }, 
    temp_c: 15 
  },
  snowy: { 
    condition: { 
      text: 'Snow', 
      icon: '//cdn.weatherapi.com/weather/64x64/day/338.png'
    }, 
    temp_c: -2 
  },
  cloudy: { 
    condition: { 
      text: 'Cloudy', 
      icon: '//cdn.weatherapi.com/weather/64x64/day/119.png'
    }, 
    temp_c: 20 
  },
  stormy: { 
    condition: { 
      text: 'Thunder', 
      icon: '//cdn.weatherapi.com/weather/64x64/day/389.png'
    }, 
    temp_c: 18 
  }
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://api.weatherapi.com/v1';
  private apiKey = '233e6c2040494734a82132204241712';

  constructor(
    private http: HttpClient,
    private store: Store<{ weather: WeatherState }>,
  ) {
  }

  getWeather(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current.json?key=${this.apiKey}&q=${location}`);
  }

  getForecast(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=1`);
  }

  getMockWeather(type: WeatherType): Observable<MockWeatherData> {
    return of(mockWeatherData[type]);
  }

  getLocation(city: string): Observable<{ lat: number; lon: number }> {
    return this.http.get<any>(`${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`).pipe(
      map(response => ({
        lat: response.location.lat,
        lon: response.location.lon
      }))
    );
  }

  getCitySuggestions(query: string): Observable<string[]> {
    if (!query.trim()) {
      return of([]); // Geef een lege array terug als de invoer leeg is
    }
  
    const apiUrl = `http://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${query}`;
  
    return this.http.get<any[]>(apiUrl).pipe(
      map((response) =>
        response.map((item) => `${item.name}, ${item.country}`)
      )
    );
  }
  
  
  
}