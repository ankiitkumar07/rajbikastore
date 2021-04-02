import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RatingService } from '../../service/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, AfterContentInit {

  stars = [1, 2, 3, 4, 5]
  selectedStar: number = 0
  hoveredStar: number  = 0

  constructor(private ratingSerivce: RatingService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.ratingSerivce.rating$.subscribe(star => {
      this.selectedStar = star
    })
  }

  selectRating(star: number) {
    this.selectedStar = star
    this.ratingSerivce.setRating(this.selectedStar)
  }

  hovered(star: number){
    this.hoveredStar = star
  }

}
