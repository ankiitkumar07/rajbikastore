import { TestBed } from '@angular/core/testing';

import { CashfreeInterceptorService } from './cashfree-interceptor.service';

describe('CashfreeInterceptorService', () => {
  let service: CashfreeInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashfreeInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
