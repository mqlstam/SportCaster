import { Routes } from '@angular/router';
import { WeatherDashboardComponent } from './features/weather/weather-dashboard/weather-dashboard.component';  // Zorg dat de juiste componenten worden geïmporteerd

export const routes: Routes = [
  { path: '', component: WeatherDashboardComponent }, 
];