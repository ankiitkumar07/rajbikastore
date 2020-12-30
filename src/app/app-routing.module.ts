import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin-dashboard/dashboard/dashboard.component';
import { ProductManagementComponent } from './admin-dashboard/product-management/product-management.component';
import { AccountComponent } from './user/account/account.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './layout/home/home.component';
import { AddressComponent } from './user/address/address.component';
import { OrderComponent } from './user/order/order.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';
import { ProductShowComponent } from './admin-dashboard/product-management/product-show/product-show.component';
import { ProductAddComponent } from './admin-dashboard/product-management/product-add/product-add.component';
import { ProductComponent } from './shop/product/product.component';
import { ProductDetailComponent } from './shop/product/product-detail/product-detail.component';
import { Cart } from './shared/model/cart.model';
import { CartComponent } from './shop/cart/cart.component';
import { ProductSkuComponent } from './admin-dashboard/product-management/product-sku/product-sku.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: 'products',
        component: ProductManagementComponent,
        children: [
          {
            path: 'add',
            component: ProductAddComponent
          },
          {
            path: 'show/:id',
            component: ProductShowComponent
          },
          {
            path: 'edit/:id',
            component: ProductSkuComponent
          }
        ]
      },
      {
        path: 'users',
        component: UserManagementComponent
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'user',
    component: AccountComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'address',
        component: AddressComponent
      },
      {
        path: 'orders',
        component: OrderComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  },
  {
    path: 'shop',
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: 'product/:productId',
        component: ProductDetailComponent
      },
      {
        path: 'product/:productId/:productSkuId',
        component: ProductDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
