import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order.model';
import { Transaction } from '../model/transaction.model';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    transaction$ = new Subject<Transaction>()
    firebaseUrl: string = ""
    currentOrder = new Map<string, any>()

    cashfreeTestUrl = "https://test.cashfree.com/billpay/checkout/post/submit"

    constructor(
        private http: HttpClient,
        
    ){ }

    create(transaction: Transaction){
        this.transaction$.next(transaction)
    }

    initiatePayment(order: Order, user: User){
        console.log(environment.cashfree.appId + " and " + environment.cashfree.secretKey)
        this.currentOrder.set('appId', environment.cashfree.appId)
        this.currentOrder.set('orderId', order.id)
        this.currentOrder.set('orderAmount', order.orderAmount)
        this.currentOrder.set('orderCurrency', order.orderCurrency)
        this.currentOrder.set('orderNote', order.orderNote)
        this.currentOrder.set('customerName', user.displayName)
        this.currentOrder.set('customerEmail', user.email)
        this.currentOrder.set('customerPhone', order.address.phoneNumber)
        this.currentOrder.set('returnUrl', 'https://rajbikastore.herokuapp.com/user/cart')
        this.currentOrder.set('notifyUrl', 'https://rajbikastore.herokuapp.com/user/cart')
        var data = ''
        let postOrder = {};
        this.currentOrder.forEach((key, value) => {
            data = data + value + key
            postOrder[value] = key
        });
        // this.currentOrder.set('signature', )
        postOrder['signature']=this.generateSecretKey(data)
        console.log(postOrder)
        console.log(data)
        this.createPayment(postOrder)
    }

    createPayment(order: any){
        // let header = new HttpHeaders({
        //     'access-control-request-headers': 'access-control-allow-origin,content-type',
        //     'access-control-request-method': 'POST',

        // })
        this.http.post(this.cashfreeTestUrl, order).subscribe(data => {
            console.log(data)
        },
        err => {
            console.log(err)
        })
    }

    generateSecretKey(data: string){
        // var hash = sha256.hmac(environment.cashfree.secretKey, data)
        var crypto =  require('crypto-js');
        var hash = crypto.HmacSHA256(data, environment.cashfree.secretKey)

        return hash.toString(crypto.enc.Base64)

    }




}
