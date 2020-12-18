import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {

  @Input() productId: string;
  productImages: string[] = [];

  constructor(
    private _firebaseService: FirebaseService
  ) { 
    // console.log(this.productId);


    //   this._firebaseService.getProductImages(this.productId).subscribe((images: string[]) => {
    //     this.productImages = images;
    //     console.log(this.productImages);
    // })
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['productId']){
      console.log(this.productId);
      this._firebaseService.getProductImages(this.productId).subscribe((images: string[]) => {
        this.productImages = images;
        console.log(this.productImages);
      })
    }
  }

  enlargeImage(url: string){
    var imageHoder = document.getElementById('imageHolder') as HTMLImageElement;
    console.log(imageHoder);
    imageHoder.src = url;
  }



}
