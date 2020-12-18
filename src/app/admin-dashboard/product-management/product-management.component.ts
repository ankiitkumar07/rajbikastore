import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  productList: Product[] = [];

  constructor(private _firebase: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this._firebase.getProducts().subscribe((products: Product[]) => {
      console.log(products);
      this.productList = products;
    });
  }


}
