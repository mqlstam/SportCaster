import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}