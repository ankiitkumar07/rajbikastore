import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ShopFilterComponent } from '../shared/component/shop-filter/shop-filter.component';
import { UserModule } from '../user/user.module';
import { ProductImageComponent } from './product/product-detail/product-image/product-image.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    CartComponent,
    ProductDetailComponent,
    ShopFilterComponent,
    ProductImageComponent,
  
  ],
  imports: [
    CommonModule,
    UserModule,
    RouterModule
  ]
})
export class ShopModule { }
