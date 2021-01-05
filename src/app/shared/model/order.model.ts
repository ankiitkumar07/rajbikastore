import { Time } from "@angular/common"
import { Address } from "./address.model"
import { OrderItem } from "./order-item.model"

export class Order {
    id: string
    uid: string
    orderTime?: Time
    address: Address
    items: OrderItem[]  
}