import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditImportantTaxDateComponent } from './add-edit-important-tax-date.component';

describe('AddEditImportantTaxDateComponent', () => {
  let component: AddEditImportantTaxDateComponent;
  let fixture: ComponentFixture<AddEditImportantTaxDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditImportantTaxDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditImportantTaxDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
