import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
    constructor(
        private http: HttpClient,
    ) {}

    private loggedIn = new BehaviorSubject<boolean>(false);
    loggedIn$ = this.loggedIn.asObservable();

    baseUrl = "http://localhost:3000/";

    getUserByEmail(email: string){
        console.log("Getting user by email: ", email);
        return this.http.get(this.baseUrl + "api/users/email/" + email);
    }

    setLoggedIn(status: boolean) {
        this.loggedIn.next(status);
      }
}