import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.scss']
})
export class ShopFilterComponent implements OnInit {

  filters: any = ['All', 'Papad', 'Masale', 'Utilities' ]

  constructor() { }

  ngOnInit(): void {
  }

}
