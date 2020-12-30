import { ProductSKU } from "./product-sku.model";
import { Product } from "./product.model";

export class Cart {
    id: string
    productSKU: ProductSKU
    quantity: number  
}
