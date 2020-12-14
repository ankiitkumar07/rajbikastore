import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
  category: any = ['Clothes', 'Footwear', 'Papad', 'Masale'];
  submitted: boolean = false;

  constructor(
    private _firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      size: ['', Validators.required],
      ppu: ['', Validators.required],
      category: ['', Validators.required],
      discount: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  get f() {
  	return this.productForm.controls;
  }

  submitProduct(){
  	this.product = new Product();
  	this.product = this.productForm.getRawValue();
  	this.product.id = this.getId(8);
  	this.product.metatitle = this.f.name.value;
  	this._firebaseService.saveProduct(this.product).then(res => {
      console.log('product saved');
      this.router.navigate(['/admin/products']);
  	});
  }

  getId(length: number): string{
    var result = '';
    var char =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = char.length;
      for ( var i = 0; i < length; i++ ) {
        result += char.charAt(Math.floor(Math.random() * charactersLength));
      }
    return result;
  }

}
