import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../service/popup.service';
import { UserService } from '../../service/user.service';
import { RcmdService } from '../../service/rcmd.service'; 

@Component({
  selector: 'app-registration-popup',
  imports: [FormsModule, CommonModule],
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.css']
})
export class RegistrationPopupComponent implements OnInit {
  user = { userName: '', email: '', password: '' };
  isLogin = true;
  loggedInUser: any = { userName: '', email: '', location: { city: '' }, preferences: {}, equipment: [] };
  alreadyLoggedIn = false;
  editMode = false;

  // Nieuwe property voor equipment
  availableEquipment: string[] = [];

  constructor(
    public popupService: PopupService,
    private userService: UserService,
    private rcmdService: RcmdService // Injecteer de RcmdService
  ) {}

  ngOnInit() {
    console.log('Cookie:', document.cookie);
    

    const cookieValue = this.getCookie('loggedInUser');
    if (cookieValue){
      console.log("already logged in");
      this.alreadyLoggedIn = true;
      this.loggedInUser = JSON.parse(cookieValue);

      this.userService.getUserById(this.loggedInUser._id).subscribe({
        next: (response: any) => {
          this.loggedInUser = response.user;
          console.log('User found:', this.loggedInUser);
        },
        error: (error) => {
          console.error('Error finding user:', error);
        },
      });
    }

    // Haal de equipment lijst op
    this.rcmdService.fetchEquipment();
    this.rcmdService.availableEquipment$.subscribe((equipmentList) => {
      this.availableEquipment = equipmentList;
    });
  }

  openPopup() {
    this.popupService.toggleRegisterPopup();
  }

  closePopup() {
    this.popupService.closeRegisterPopup();
  }

  enableEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.popupService.closeLoginPopup();
  }

  saveChanges() {
    // Ensure the nested properties are updated
    const updatedUser = {
      ...this.loggedInUser,  // Spread the current data
      location: {
        ...this.loggedInUser.location // Make sure location is updated correctly
      },
      preferences: {
        ...this.loggedInUser.preferences // Ensure preferences are updated
      },
    };
  
    // Send updated data to the backend
    this.userService.updateUser(updatedUser).subscribe({
      next: (response: any) => {
        console.log('User updated:', response);
  
        // After a successful update, save the updated user data in a cookie
        document.cookie = `loggedInUser=${JSON.stringify(updatedUser)}; path=/;`;
  
        // Update the local logged-in user
        this.loggedInUser = updatedUser;
        
        // Set edit mode to false, as the changes are saved
        this.editMode = false;    
        this.popupService.closeRegisterPopup();

        alert('User updated successfully');
      
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }

  onSubmit() {
    console.log('User registered:', this.user);

    if (this.isLogin) {
      this.userService.getUserByEmail(this.user.email).subscribe({
        next: (response: any) => {
          console.log('User found:', response);
          if (this.user.password === response.user.password) {
            this.loggedInUser = response.user;
        
            document.cookie = `loggedInUser=${JSON.stringify(this.loggedInUser)}; path=/;`;
            console.log('User logged in successfully:', this.loggedInUser);

            this.alreadyLoggedIn = true;
            this.closePopup();
          } else {
            alert('Invalid password');
          }
        },
        error: (error) => {
          alert('User not found');
        },
      });

    } else {
      this.userService.createUser(this.user).subscribe({
        next: (response: any) => {
          console.log('User created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating user:', error);
        },
      });
    }
  }

  logOut() {
    document.cookie = 'loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    console.log('User logged out, cookie deleted.');

    this.loggedInUser = { userName: '', email: '', location: { city: '' }, preferences: {}, equipment: [] };
    this.alreadyLoggedIn = false;
    this.closePopup();
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(';').shift() || null : null;
  }

  isRegister() {
    this.isLogin = false;
  }

  isLogin2() {
    this.isLogin = true;
  }

  selectedEquipment: string = '';

  addEquipment() {
    if (this.selectedEquipment && !this.loggedInUser.equipment.some((e: { item: string; }) => e.item === this.selectedEquipment)) {
        this.loggedInUser.equipment.push({ item: this.selectedEquipment });
        this.selectedEquipment = ""; 
    }
}

  removeEquipment(item: string) {
    this.loggedInUser.equipment = this.loggedInUser.equipment.filter((equip: { item: string }) => equip.item !== item);
  }
}