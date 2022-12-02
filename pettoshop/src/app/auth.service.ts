import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectedUser:any = null;

  constructor(private http: HttpClient) { }

  login(email: any, password: any):Observable<any>{
    return this.http.post("http://localhost:3000/login", {email:email, password:password}, {withCredentials: true})
  }
}
