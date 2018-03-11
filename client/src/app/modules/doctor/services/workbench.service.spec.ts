import { TestBed, inject } from '@angular/core/testing';

import { WorkbenchService } from './workbench.service';

describe('WorkbenchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkbenchService]
    });
  });

  it('should be created', inject([WorkbenchService], (service: WorkbenchService) => {
    expect(service).toBeTruthy();
  }));
});
