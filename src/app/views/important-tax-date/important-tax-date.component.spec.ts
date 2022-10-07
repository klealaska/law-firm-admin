import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantTaxDateComponent } from './important-tax-date.component';

describe('ImportantTaxDateComponent', () => {
  let component: ImportantTaxDateComponent;
  let fixture: ComponentFixture<ImportantTaxDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantTaxDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantTaxDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
