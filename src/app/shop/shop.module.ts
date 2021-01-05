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
import { ProductSizeSelectComponent } from '../shared/component/product-size-select/product-size-select.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    CartComponent,
    ProductDetailComponent,
    ShopFilterComponent,
    ProductImageComponent,
    ProductSizeSelectComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    RouterModule
  ]
})
export class ShopModule { }
