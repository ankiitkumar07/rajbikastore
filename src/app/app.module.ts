import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './admin-dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';

import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
// import { ShopFilterComponent } from './shared/component/shop-filter/shop-filter.component';

// Firebase Module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    // ShopFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    UserModule,
    AuthModule,
    ShopModule,

    // Firebase Modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
