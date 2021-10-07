import { TestBed } from '@angular/core/testing';

import { CacheManagementService } from './cache-management.service';

describe('CacheManagementService', () => {
  let service: CacheManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
