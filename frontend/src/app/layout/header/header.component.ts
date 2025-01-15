import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PopupService } from '../../service/popup.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private popupService: PopupService) {}

  openPopup() {
    this.popupService.openPopup();  // Popup openen via de service
  }
}