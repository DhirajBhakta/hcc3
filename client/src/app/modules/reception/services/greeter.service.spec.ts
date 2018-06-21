import { TestBed, inject } from '@angular/core/testing';

import { GreeterService } from './loggeduser.service';

describe('GreeterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreeterService]
    });
  });

  it('should be created', inject([GreeterService], (service: GreeterService) => {
    expect(service).toBeTruthy();
  }));
});
