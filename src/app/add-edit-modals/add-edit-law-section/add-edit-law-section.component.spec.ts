import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLawSectionComponent } from './add-edit-law-section.component';

describe('AddEditLawSectionComponent', () => {
  let component: AddEditLawSectionComponent;
  let fixture: ComponentFixture<AddEditLawSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLawSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLawSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
