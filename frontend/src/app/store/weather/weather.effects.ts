// frontend/src/app/store/weather/weather.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WeatherService } from '../../features/weather/weather.service';
import * as WeatherActions from './weather.actions';

@Injectable()
export class WeatherEffects {
  loadWeather$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadWeather),
    mergeMap(() => this.weatherService.getWeather('Amsterdam')
      .pipe(
        map(weather => WeatherActions.loadWeatherSuccess({ weather })),
        catchError(error => of(WeatherActions.loadWeatherFailure({ error })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}