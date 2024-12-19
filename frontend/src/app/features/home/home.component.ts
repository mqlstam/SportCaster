import { Component } from '@angular/core';
import { WeatherDashboardComponent } from '../weather/weather-dashboard/weather-dashboard.component';
import { SportRecommendationsComponent } from '../sports/sport-recommendations/sport-recommendations.component';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesDialogComponent } from '../preferences/preferences-dialog/preferences-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    WeatherDashboardComponent,
    SportRecommendationsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  openPreferences() {
    const dialogRef = this.dialog.open(PreferencesDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New preferences:', result);
        // Todo: Handle the new preferences
      }
    });
  }
}