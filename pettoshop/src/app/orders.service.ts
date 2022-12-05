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

  addOrder(item_id:any, quantity:any):Observable<any>{
    return this.http.post("http://localhost:3000/addorder", 
    {user_id: this.authService.connecteduser._id, item_id:item_id, quantity:quantity});
  }

  updateOrder(id:any, quantity:any):Observable<any>{
    alert(id);
    return this.http.put("http://localhost:3000/updateorder", 
    {_id: id, quantity: quantity});
  }

}
