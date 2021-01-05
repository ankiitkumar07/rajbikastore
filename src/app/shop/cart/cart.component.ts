import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/shared/model/address.model';
import { Cart } from 'src/app/shared/model/cart.model';
import { OrderItem } from 'src/app/shared/model/order-item.model';
import { Order } from 'src/app/shared/model/order.model';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { User } from 'src/app/shared/model/user';
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
  user: User;
  uid: string
  loading: boolean = true;
  totalOrderPrice: number = 0

  constructor(
    private _firebaseService: FirebaseService,
    private router: Router,
  ) {
    this._firebaseService.getUser().subscribe(user => {
      if (user) {
        this.uid = user.uid
        this._firebaseService.getCartItems(user.uid).subscribe((items: Cart[]) => {
          this.cartItems = items;
          this.getTotalOrderPrice()
          this.loading = false;
        });
        this._firebaseService.getAddress(user.uid).subscribe((address: Address[]) => {
          this.address = address
          this.selectedAddress = this.address.find(x => x.isDefault === true)
        })
      } else {
        this.router.navigate(['auth/login']);
      }
    });
  }

  ngOnInit(): void {
  }

  updateCartItem(updatedCart: Cart) {
    this._firebaseService.updateCartItem(this.uid, updatedCart)
  }

  addNewAddress(){
    document.getElementById('closeModal').click()
    this.router.navigate(['/user/address'])
  }

  updateDeliveryAdderss(address: Address){
    this.selectedAddress = address
  }

  getTotalOrderPrice() {
    this.totalOrderPrice = 0
    for (let i = 0; i < this.cartItems.length; i++) {
      this.totalOrderPrice += this.cartItems[i].totalPrice
    }
  }

  onPlaceOrder(){
    let order = new Order()
    order.id = this.generateUID(16)
    order.uid = this.uid
    order.address = this.selectedAddress
    let items: OrderItem[] = []
    for(let i = 0; i < this.cartItems.length; i++){
      let item = new OrderItem()
      item.id = this.generateUID(16)
      item.productId = this.cartItems[i].productId
      item.productSku = this.cartItems[i].skuId
      item.status = 'ordered'
      item.expectedDelivery = 'someDeliveryDate'
      items.push(item)
    }
    order.items = items
    console.log(order)
  }

  generateUID(length: number) {
    let uid: string = ''
    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = char.length;
    for (var i = 0; i < length; i++) {
      uid += char.charAt(Math.floor(Math.random() * charactersLength));
    }
    return uid
  }


}
