import { TestBed } from '@angular/core/testing';

import { UserGroupsService } from './user-groups.service';

describe('UserGroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGroupsService = TestBed.get(UserGroupsService);
    expect(service).toBeTruthy();
  });
});
