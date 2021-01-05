import { Time } from "@angular/common"
import { ProductSKU } from "./product-sku.model"

export class OrderItem {
    id: string
    deliveryTime?: Time
    expectedDelivery?: string
    status: string
    productId: string
    productSku: string
}