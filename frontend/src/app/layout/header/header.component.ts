import { Component, EventEmitter, Output } from '@angular/core';
import { PopupService } from '../../service/popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() onCircleClick = new EventEmitter<void>();

  constructor(private popupService: PopupService) {}

  triggerLogin() {
    this.onCircleClick.emit();
  }

  openPopup() {
    this.popupService.toggleRegisterPopup(); 
  }

  openRegisterPopup() {
    this.popupService.toggleRegisterPopup(); 
  }
}