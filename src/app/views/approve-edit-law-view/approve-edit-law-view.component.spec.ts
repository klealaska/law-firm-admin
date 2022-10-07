import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditLawViewComponent } from './approve-edit-law-view.component';

describe('ApproveEditLawViewComponent', () => {
  let component: ApproveEditLawViewComponent;
  let fixture: ComponentFixture<ApproveEditLawViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditLawViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditLawViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
