import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToMyAmendmentsComponent } from './send-to-my-amendments.component';

describe('SendToMyAmendmentsComponent', () => {
  let component: SendToMyAmendmentsComponent;
  let fixture: ComponentFixture<SendToMyAmendmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToMyAmendmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToMyAmendmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
