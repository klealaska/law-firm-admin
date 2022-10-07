import { TestBed } from '@angular/core/testing';

import { ImportantTaxDateService } from './important-tax-date.service';

describe('ImportantTaxDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportantTaxDateService = TestBed.get(ImportantTaxDateService);
    expect(service).toBeTruthy();
  });
});
