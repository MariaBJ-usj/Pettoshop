import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { OrdersService } from "../orders.service";
import { ItemsService } from "../items.service";
import { Item } from '../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orders:any;
  toggleButton: boolean = true;

  constructor(public ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe(
      (orders: Array<Order>) => {
        this.orders = orders;
        console.log(this.orders);
      }
    )
  }

toggle() {
  if(this.toggleButton == true) {
    this.toggleButton = false;
  }
  else {
    this.toggleButton = true;
  }
}
}
