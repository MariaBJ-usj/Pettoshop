import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  name: string = "";
  description: string = "";
  price: string = "";

  orders:Array <any> = new Array <any>();

  constructor(private http: HttpClient, public authService: AuthService) { }

  getOrders():Observable<any>{
    return this.http.post("http://localhost:3000/orders", {user_id: this.authService.connecteduser._id});
  }

}
