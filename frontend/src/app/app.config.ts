// frontend/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { weatherReducer } from './store/weather/weather.reducer';
import { WeatherEffects } from './store/weather/weather.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ weather: weatherReducer }),
    provideEffects([WeatherEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};