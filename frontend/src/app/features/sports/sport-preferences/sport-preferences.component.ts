import { Component } from '@angular/core';
import { LocationService } from '../../../service/location.service';
import { WeatherService } from '../../weather/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sport-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sport-preferences.component.html',
  styleUrl: './sport-preferences.component.css'
})
export class SportPreferencesComponent {
  city: string = '';
  errorMessage: string | null = null;

  constructor (private locationService: LocationService, private weatherService: WeatherService) {}

  onSubmit(): void {
    if (this.city.trim()) {
      console.log('Fetching location for city:', this.city);
      this.weatherService.getLocation(this.city).subscribe(
        coordinates => this.locationService.setLocation(coordinates.lat, coordinates.lon),
        error => this.errorMessage = 'Please enter a valid city name. '
      );
    }
  }

onUseCurrentLocation(): void {
    console.log(`onUseCurrentLocation Pressed`);
    this.locationService.fetchUserLocation().subscribe(
      location => {
        console.log('Using current location:', location);
        this.errorMessage = null;
      },
      error => {
        console.error('Error fetching current location:', error);
        this.errorMessage = error;
      }
    );
  }
  
}
