import { TestBed, inject } from '@angular/core/testing';

import { TokenInjectorService } from './token-inyector.service';

describe('TokenInyectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInjectorService]
    });
  });

  it('should be created', inject([TokenInjectorService], (service: TokenInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
