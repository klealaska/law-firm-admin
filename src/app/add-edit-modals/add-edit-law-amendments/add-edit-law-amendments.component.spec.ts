import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLawAmendmentsComponent } from './add-edit-law-amendments.component';

describe('AddEditLawAmendmentsComponent', () => {
  let component: AddEditLawAmendmentsComponent;
  let fixture: ComponentFixture<AddEditLawAmendmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLawAmendmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLawAmendmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
