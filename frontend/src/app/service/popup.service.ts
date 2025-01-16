import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private loginPopupSubject = new Subject<boolean>();
  loginPopup$ = this.loginPopupSubject.asObservable();

  toggleLoginPopup() {
    this.loginPopupSubject.next(true);
  }

  closeLoginPopup() {
    this.loginPopupSubject.next(false);
  }
}