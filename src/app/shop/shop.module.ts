import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ShopFilterComponent } from '../shared/component/shop-filter/shop-filter.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    CartComponent,
    ProductDetailComponent,
    ShopFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ShopModule { }
