// frontend/src/app/store/weather/weather.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction('[Weather] Load Weather');
export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ weather: any }>()
);
export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: any }>()
);
export const setWeatherType = createAction(
  '[Weather] Set Weather Type',
  props<{ weatherType: string }>()
);
export const toggleMockWeather = createAction(
  '[Weather] Toggle Mock Weather'
);