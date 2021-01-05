import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList: Product[] = [];
  allProducts: Product[] = []
  paramsObj : any

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if(params){
        this.paramsObj = { ...params.keys, ...params }
        console.log(this.paramsObj)  
      }
    })
    if(this.paramsObj.params.category){
      this._firebaseService.getProducts().subscribe((products: Product[]) => {
        this.productList = products.filter(x => x.category === this.paramsObj.params.category)
      })
    }else{
      this._firebaseService.getProducts().subscribe((products: Product[]) => {
        this.productList = products
      })
    }
  }

}
