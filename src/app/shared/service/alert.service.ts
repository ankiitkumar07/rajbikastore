import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../interface/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

    alertSettings$ = new Subject<Alert>()

    constructor(

    ){ }

    create(type: string, msg: string){
        this.alertSettings$.next({type, msg})
    }
}
