import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawApprovalComponent } from './law-approval.component';

describe('LawApprovalComponent', () => {
  let component: LawApprovalComponent;
  let fixture: ComponentFixture<LawApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
