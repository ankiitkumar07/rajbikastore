import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductSKU } from '../../model/product-sku.model';
import { Product } from '../../model/product.model';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-product-size-select',
  templateUrl: './product-size-select.component.html',
  styleUrls: ['./product-size-select.component.scss']
})
export class ProductSizeSelectComponent implements OnInit {

  sizes: any[] = []
  @Input() product: Product
  @Input() productSKUCollection: ProductSKU[]
  @Output() productPrice = new EventEmitter<number>()
  @Output() skuId = new EventEmitter<string>()
  constructor(
    private _firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._firebaseService.getProductSize().subscribe((size) => {
      this.sizes = size
    })
  }

  emitProductPrice(event) {
    let size = event.target.value
    let price = this.productSKUCollection.find(x => x.size === size).price
    this.productPrice.emit(price)
    this.router.navigate(['shop/product/' + this.product.id + '/' + this.productSKUCollection.find(x => x.size === event.target.value).id])
    this.skuId.emit(this.productSKUCollection.find(x => x.size === size).id)
  }

}
