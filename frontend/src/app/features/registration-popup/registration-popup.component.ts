import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../service/popup.service';

@Component({
  selector: 'app-registration-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.css']
})
export class RegistrationPopupComponent {
  user = { name: '', email: '', password: '' };
  isLogin = true;

  constructor(public popupService: PopupService) {}

  openPopup() {
    this.popupService.openPopup();
  }

  closePopup() {
    this.popupService.closePopup();
  }

  onSubmit() {
    console.log('User registered:', this.user);
    this.closePopup();
  }
}
