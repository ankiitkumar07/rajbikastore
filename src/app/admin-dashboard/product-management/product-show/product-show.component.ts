import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss']
})
export class ProductShowComponent implements OnInit {

  product: Product;
  productUpdate: FormGroup;
  size: any[] = [];
  images: string[] = [];
  category: any = ['Clothes', 'Footwear', 'Papad', 'Masale'];

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  downloadUrl: string;



  constructor(
    private _firebaseService: FirebaseService,
    private afStorage: AngularFireStorage,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      let id = x.get('id');
      this._firebaseService.getProduct(id).subscribe((product: Product) => {
        this.product = product
        console.log(this.product);
      });
    });

    this.productUpdate = this.formBuilder.group({
      name: [this.product?.name, Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      size: ['', Validators.required],
      ppu: ['', Validators.required],
      category: ['', Validators.required],
      discount: ['', Validators.required],
      file: ['', Validators.required]
    })

    this._firebaseService.getProductSize().subscribe(sizes => {
      this.size = sizes
      console.log(this.size)
    })
  }

  get f() {
    return this.productUpdate.controls;
  }

  addProductPhotos() {
    console.log(this.productUpdate.controls.file.value)
    console.log(this.images)

    this._firebaseService.addProductImages(this.images, this.product.id)
  }

  onFileAdd(event) {
    this.toggleButtonDisable(event);
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          const id = Math.random().toString(36).substring(2);
          this.ref = this.afStorage.ref(this.product.id + "/" + id + ".jpg");
          this.task = this.afStorage.upload(this.product.id + "/" + id, event.target.result);
          this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
          this.uploadProgress = this.task.percentageChanges();
          this.downloadURL = this.ref.getDownloadURL();

          

          this.productUpdate.controls.file.patchValue({
            fileSource: this.images
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  updateProduct(event) {
    let value = event.target
    let input = value.parentNode.parentNode.parentNode.firstChild
    // console.log(value.parentNode.parentNode.parentNode.firstChild.value)
    // console.log(value.parentNode.parentNode.parentNode.firstChild.attributes.name)
    this._firebaseService.updateProduct(this.product.id, input.attributes.name.value, input.value)
  }

  toggleButtonDisable(event) {
    let input = event.target;
    input.nextSibling.childNodes[0].disabled = false;
  }

}
