import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
    constructor(
        private http: HttpClient,
    ) {}

    baseUrl = "http://localhost:3000/";

    getUserByEmail(email: string){
        console.log("Getting user by email: ", email);
        return this.http.get(this.baseUrl + "api/users/email/" + email);
    }
}