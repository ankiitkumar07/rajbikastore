import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toArray } from 'rxjs/operators';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { Product } from 'src/app/shared/model/product.model';
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

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._firebaseService.getProductSKU(this.productItem.id).subscribe((sku: ProductSKU[]) => {
      this.sku = sku
      console.log(this.sku[1])
    })
  }

  addToCart(product: Product) {
    
  }
  viewItem(product: Product){
    this.router.navigate(['shop/product/' + product.id + '/' + this.sku[1]?.id])
  }

}
