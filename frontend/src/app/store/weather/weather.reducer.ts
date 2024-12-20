// frontend/src/app/store/weather/weather.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';

export interface WeatherState {
  currentWeather: any;
  loading: boolean;
  error: any;
  mockWeatherEnabled: boolean;
  selectedWeatherType: string;
}

export const initialState: WeatherState = {
  currentWeather: null,
  loading: false,
  error: null,
  mockWeatherEnabled: false,
  selectedWeatherType: 'sunny'
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather, (state: WeatherState) => ({
    ...state,
    loading: true
  })),
  on(WeatherActions.loadWeatherSuccess, (state: WeatherState, { weather }: { weather: any }) => ({
    ...state,
    currentWeather: weather,
    loading: false
  })),
  on(WeatherActions.loadWeatherFailure, (state: WeatherState, { error }: { error: any }) => ({
    ...state,
    error,
    loading: false
  })),
  on(WeatherActions.setWeatherType, (state: WeatherState, { weatherType }: { weatherType: string }) => ({
    ...state,
    selectedWeatherType: weatherType
  })),
  on(WeatherActions.toggleMockWeather, (state: WeatherState) => ({
    ...state,
    mockWeatherEnabled: !state.mockWeatherEnabled
  }))
);