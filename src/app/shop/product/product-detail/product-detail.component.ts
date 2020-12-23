import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit { 

  product: Product;
  productPrice: number = 0.00;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {

    let productId = this.activatedRoute.snapshot.params.productId;
    this._firebaseService.getProduct(productId).subscribe((product: Product) => {
      this.product = product
      console.log(this.product)
    })
  }

  getPriceForSize(event){
    let size = event.target.value
    if(this.product){
      // this.productPrice = this.product.price.find(x => x === size)
      // console.log(this.product.price.find(size))
    }
  }

}
