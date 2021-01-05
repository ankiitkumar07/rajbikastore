import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/shared/model/cart.model';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Cart
  @Output() updatedItem = new EventEmitter<Cart>()
  product: Product
  productSKU: ProductSKU
  productSKUCollection: ProductSKU[]

  constructor(
    private _firebaseService: FirebaseService
  ) {
  }
  
  ngOnInit(): void {
    this._firebaseService.getProduct(this.cartItem?.productId).subscribe((product: Product) => {
      this.product = product
    })
    this._firebaseService.getProductSKU(this.cartItem?.productId).subscribe((productSKU: ProductSKU[]) => {
      this.productSKUCollection = productSKU
      this.productSKU = this.productSKUCollection.find(x => x.id === this.cartItem?.skuId)
    })
  }

  updateItemPrice(event){
    this.cartItem.quantity = event.target.value
    this.cartItem.totalPrice = event.target.value * this.cartItem.ppu
    this.updatedItem.emit(this.cartItem)
  }

}
