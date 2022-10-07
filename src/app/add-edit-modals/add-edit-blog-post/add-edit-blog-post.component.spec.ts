import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBlogPostComponent } from './add-edit-blog-post.component';

describe('AddEditBlogPostComponent', () => {
  let component: AddEditBlogPostComponent;
  let fixture: ComponentFixture<AddEditBlogPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBlogPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
