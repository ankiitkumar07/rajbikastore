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

    constructor(
        id: string, productId: string,
        skuId: string,
        ppu: number,
        quantity: number,
        totalPrice: number,
        discount: number
    ){
        this.id = id
        this.productId = productId
        this.skuId = skuId
        this.ppu = ppu
        this.totalPrice = totalPrice
        this.discount = discount
        this.quantity = quantity
    }
}
