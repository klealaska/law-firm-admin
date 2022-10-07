import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLawCategoryComponent } from './add-edit-law-category.component';

describe('AddEditLawCategoryComponent', () => {
  let component: AddEditLawCategoryComponent;
  let fixture: ComponentFixture<AddEditLawCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLawCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLawCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
