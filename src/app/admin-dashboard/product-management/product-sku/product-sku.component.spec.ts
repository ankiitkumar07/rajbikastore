import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSkuComponent } from './product-sku.component';

describe('ProductSkuComponent', () => {
  let component: ProductSkuComponent;
  let fixture: ComponentFixture<ProductSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
