import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { LocationService } from '../../service/location.service';
import { CommonModule } from '@angular/common';

interface Event {
  title: string;
  start: string;
  geo: {
    address: {
      locality: string;
      region: string;
      formatted_address: string;
    };
  };
  labels: string[];
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  currentEventIndex: number = 0;
  errorMessage: string | null = null;

  constructor(private eventService: EventService, private locationService: LocationService) {}

  ngOnInit(): void {
    // Observe the location and fetch events based on it
    this.locationService.location$.subscribe(location => {
      if (location) {
        this.fetchEventsByLocation(location.lat, location.lon);
      } else {
        this.initializeLocation();
      }
    });
  }

  initializeLocation(): void {
    // Fetch user's current location and update the location service
    this.locationService.fetchUserLocation().subscribe(
      location => {
        console.log('User location obtained:', location);
        this.locationService.setLocation(location.lat, location.lon);
      },
      error => {
        console.error('Error fetching location:', error);
        this.errorMessage = 'Unable to fetch location. Please allow location access.';
      }
    );
  }

  fetchEventsByLocation(lat: number, lon: number): void {
    console.log('Fetching events for location:', lat, lon);
  
    this.locationService.getCountryCode(lat, lon).subscribe(
      countryCode => {
        console.log('Country code:', countryCode);
        this.eventService.getEventsNearby(lat, lon, countryCode).subscribe(
          data => {
            const now = new Date();
            this.events = data.results
              .filter((event: Event) => new Date(event.start) > now)
              .sort((a: Event, b: Event) => new Date(a.start).getTime() - new Date(b.start).getTime());
            console.log('Events fetched:', this.events);
          },
          error => {
            console.error('Error fetching events:', error);
            this.errorMessage = 'Error fetching events for your location.';
          }
        );
      },
      error => {
        console.error('Error fetching country code:', error);
        this.errorMessage = 'Unable to fetch country information for your location.';
      }
    );
  }

  get currentEvent(): Event | undefined {
    return this.events[this.currentEventIndex];
  }

  nextEvent(): void {
    if (this.currentEventIndex < this.events.length - 1) {
      this.currentEventIndex++;
    }
  }

  previousEvent(): void {
    if (this.currentEventIndex > 0) {
      this.currentEventIndex--;
    }
  }

  formatLabel(label: string | undefined): string {
    if (!label) return '';
    const formatted = label.replace(/-/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  openGoogleMaps() {
    if (this.currentEvent?.geo?.address?.formatted_address) {
      const address = encodeURIComponent(this.currentEvent.geo.address.formatted_address);
      const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
      window.open(url, '_blank');
    } else {
      // Handle the case where the address is not available
      this.errorMessage = "Address not available for this event.";
    }
  }
}