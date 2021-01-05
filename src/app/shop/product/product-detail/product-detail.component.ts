import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/shared/model/cart.model';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { Product } from 'src/app/shared/model/product.model';
import { User } from 'src/app/shared/model/user';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit { 

  product: Product
  prodSKUCollection: ProductSKU[]
  prodSKU: ProductSKU
  productPrice: number = 0.00
  cartItems: Cart[]
  user: User
  userId: string
  productSkuId: string
  itemAdded: string = "Add To Cart"

  constructor(
    private activatedRoute: ActivatedRoute,
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {

    let productId = this.activatedRoute.snapshot.params.productId
    this.productSkuId = this.activatedRoute.snapshot.params.productSkuId

    this._firebaseService.getUser().subscribe((user) => {
      if(user){
        this.userId = user.uid
        this._firebaseService.getUserDetails(user.uid).subscribe((user: User) => {
          this.user = user
          this.isProductAdded(this.productSkuId)
        })
        this._firebaseService.getCartItems(this.userId).subscribe((cartItems: Cart[]) => {
          this.cartItems = cartItems
        })
      }
    })
    this._firebaseService.getProduct(productId).subscribe((product: Product) => {
      this.product = product
    })
    
    this._firebaseService.getProductSKU(productId).subscribe((sku: ProductSKU[]) => {
      this.prodSKUCollection = sku
    })
  }

  getPriceForSize(productPrice: number){
    this.productPrice = productPrice
  }

  onAddCart(){
    let cart = new Cart()
    cart.id = this.productSkuId
    let sku = this.prodSKUCollection.find(x => x.id === this.productSkuId)
    cart.productId = this.product.id
    cart.skuId = sku.id
    cart.quantity = 1
    cart.ppu = sku.price
    cart.totalPrice = cart.quantity * cart.ppu
    this._firebaseService.addToCart(this.userId, cart).then(this.isProductAdded)
  }

  isProductAdded(skuId: string){
    if(this.cartItems?.find(x => x.skuId === skuId)) {
      this.itemAdded = "Go To Cart"
    }else{
      this.itemAdded = "Add To Cart"
    }
  }

}
