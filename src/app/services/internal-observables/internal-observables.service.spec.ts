import { TestBed } from '@angular/core/testing';

import { InternalObservablesService } from './internal-observables.service';

describe('InternalObservablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternalObservablesService = TestBed.get(InternalObservablesService);
    expect(service).toBeTruthy();
  });
});
