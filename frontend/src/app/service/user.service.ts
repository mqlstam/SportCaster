import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class UserService{
    constructor(
        private http: HttpClient
    )
    {}

    baseUrl = "http://localhost:3000/";

    getUserById(id : string){
        return this.http.get(this.baseUrl + "api/users/" + id);
    }

    getUserByEmail(email : string){
        return this.http.get(this.baseUrl + "api/users/email/" + email);
    }

    createUser(user : any){
        return this.http.post(this.baseUrl + "api/users", user);
    }
}
