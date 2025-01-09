import { TestBed } from '@angular/core/testing';

import { AlmacenStorageServiceService } from './almacen-storage-service.service';

describe('AlmacenStorageServiceService', () => {
  let service: AlmacenStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
