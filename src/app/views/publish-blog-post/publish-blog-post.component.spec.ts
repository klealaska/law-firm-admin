import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishBlogPostComponent } from './publish-blog-post.component';

describe('PublishBlogPostComponent', () => {
  let component: PublishBlogPostComponent;
  let fixture: ComponentFixture<PublishBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
