import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss']
})
export class ShopFilterComponent implements OnInit {

  filters: any = ['All', 'Papad', 'Masale', 'Utilities' ]
  categories: any[] = [];

  constructor(
    private _firebaseService: FirebaseService
  ) { 
    this._firebaseService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories
      console.log(this.categories);
    })
  }

  ngOnInit(): void {
  }

  toggleList(event){
    var parentUl = event.target;

    if(parentUl.classList.contains('main')){
      console.log("main clicked")
    }else{
      console.log("sub clicked")
    }
  }


}
