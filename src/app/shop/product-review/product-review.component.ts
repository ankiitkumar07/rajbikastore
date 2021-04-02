import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductReview } from 'src/app/shared/model/product-review.model';
import { User } from 'src/app/shared/model/user';
import { AlertService } from 'src/app/shared/service/alert.service';
import { FirebaseService } from 'src/app/shared/service/firebase.service';
import { ProductReviewService } from 'src/app/shared/service/product-review.service';
import { RatingService } from 'src/app/shared/service/rating.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit, OnDestroy {

  reviewSubs: Subscription
  star$: Observable<number>
  productId: string
  star: number
  uid: string
  user: User
  reviewBody: FormControl
  productReviews: ProductReview[]
  testReviews: ProductReview[] = [
    new ProductReview("abc", "abcd", "userName", "userEmail", "some obdy", 4),
    new ProductReview("def", "defg", "anotherUserName", "anotherUserEmail", "Some other body", 3)
  ]

  constructor(
    private _firebaseService: FirebaseService,
    private reviewService: ProductReviewService,
    private ratingSerivce: RatingService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.reviewBody = new FormControl('', Validators.required)
    this._firebaseService.getUser().subscribe(user => {
      if(user){
        this.uid = user.uid
        this._firebaseService.getUserDetails(this.uid).subscribe((user: User) => {
          this.user = user
        })
      }
    })
    console.log(this.testReviews)
    this.reviewSubs = this.reviewService.getUserDisplayName("6jZ9XFcBhdh73Q0lRUrCiozEGkw2").subscribe((name: string) => {
      console.log(name)
    })
    this.route.params.subscribe(params => {
      this.productId = params.productId
    })
    this.reviewService.getProductReviews(this.productId).subscribe((reviews: ProductReview[]) => {
      this.productReviews = reviews
      console.log(this.productReviews)
    })
    this.ratingSerivce.rating$.subscribe(star => {
      this.star = star
    })
  }

  get f() {
    return this.reviewBody.value();
  }

  submitReview(){
    if(this.validated()){
      let review = new ProductReview(this.productId, this.uid, this.user.displayName, this.user.email, this.reviewBody.value, this.star)
      this.reviewService.addProductReview(review).then(
        _ => {
          this.ratingSerivce.setRating(0)
          this.reviewBody.setValue('')
        }
      ).then(
          _ => this.alertService.create('success', "Thanks! your review has been submitted.")
      ).catch(
        err => this.alertService.create('danger', err)
      )
    }else{
      this.alertService.create('warning', "Please fill out all details!")
    }
  }

  getUsername(uid: string){
    return 
  }
  
  validated(): boolean {
    if(this.reviewBody.value.trim() != "" && this.star > 0){
      return true
    }
    return false
  }

  ngOnDestroy(): void {
    this.reviewSubs.unsubscribe()
    this.ratingSerivce.rating$.unsubscribe()
  }
}
