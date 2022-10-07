import { TestBed } from '@angular/core/testing';

import { UserCategoryService } from './user-category.service';

describe('UserCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCategoryService = TestBed.get(UserCategoryService);
    expect(service).toBeTruthy();
  });
});
