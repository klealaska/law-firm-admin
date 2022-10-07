import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserCategoryComponent } from './add-edit-user-category.component';

describe('AddEditUserCategoryComponent', () => {
  let component: AddEditUserCategoryComponent;
  let fixture: ComponentFixture<AddEditUserCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditUserCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
