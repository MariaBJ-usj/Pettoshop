import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  name: string = "";
  description: string = "";
  price: string = "";

  items:Array <any> = new Array <any>();

  constructor(private http: HttpClient) { }

  getItems():Observable<any>{
    return this.http.get("http://localhost:3000/items");
  }

  getItem():Observable<any>{
    return this.http.get("http://localhost:3000/item/:id");
  }
}
