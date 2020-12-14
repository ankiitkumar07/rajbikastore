import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/model/cart';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];
  cart: Cart;
  loading: boolean = true;

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router,
  ) { 
    this._firebaseService.getUser().subscribe(user => {
      if(user){
        this._firebaseService.getCartItems(user.uid).subscribe((items: Product[]) => {
          this.cartItems = items;
          this.loading = false;
        });
      }else{
        this.router.navigate(['auth/login']);
      }
    });
  }

  ngOnInit(): void {
  }

}
