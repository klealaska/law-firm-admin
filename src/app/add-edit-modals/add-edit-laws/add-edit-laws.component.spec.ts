import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLawsComponent } from './add-edit-laws.component';

describe('AddEditLawsComponent', () => {
  let component: AddEditLawsComponent;
  let fixture: ComponentFixture<AddEditLawsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLawsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
