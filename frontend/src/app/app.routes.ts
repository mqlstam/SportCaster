import { Routes } from '@angular/router';
import { UserSettingsComponent } from './features/user/user-settings/user-settings.component';
import { HomeComponent } from './features/home/home.component';
import { WeatherDashboardComponent } from './features/weather/weather-dashboard/weather-dashboard.component';

export const routes: Routes = [
    { path: '', component: WeatherDashboardComponent }, 
    { path: 'home', component: HomeComponent },
    { path: 'settings', component: UserSettingsComponent },
    { path: '**', redirectTo: '' }
];