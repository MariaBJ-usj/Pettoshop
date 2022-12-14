import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connecteduser:any;
  
  constructor(private http: HttpClient) {
    
   }

   isLogged() {
    this.http.get("http://localhost:3000/islogged",{withCredentials: true}).subscribe({
      next: connecteduser=> {
        this.connecteduser = connecteduser;
        console.log(this.connecteduser);
        console.log("connected")
      },
      error: error=> {
        console.log("not connected:" + error);
      }
    })
    
   }


  login(email: any, password: any):Observable<any>{
    return this.http.post("http://localhost:3000/login", {email:email, password:password}, {withCredentials: true});
  }

  logout():Observable<any>{
    return this.http.get("http://localhost:3000/logout", {withCredentials: true});
  }

  register(
    email: any, password: any, firstname: any, lastname: any, 
    address: any, postalcode: any, city: any, country: any, phone: any):Observable<any>{
    return this.http.post("http://localhost:3000/register", 
    {email:email, password:password, firstname:firstname, lastname:lastname, address:address, postalcode:postalcode, city:city, country:country, phone:phone}, 
    {withCredentials: true});
  }
}