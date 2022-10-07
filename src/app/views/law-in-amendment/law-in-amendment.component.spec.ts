import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawInAmendmentComponent } from './law-in-amendment.component';

describe('LawInAmendmentComponent', () => {
  let component: LawInAmendmentComponent;
  let fixture: ComponentFixture<LawInAmendmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawInAmendmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawInAmendmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
