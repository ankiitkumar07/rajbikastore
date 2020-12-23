import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/component/sidebar/sidebar.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductItemComponent } from './product-management/product-item/product-item.component';
import { ProductShowComponent } from './product-management/product-show/product-show.component';
import { ProductAddComponent } from './product-management/product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSkuComponent } from './product-management/product-sku/product-sku.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProductManagementComponent,
    SidebarComponent,
    UserManagementComponent,
    ProductItemComponent,
    ProductShowComponent,
    ProductAddComponent,
    ProductSkuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class DashboardModule { }
