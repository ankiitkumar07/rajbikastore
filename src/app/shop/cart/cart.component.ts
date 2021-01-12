import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { Address } from 'src/app/shared/model/address.model';
import { Cart } from 'src/app/shared/model/cart.model';
import { OrderItem } from 'src/app/shared/model/order-item.model';
import { Order } from 'src/app/shared/model/order.model';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { User } from 'src/app/shared/model/user';
import { AlertService } from 'src/app/shared/service/alert.service';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { environment } from 'src/environments/environment'

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
    private paymentService: PaymentService,
    private router: Router,
    private alertService: AlertService
  ) {
    this._firebaseService.getUser().subscribe(user => {
      if (user) {
        this.uid = user.uid
        this._firebaseService.getUserDetails(this.uid).subscribe((user: User) => {
          this.user = user
        })
        this._firebaseService.getCartItems(user.uid).subscribe((items: Cart[]) => {
          this.cartItems = items;
          this.getTotalOrderPrice()
          this.loading = false;
          console.log(environment.cashfree.appId)
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

  deleteItem(cid: string){
    this._firebaseService.deleteCartItem(this.uid, cid).then(() => {
      this.alertService.create('success', 'Item removed successfully')
    }).catch(() => {
      this.alertService.create('danger', 'Some error occurred')
    })
  }

  onPlaceOrder(){
    let order = new Order()
    order.id = this.generateUID(16)
    order.uid = this.uid
    order.address = this.selectedAddress
    order.orderAmount = this.totalOrderPrice
    order.orderCurrency = 'INR'
    order.orderNote = ""
    order.orderTime = Date.now()
    let items: OrderItem[] = []
    for(let i = 0; i < this.cartItems.length; i++){
      let item = new OrderItem()
      item.id = this.generateUID(16)
      item.productId = this.cartItems[i].productId
      item.productSku = this.cartItems[i].skuId
      item.status = 'ordered'
      item.expectedDelivery = Date.now() + 2
      items.push(item)
    }
    order.items = items
    this.paymentService.initiatePayment(order, this.user)
    console.log(this.generateSecretKey(order))
  }

  generateSecretKey(order: Order){
    return sha256('appId'+ environment.cashfree.appId + 'orderId' + order.id + 'orderAmount' + order.orderAmount)
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
