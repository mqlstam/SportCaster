import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../service/popup.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registration-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.css']
})
export class RegistrationPopupComponent {
  user = { userName: '', email: '', password: '' };
  isLogin = true;
  loggedInUser = { userName: '', email: '', password: '' };
  isLoggedIn = false;

  constructor(
    public popupService: PopupService,
    private userService: UserService
  ) {}

  openPopup() {
    this.popupService.openPopup();
  }

  closePopup() {
    this.popupService.closePopup();
  }

  onSubmit() {
    console.log('User registered:', this.user);

    if (this.isLogin) {
      this.userService.getUserByEmail(this.user.email).subscribe({
        next: (response : any) => {
          console.log('User found:', response);
          if (this.user.password === response.user.password) {
            this.loggedInUser = response.user;
            this.isLoggedIn = true;
            console.log('User logged in successfully:', this.loggedInUser);

            this.closePopup();
            alert('User logged in successfully');
            console.log('User logged in successfully');

          } else {
            alert('Invalid password');
            console.error('Invalid password');
          }
        },
        error: (error : any) => {
          alert('User not found');
          console.error('Error finding user:', error);
        },
      });

    } else{

      this.userService.createUser(this.user).subscribe({
        next: (response : any) => {
          console.log('User created successfully:', response);
        },
        error: (error : any) => {
          console.error('Error creating user:', error);
        },
      });
    }
  }

  isRegister(){
    console.log('Register');
    this.isLogin = false;
  }

  isLogin2(){
    console.log('Login');
    this.isLogin = true;
  }
}
