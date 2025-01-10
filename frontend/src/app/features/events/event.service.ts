import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://api.predicthq.com/v1/events/';
  private accessToken = 'OvYCtB6ocYh28eTxj1V8e59i42Sr5qR9uLBh_91j'; // Voeg je PredictHQ API-token hier toe

  constructor(private http: HttpClient) {}

  getMarathonsInNetherlands(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });

    const params = {
      category: 'sports',
      label: 'marathon',
      country: 'NL'
    };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}