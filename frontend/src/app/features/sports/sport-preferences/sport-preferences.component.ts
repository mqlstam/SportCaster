import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../service/location.service';
import { WeatherService } from '../../weather/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RcmdService } from '../../../service/rcmd.service';

@Component({
  selector: 'app-sport-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sport-preferences.component.html',
  styleUrl: './sport-preferences.component.css'
})
export class SportPreferencesComponent implements OnInit {
  city: string = '';
  errorMessage: string | null = null;
  intensity: string = '';
  duration: number | null = null;

  constructor (private locationService: LocationService, private weatherService: WeatherService, private rcmdService: RcmdService) {}
  ngOnInit(): void {
    const cookieValue = this.getCookie('loggedInUser');
    if (cookieValue){ 

      let user = JSON.parse(cookieValue);
      console.log("User is: " + user);

      let userIntensity = user.preferences.preferredIntensity;
      if (userIntensity == null || userIntensity == "No Preference") {
        userIntensity = '';
      }
      let userDuration = user.preferences.preferredDuration;
      
      this.intensity = userIntensity;
      this.duration = userDuration;


      this.rcmdService.updateFilters({ intensity: userIntensity, duration: userDuration });

    }  
  }



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

  
  onIntensityChange(event: any) {
    console.log(event);
    console.log('Intensity changed:', event.target.value);
    this.rcmdService.updateFilters({ intensity: event.target.value });
  }

  onDurationChange(event: any) {
    const duration = event.target.value ? parseInt(event.target.value) : null;
    this.rcmdService.updateFilters({ duration: duration });
  }

  onLocationChange(event: any) {
    this.rcmdService.updateFilters({ location: event.target.value });
  }

   getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(';').shift() || null : null;
  }
}
