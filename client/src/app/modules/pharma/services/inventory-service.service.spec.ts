import { TestBed, inject } from '@angular/core/testing';

import { InventoryServiceService } from './inventory-service.service';

describe('InventoryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryServiceService]
    });
  });

  it('should be created', inject([InventoryServiceService], (service: InventoryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
