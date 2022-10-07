import { TestBed } from '@angular/core/testing';

import { LawArticleVersionService } from './law-article-version.service';

describe('LawArticleVersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LawArticleVersionService = TestBed.get(LawArticleVersionService);
    expect(service).toBeTruthy();
  });
});
