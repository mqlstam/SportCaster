import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://api.predicthq.com/v1/events/';
  private apiKey = 'OvYCtB6ocYh28eTxj1V8e59i42Sr5qR9uLBh_91j'; 

  constructor(private http: HttpClient) {}

  getEventsNearby(lat: number, lon: number, country: string, radius: number = 50000): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });
  
    const params = new HttpParams()
      .set('category', 'sports')
      .set('label', 'running')
      .set('limit', '20')
      .set('offset', '0') 
      .set('latitude', lat.toString())
      .set('longitude', lon.toString())
      .set('radius', radius.toString())
      .set('country', country); 
  
    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}