import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSizeSelectComponent } from './product-size-select.component';

describe('ProductSizeSelectComponent', () => {
  let component: ProductSizeSelectComponent;
  let fixture: ComponentFixture<ProductSizeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSizeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSizeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
