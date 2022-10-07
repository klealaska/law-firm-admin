import { TestBed } from '@angular/core/testing';

import { LawArticleHistoryService } from './law-article-history.service';

describe('LawArticleHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LawArticleHistoryService = TestBed.get(LawArticleHistoryService);
    expect(service).toBeTruthy();
  });
});
