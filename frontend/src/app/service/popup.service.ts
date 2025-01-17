import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private loginPopupSubject = new Subject<boolean>();
  loginPopup$ = this.loginPopupSubject.asObservable();
  private popupStatusSubject = new BehaviorSubject<boolean>(false);
  popupStatus$ = this.popupStatusSubject.asObservable();

  toggleLoginPopup() {
    this.loginPopupSubject.next(true);
  }

  closeLoginPopup() {
    this.loginPopupSubject.next(false);
  }

  toggleRegisterPopup() {
    this.popupStatusSubject.next(!this.popupStatusSubject.value);
  }

  closeRegisterPopup() {
    this.popupStatusSubject.next(false);
  }
}
