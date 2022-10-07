import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditBlogPostViewComponent } from './approve-edit-blog-post-view.component';

describe('ApproveEditBlogPostViewComponent', () => {
  let component: ApproveEditBlogPostViewComponent;
  let fixture: ComponentFixture<ApproveEditBlogPostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditBlogPostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditBlogPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
