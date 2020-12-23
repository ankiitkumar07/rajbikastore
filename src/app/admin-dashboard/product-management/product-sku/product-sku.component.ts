import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductSKU } from 'src/app/shared/model/product-sku.model';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product-sku',
  templateUrl: './product-sku.component.html',
  styleUrls: ['./product-sku.component.scss']
})
export class ProductSkuComponent implements OnInit {

  productSKUForm: FormGroup
  product: Product
  size: any[] = []
  formHidden: boolean = true
  productSKU: ProductSKU[] = []

  constructor(
    private _firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    let productId = this.route.snapshot.params.id
    this._firebaseService.getProduct(productId).subscribe((product: Product) => {
      this.product = product
    })
    this._firebaseService.getProductSKU(productId).subscribe((sku: ProductSKU[]) => {
      this.productSKU = sku
    })
    this._firebaseService.getProductSize().subscribe(sizes => {
      this.size = sizes
      console.log(this.size)
    })
    this.productSKUForm = this.formBuilder.group({
      size: ['', Validators.required],
      color: ['', Validators.required],
      dimensions: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  get f(){
    return this.productSKUForm.controls
  }

  onAddSKU(){
    this.formHidden = false
  }

  addSKU(){
    let prodId = this.product.id
    let sku = new ProductSKU()
    sku.size = this.f.size.value
    console.log(sku.size)
    sku.color = this.f.color.value
    sku.dimensions = this.f.dimensions.value
    sku.price = this.f.price.value
    sku.quantity = this.f.quantity.value
    sku.id = prodId+"-"+sku.size.substring(0,1)+sku.color.substring(0,1)+sku.dimensions.substring(0,1)
    this._firebaseService.addProductSKU(prodId, sku.id, sku)
  }

}
