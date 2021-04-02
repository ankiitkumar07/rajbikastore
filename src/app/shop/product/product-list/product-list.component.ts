import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toArray } from 'rxjs/operators';
import { Cart } from 'src/app/shared/model/cart.model';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { Product } from 'src/app/shared/model/product.model';
import { AlertService } from 'src/app/shared/service/alert.service';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() productItem: Product;
  sku: ProductSKU[] = []
  uid: string;

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this._firebaseService.getProductSKU(this.productItem.id).subscribe((sku: ProductSKU[]) => {
      this.sku = sku
    })
    this._firebaseService.getUser().subscribe( user => {
      if(user){
        this.uid = user.uid
      }
    }
    )
  }

  addToCart(product: Product, sku: ProductSKU[], quantity: any) {
    if(this.uid != null){
      let q = quantity.value
      // console.log(product.name + ", " + sku[0].size + ", " + q )
      let totalPrice = sku[0].price * q
      let cartItem: Cart = new Cart(sku[0].id, product.id, sku[0].id, sku[0].price, q, totalPrice, 0)
      this._firebaseService.addToCart(this.uid, cartItem).then(res => {
        this.alertService.create("success", "Product added successfully!")
      },
      error => {
        this.alertService.create("error", "Some error occurred!")
      })
    }
    else{
      this.alertService.create('warning', "Please login to add item to your cart!")
    }

  }
  viewItem(product: Product){
    this.router.navigate(['shop/product/' + product.id + '/' + this.sku[1]?.id])
  }

}
