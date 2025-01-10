import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  errorMessage: string | null = null;
  currentEventIndex: number = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getMarathonsInNetherlands().subscribe(
      (data) => {
        this.events = data.results;
      },
      (error) => {
        this.errorMessage = 'Error fetching events.';
      }
    );
  }

  get currentEvent() {
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
}