import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList: Product[] = [];

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._firebaseService.getProducts().subscribe((products: Product[]) => {
      this.productList = products
      console.log(this.productList)
    })
  }

}
