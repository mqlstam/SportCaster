import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupStatus = new BehaviorSubject<boolean>(false);
  popupStatus$ = this.popupStatus.asObservable();

  openPopup() {
    this.popupStatus.next(true);
  }

  closePopup() {
    this.popupStatus.next(false);
  }
}
