import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawAmendmentsComponent } from './law-amendments.component';

describe('LawAmendmentsComponent', () => {
  let component: LawAmendmentsComponent;
  let fixture: ComponentFixture<LawAmendmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawAmendmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawAmendmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
