import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentService } from '../service/payment.service';

@Injectable()
export class CashfreeInterceptor implements HttpInterceptor {

  newRequst: any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    if(request instanceof PaymentService){
      const userToken = 'secret key'
      this.newRequst = request.clone({
        headers: request.headers.set(
          'Authorization', `Bearer ${userToken}`
        )
      })
    }
    return next.handle(this.newRequst)
  }
}
