import { TestBed, inject } from '@angular/core/testing';

import { LabtechService } from './labtech.service';

describe('LabtechService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabtechService]
    });
  });

  it('should be created', inject([LabtechService], (service: LabtechService) => {
    expect(service).toBeTruthy();
  }));
});
