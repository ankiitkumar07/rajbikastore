import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/shared/model/address.model';
import { Cart } from 'src/app/shared/model/cart.model';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Cart[] = [];
  address: Address[]
  selectedAddress: Address
  cart: Cart;
  loading: boolean = true;

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router,
  ) { 
    this._firebaseService.getUser().subscribe(user => {
      if(user){
        this._firebaseService.getCartItems(user.uid).subscribe((items: Cart[]) => {
          this.cartItems = items;
          this.loading = false;
        });
        this._firebaseService.getAddress(user.uid).subscribe((address: Address[]) => {
          this.address = address
          this.selectedAddress = this.address.find(x => x.isDefault === true)
        })
      }else{
        this.router.navigate(['auth/login']);
      }
    });
  }

  ngOnInit(): void {
  }


}
