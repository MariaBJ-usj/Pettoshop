import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrdersService } from '../orders.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  quantity:number = 0;
  user:User = new User();
  formData: FormGroup;
  
  constructor(public orders: OrdersService,public auth: AuthService, private router: Router, fb: FormBuilder) {
    auth.isLogged();
    this.user = auth.connecteduser;
    this.formData = fb.group({
      title: fb.control('initial value', Validators.required)
    });
   }

  ngOnInit(): void {
    this.item = history.state.data;
    this.name = this.item.name;
    this.description = this.item.description;
    this.price = this.item.price;
    this.image = this.item.image;
    this.category = this.item.category;
    this.formData = new FormGroup({
      quantity: new FormControl(1)
    });
  }

  createOrder(data:any){
    this.quantity = data.quantity;
    this.orders.addOrder(this.item._id, this.quantity).subscribe({
      next: orderInfo => {
        if (orderInfo) this.router.navigate(['/cart']);
      },
      error: error => {
        console.log("error", error)
        alert("Item not added to cart");
      }
    });
  }

}