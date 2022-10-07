import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLawRelatedLinksComponent } from './add-edit-law-related-links.component';

describe('AddEditLawRelatedLinksComponent', () => {
  let component: AddEditLawRelatedLinksComponent;
  let fixture: ComponentFixture<AddEditLawRelatedLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLawRelatedLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLawRelatedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
