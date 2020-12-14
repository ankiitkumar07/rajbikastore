import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private _firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  addToChart(product: Product) {
    
  }

}
