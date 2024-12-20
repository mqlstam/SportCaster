import { Routes } from '@angular/router';
import { UserSettingsComponent } from './features/user/user-settings/user-settings.component';
import { HomeComponent } from './features/home/home.component';
import { WeatherDashboardComponent } from './features/weather/weather-dashboard/weather-dashboard.component';

export const routes: Routes = [
    { path: 'weer',component: WeatherDashboardComponent}, 
    { path: '', component: HomeComponent },
    { path: 'settings', component: UserSettingsComponent },
    { path: '**', redirectTo: '' }
];