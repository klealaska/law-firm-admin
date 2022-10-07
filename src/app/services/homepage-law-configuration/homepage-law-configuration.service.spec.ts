import { TestBed } from '@angular/core/testing';

import { HomepageLawConfigurationService } from './homepage-law-configuration.service';

describe('HomepageLawConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomepageLawConfigurationService = TestBed.get(HomepageLawConfigurationService);
    expect(service).toBeTruthy();
  });
});
