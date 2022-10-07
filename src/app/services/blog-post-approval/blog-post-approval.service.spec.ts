import { TestBed } from '@angular/core/testing';

import { BlogPostApprovalService } from './blog-post-approval.service';

describe('BlogPostApprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogPostApprovalService = TestBed.get(BlogPostApprovalService);
    expect(service).toBeTruthy();
  });
});
