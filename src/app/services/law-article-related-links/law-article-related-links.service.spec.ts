import { TestBed } from '@angular/core/testing';

import { LawArticleRelatedLinksService } from './law-article-related-links.service';

describe('LawArticleRelatedLinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LawArticleRelatedLinksService = TestBed.get(LawArticleRelatedLinksService);
    expect(service).toBeTruthy();
  });
});
