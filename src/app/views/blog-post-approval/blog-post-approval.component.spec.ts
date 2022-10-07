import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostApprovalComponent } from './blog-post-approval.component';

describe('BlogPostApprovalComponent', () => {
  let component: BlogPostApprovalComponent;
  let fixture: ComponentFixture<BlogPostApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
