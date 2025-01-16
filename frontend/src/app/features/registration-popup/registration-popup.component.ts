import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../service/popup.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registration-popup',
  imports: [FormsModule, CommonModule],
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.css']
})
export class RegistrationPopupComponent implements OnInit {
  user = { userName: '', email: '', password: '' };
  isLogin = true;
  loggedInUser = { userName: '', email: '', password: '' };
  alreadyLoggedIn = false;

  constructor(
    public popupService: PopupService,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log('Cookie:', document.cookie);

    const cookieValue = this.getCookie('loggedInUser');
    if (cookieValue){
      console.log("already logged in");
      this.alreadyLoggedIn = true;
      const loggedInUser = JSON.parse(cookieValue);

      console.log(loggedInUser._id);

      this.userService.getUserById(loggedInUser._id).subscribe({
        next: (response : any) => {
          this.loggedInUser = response.user;
          console.log('User found:', this.loggedInUser);
        },
        error: (error : any) => {
          console.error('Error finding user:', error);
        },
      });

      
    }
  }

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
        
            document.cookie = `loggedInUser=${JSON.stringify(this.loggedInUser)}; path=/;`;
            console.log('User logged in successfully:', this.loggedInUser);

            this.alreadyLoggedIn = true;
            this.closePopup();

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

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  logOut(){
    document.cookie = 'loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    console.log('User logged out, cookie deleted.');

    // Reset the logged-in user state
    this.loggedInUser = { userName: '', email: '', password: '' };
    this.alreadyLoggedIn = false;

    // Optionally, you can close any popup or redirect the user to a login page
    this.closePopup();
  }
}
