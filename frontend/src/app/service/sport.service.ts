import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class SportService{
    constructor(
        private http: HttpClient
    )
    {}

    baseUrl = "http://localhost:3000/";

    getSports(){
        return this.http.get(this.baseUrl + "api/sports");
    }
}
