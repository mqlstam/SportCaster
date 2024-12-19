import { Routes } from '@angular/router';
import { UserSettingsComponent } from './features/user/user-settings/user-settings.component';
import { HomeComponent } from './features/home/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: '**', redirectTo: '' }
];