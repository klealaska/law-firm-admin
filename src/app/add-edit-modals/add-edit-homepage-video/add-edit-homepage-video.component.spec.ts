import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHomepageVideoComponent } from './add-edit-homepage-video.component';

describe('AddEditHomepageVideoComponent', () => {
  let component: AddEditHomepageVideoComponent;
  let fixture: ComponentFixture<AddEditHomepageVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditHomepageVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHomepageVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
