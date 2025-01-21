import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PopupService } from './service/popup.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { RegistrationPopupComponent } from "./features/registration-popup/registration-popup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,FormsModule,RouterModule,RegistrationPopupComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private popupService: PopupService) {}

  triggerHomeLoginPopup() {
    this.popupService.toggleLoginPopup();
  }
}