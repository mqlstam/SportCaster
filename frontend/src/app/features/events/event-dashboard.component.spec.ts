import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsComponent } from './event-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventService } from '../events/event.service';
import { of } from 'rxjs';

describe('EventDashboardComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let eventService: jasmine.SpyObj<EventService>;

  beforeEach(async () => {
    const eventServiceMock = jasmine.createSpyObj('EventService', ['getEventsNearby']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Voor HttpClient
        EventsComponent, // Standalone component hier importeren
      ],
      providers: [{ provide: EventService, useValue: eventServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
