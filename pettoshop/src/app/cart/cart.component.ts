import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { OrdersService } from "../orders.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orders:any;
  quantity: number = 0;
  id: string = "";
  formData: FormGroup;
  total:number = 0;

  constructor(public ordersService: OrdersService, private router: Router, fb: FormBuilder) {
    this.formData = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      quantity: new FormControl("1")
    });
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe(
      (orders: Array<Order>) => {
        this.orders = orders;
        for (let index = 0; index < this.orders.length; index++) {
          this.total = this.total + (orders[index].quantity * Number(orders[index].order_item[0].price));
        }
      }
    )
  }

  editOrder(data: any, id:any) {
    this.id = id;
    this.quantity = data.quantity;
    this.ordersService.updateOrder(this.id, this.quantity).subscribe({
      next: orderInfo => {
        alert("Order edited");
        if (orderInfo){
          this.router.navigate(['/home']);
        } 
      },
      error: error => {
        console.log("error", error)
        alert("Order could not be edited");
      }
    })
  } 

  deleteOrder(id:any){
    this.id = id;
    this.ordersService.deleteOrder(this.id).subscribe({
      next: orderInfo => {
        alert("Order deleted");
        if (orderInfo){
          this.router.navigate(['/home']);
        } 
      },
      error: error => {
        console.log("error", error)
        alert("Order could not be deleted");
      }
    })
  }
}
