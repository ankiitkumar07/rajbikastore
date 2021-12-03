import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginWithPhoneComponent } from './components/login-with-phone/login-with-phone.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginWithPhoneComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
