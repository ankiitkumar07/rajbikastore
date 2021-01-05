import { ProductSKU } from "./product-sku.model";
import { Product } from "./product.model";

export class Cart {
    id: string
    productId: string
    skuId: string
    ppu: number
    quantity: number
    totalPrice: number
    discount: number
}
