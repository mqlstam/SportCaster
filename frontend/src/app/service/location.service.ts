import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationSubject = new BehaviorSubject<{ lat: number; lon: number } | null>(null);
  location$ = this.locationSubject.asObservable();

  setLocation(lat: number, lon: number): void {
    this.locationSubject.next({ lat, lon });
  }

  getCurrentLocation(): { lat: number; lon: number } | null {
    return this.locationSubject.getValue();
  }

  fetchUserLocation(): Observable<{ lat: number; lon: number }> {
    console.log(`fetchUserLoaction called`)
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            this.setLocation(lat, lon);
            observer.next({ lat, lon });
            observer.complete();
          },
          (error) => {
            observer.error('Unable to retrieve location. Please allow location access.');
          }
        );
      } else {
        observer.error('Geolocation is not supported by your browser.');
      }
    });
  }
  getCountryCode(lat: number, lon: number): Observable<string> {
    const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  
    return new Observable((observer) => {
      fetch(reverseGeocodeUrl)
        .then(response => response.json())
        .then(data => {
          if (data.address && data.address.country_code) {
            observer.next(data.address.country_code.toUpperCase());
            observer.complete();
          } else {
            observer.error('Unable to determine country code.');
          }
        })
        .catch(err => observer.error('Error fetching country code: ' + err));
    });
  }
}
