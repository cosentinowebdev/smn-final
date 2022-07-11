import { TestBed } from '@angular/core/testing';

import { SissaInfoService } from './sissa-info.service';

describe('SissaInfoService', () => {
  let service: SissaInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SissaInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
