import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserGroupsComponent } from './add-edit-user-groups.component';

describe('AddEditUserGroupsComponent', () => {
  let component: AddEditUserGroupsComponent;
  let fixture: ComponentFixture<AddEditUserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditUserGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
