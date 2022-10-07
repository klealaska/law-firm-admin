import { TestBed } from '@angular/core/testing';

import { LawCategoryService } from './law-category.service';

describe('LawCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LawCategoryService = TestBed.get(LawCategoryService);
    expect(service).toBeTruthy();
  });
});
