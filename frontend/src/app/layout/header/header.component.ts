import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../service/popup.service';
import { LoginService } from '../../service/login.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  @Output() onCircleClick = new EventEmitter<void>();

  constructor(private popupService: PopupService,
    private loginService: LoginService
  ) {}

  isDropdownOpen = false;
  isLoggedIn = false;

  ngOnInit(): void {
    const cookieValue = this.getCookie('loggedInUser');
    if (cookieValue){
      console.log("already logged in");
      this.loginService.setLoggedIn(true);
    }

    this.loginService.loggedIn$.subscribe((loggedIn) => {
      console.log('Logged in:', loggedIn);
      this.isLoggedIn = loggedIn;
    });
  }

  openPopup() {
    this.isDropdownOpen = false;
    this.popupService.toggleRegisterPopup(); 
  }

  openAccount(){
    if (this.isLoggedIn) {
      this.isDropdownOpen = true;
    } else {
      this.openPopup();
    }
  }


  logOut() {
    document.cookie = 'loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    console.log('User logged out, cookie deleted.');
    alert('You have been logged out.');
    this.loginService.setLoggedIn(false);
    this.isDropdownOpen= false;
    this.popupService.closeRegisterPopup();
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(';').shift() || null : null;
  }
}
