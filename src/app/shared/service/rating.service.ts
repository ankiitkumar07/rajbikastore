import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    private rating: number = 0
    rating$ = new BehaviorSubject<number>(0)

    setRating(rating: number) {
        this.rating$.next(rating)
    }

    constructor() {}
}