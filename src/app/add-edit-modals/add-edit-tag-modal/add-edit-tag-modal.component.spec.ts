import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTagModalComponent } from './add-edit-tag-modal.component';

describe('AddEditTagModalComponent', () => {
  let component: AddEditTagModalComponent;
  let fixture: ComponentFixture<AddEditTagModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTagModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
