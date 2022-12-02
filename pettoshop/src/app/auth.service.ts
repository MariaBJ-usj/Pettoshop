import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectedUser:any = null;

  constructor(private http: HttpClient) { }

  login(username: any, password: any):Observable<any>{
    return this.http.post("http://localhost:3000/login", {username:username, password:password}, {withCredentials: true})
  }
}
