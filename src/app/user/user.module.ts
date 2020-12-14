import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { OrderComponent } from './order/order.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoaderComponent } from '../shared/component/loader/loader.component';
import { AddressFormComponent } from './address/address-form/address-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent, 
    ProfileComponent, 
    AddressComponent, 
    OrderComponent,
    LoaderComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class UserModule { }
