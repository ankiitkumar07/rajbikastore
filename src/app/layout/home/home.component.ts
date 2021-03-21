import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/model/product.model';
import { FirebaseService } from 'src/app/shared/service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('scrollAnimationLeft', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0%) translateY(0%)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateX(-100%) translateY(-10%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
    trigger('scrollAnimationRight', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0%) translateY(0%)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateX(100%) translateY(-10%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
    trigger('scrollAnimationFade', [
      state('show', style({
        opacity: 1,
        transform: "translateY(0%)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateY(-10%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  categories: any[]
  products: Product[] = []
  state = 'hide'
  loading: boolean = true

  constructor(
    private _firebaseService: FirebaseService,
    public el: ElementRef
  ) { 
    this._firebaseService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories
    })
    this._firebaseService.getProducts().subscribe((products: Product[]) => {
      this.products = products
    })
  }

  ngOnInit(): void {
  }

  @HostListener('window:load', ['$event'])
  checkWindowLoad(){
    this.state = 'show'
    this.loading = false
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll(){
    var firstSection = document.getElementById("first-section");
    var head = document.getElementsByClassName("header-wrapper")[0] as HTMLElement;
    const headHeight = (head.offsetHeight + head.offsetTop) / 2;
    const secPosition = firstSection.offsetTop
    const scrollPosition = window.pageYOffset

    if(scrollPosition >= headHeight){
      this.state = 'hide'
    }else{
      this.state = 'show'
    }
  }

}
