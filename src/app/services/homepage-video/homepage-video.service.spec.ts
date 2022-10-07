import { TestBed } from '@angular/core/testing';

import { HomepageVideoService } from './homepage-video.service';

describe('HomepageVideoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomepageVideoService = TestBed.get(HomepageVideoService);
    expect(service).toBeTruthy();
  });
});
