import { Address } from "./address.model"
import { OrderItem } from "./order-item.model"

export class Order {
    id: string
    uid: string
    orderAmount: number
    orderCurrency: string
    orderNote: string
    orderTime?: number
    address: Address
    items: OrderItem[]  
}