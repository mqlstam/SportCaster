import { Component, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PopupService } from '../../service/popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() onCircleClick = new EventEmitter<void>();

  triggerLogin() {
    this.onCircleClick.emit();

  constructor(private popupService: PopupService) {}

  openPopup() {
    this.popupService.openPopup();  // Popup openen via de service
  }
}