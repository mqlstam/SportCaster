// frontend/src/app/features/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherAnimationComponent } from '../../shared/components/weather-animation/weather-animation.component';
import { WeatherDashboardComponent } from '../weather/weather-dashboard/weather-dashboard.component';
import * as WeatherActions from '../../store/weather/weather.actions';
import { CommonModule } from '@angular/common';

import { EventsComponent } from '../events/event-dashboard.component';

import { RcmdService } from '../../service/rcmd.service';
import { SportPreferencesComponent } from '../sports/sport-preferences/sport-preferences.component';
import { SportRecommendationsComponent } from '../sports/sport-recommendations/sport-recommendations.component';
import { LoginComponent } from '../login/login.component';
import { PopupService } from '../../service/popup.service';

interface AppState {
  weather: {
    selectedWeatherType: string;
    mockWeatherEnabled: boolean;
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    WeatherAnimationComponent,
    WeatherDashboardComponent,
    CommonModule,
    SportPreferencesComponent,
    SportRecommendationsComponent,
    EventsComponent,
    LoginComponent
  ],
  template: `
    <div class="relative min-h-screen">
      <app-weather-animation
        [weatherType]="(currentWeather$ | async) || 'sunny'"
      >
      </app-weather-animation>
      <div class="container mx-auto p-4">
        <!-- Weather Controls -->
        <div class="bg-white/80 rounded-lg p-4 mb-4 backdrop-blur-sm" hidden>
          <h2 class="text-2xl font-bold mb-4">Weather Controls</h2>
          <div class="flex flex-wrap gap-4 mb-4">
            <button
              *ngFor="let type of weatherTypes"
              (click)="setWeatherType(type)"
              class="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
              [class.bg-blue-700]="(currentWeather$ | async) === type"
            >
              {{ type | titlecase }}
            </button>
          </div>
          <label class="flex items-center">
            <input
              type="checkbox"
              [checked]="mockEnabled$ | async"
              (change)="toggleMock()"
              class="mr-2"
            />
            Use Mock Weather
          </label>
        </div>

        <app-sport-preferences></app-sport-preferences>

        <!-- Grid section -->
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div class="space-y-4">
            <app-sport-recommendations></app-sport-recommendations>
          </div>

          <div class="space-y-4">
            <app-weather-dashboard></app-weather-dashboard>
            <app-events></app-events>
          </div>
        </div>

        <div class="mt-8"></div>
      </div>
      
      <app-login
        *ngIf="isLoginPopupVisible"
        (closeLogin)="closeLoginPopup()"
      ></app-login>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  weatherTypes = ['sunny', 'rainy', 'snowy', 'cloudy', 'stormy'];
  currentWeather$ = this.store.select(
    (state) => state.weather.selectedWeatherType
  );
  mockEnabled$ = this.store.select((state) => state.weather.mockWeatherEnabled);
  isLoginPopupVisible = false;


  constructor(
    private store: Store<AppState>,
    private rcmdService: RcmdService,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.store.dispatch(WeatherActions.loadWeather());

    console.log('RCMD SERVICE!!');
    this.rcmdService.listSuggestedSports();
    this.store.dispatch(WeatherActions.loadWeather());

    this.popupService.loginPopup$.subscribe((isVisible) => {
      this.isLoginPopupVisible = isVisible; 
    });
  }

  setWeatherType(type: string) {
    this.store.dispatch(WeatherActions.setWeatherType({ weatherType: type }));
  }

  toggleMock() {
    this.store.dispatch(WeatherActions.toggleMockWeather());
  }

  toggleLoginPopup() {
    this.popupService.toggleLoginPopup(); 
  }

  closeLoginPopup() {
    this.popupService.closeLoginPopup();
  }
}
