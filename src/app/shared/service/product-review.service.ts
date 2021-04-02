import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductReview } from '../model/product-review.model';
import GenerateId  from '../util/generate-id.util';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  private BASE_URL = "https://rajbika-store.firebaseio.com/"
  reviews$: Observable<ProductReview[]>
  reviewRef: AngularFireObject<ProductReview[]>

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) {
    this.reviewRef = this.db.object('product-reviews')
    this.reviews$ = this.reviewRef.valueChanges()
   }

  getUserDisplayName(uid: string): Observable<string> {
    return this.http.get<string>(this.BASE_URL + 'users/' + uid + '/displayName.json')
  }

  getProductReviews(productId: string): Observable<any> {
    return this.db.list('product-reviews/' + productId, ref => ref.orderByChild('createdAt')).valueChanges()
  }

  getAverageRating(reviews: ProductReview[]){
    
    let totalRating = 0
    reviews.map(review => totalRating += review.rating)
    console.log(totalRating / reviews.length)
    return (totalRating / reviews.length)
  }

  addProductReview(review: ProductReview) {
    return this.db.database.ref('product-reviews').child(review.productId).child(GenerateId.getUniqueId(8)).set(review)
  }
}