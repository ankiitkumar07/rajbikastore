import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { Subject } from 'rxjs';
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
        private http: HttpClient
    ){ }

    create(transaction: Transaction){
        this.transaction$.next(transaction)
    }

    initiatePayment(order: Order, user: User){
        this.currentOrder.set('appId', 'alskdjf')
        this.currentOrder.set('orderId', order.id)
        this.currentOrder.set('orderAmount', order.orderAmount)
        this.currentOrder.set('orderCurrency', order.orderCurrency)
        this.currentOrder.set('orderNote', order.orderNote)
        this.currentOrder.set('customerName', user.displayName)
        this.currentOrder.set('customerEmail', user.email)
        this.currentOrder.set('customerPhone', order.address.phoneNumber)
        this.currentOrder.set('returnUrl', 'returnUrl')
        this.currentOrder.set('notifyUrl', 'notifyUrl')
        var data = ''
        let postOrder = {};
        this.currentOrder.forEach((key, value) => {
            data = data + key + value
            postOrder[value] = key
        });
        this.currentOrder.set('signature', this.generateSecretKey(data))
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
        return sha256(data)
    }




}
