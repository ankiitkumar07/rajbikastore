import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { OrderComponent } from './order/order.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';



@NgModule({
  declarations: [
    AccountComponent, 
    ProfileComponent, 
    AddressComponent, 
    OrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserModule { }
