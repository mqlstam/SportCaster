import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { PopupService } from './service/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HeaderComponent, FooterComponent],
})
export class AppComponent {
  constructor(private popupService: PopupService) {}

  triggerHomeLoginPopup() {
    this.popupService.toggleLoginPopup();  // Gebruik de service om de popup te tonen
  }
}