import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../models/item';
import { ItemsService } from "../items.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  items: any;

  constructor(public itemsService: ItemsService, private router: Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemsService.getItems().subscribe(
      (items: Array<Item>) => {
        this.items = items;
      }
    )
  }

  itemDetails(item: Item) {
    //if (item) this.router.navigate(['/item_details/:'+ item.name], item);
  }

}
