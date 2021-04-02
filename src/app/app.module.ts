import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ContactComponent } from './layout/contact/contact.component';
import { AboutComponent } from './layout/about/about.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { LoggerComponent } from './shared/component/logger/logger.component';
import { AlertComponent } from './shared/component/alert/alert.component';
import { AlertService } from './shared/service/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    NotFoundComponent,
    LoggerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
