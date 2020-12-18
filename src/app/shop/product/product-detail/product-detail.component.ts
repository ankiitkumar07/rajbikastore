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

  constructor(
    private activatedRoute: ActivatedRoute,
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {

    let productId = this.activatedRoute.snapshot.params.productId;
    this._firebaseService.getProduct(productId).subscribe((product: Product) => {
      this.product = product
    })
  }

}
