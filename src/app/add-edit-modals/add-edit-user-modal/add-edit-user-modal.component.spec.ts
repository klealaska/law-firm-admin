import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserModalComponent } from './add-edit-user-modal.component';

describe('AddEditUserModalComponent', () => {
  let component: AddEditUserModalComponent;
  let fixture: ComponentFixture<AddEditUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
