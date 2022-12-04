import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Item } from '../models/item';
import { User } from '../models/user';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  item:Item = new Item();
  name:string = "";
  description:string = "";
  price:string = "";
  image:string = "";
  category:string = "";
  
  user:User = new User();
  
  constructor(public auth: AuthService) {
    auth.isLogged();
    this.user = auth.connecteduser;
    console.log(this.user);
   }

  ngOnInit(): void {
    this.item = history.state.data;
    this.name = this.item.name;
    this.description = this.item.description;
    this.price = this.item.price;
    this.image = this.item.image;
    this.category = this.item.category;
  }

}
