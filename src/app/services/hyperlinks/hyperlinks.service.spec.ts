import { TestBed } from '@angular/core/testing';

import { HyperlinksService } from './hyperlinks.service';

describe('HyperlinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HyperlinksService = TestBed.get(HyperlinksService);
    expect(service).toBeTruthy();
  });
});
