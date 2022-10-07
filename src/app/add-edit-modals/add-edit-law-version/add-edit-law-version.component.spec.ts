import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLawVersionComponent } from './add-edit-law-version.component';

describe('AddEditLawVersionComponent', () => {
  let component: AddEditLawVersionComponent;
  let fixture: ComponentFixture<AddEditLawVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLawVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLawVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
