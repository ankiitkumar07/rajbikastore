import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: any[]
  products: Product[] = []

  constructor(
    private _firebaseService: FirebaseService
  ) { 
    this._firebaseService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories
    })
    this._firebaseService.getProducts().subscribe((products: Product[]) => {
      this.products = products
    })
  }

  ngOnInit(): void {
  }

}
