import { TestBed } from '@angular/core/testing';

import { LawAmendmentService } from './law-amendment.service';

describe('LawCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LawAmendmentService = TestBed.get(LawAmendmentService);
    expect(service).toBeTruthy();
  });
});