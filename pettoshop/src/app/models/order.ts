import { Item } from "./item";

export class Order {
    id?: number | string;
    item_id?: number | string;
    user_id?: number | string;
    quantity: number = 0;
    order_item: Item = new Item;
}
