import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHomepageLawConfigComponent } from './add-edit-homepage-law-config.component';

describe('AddEditHomepageLawConfigComponent', () => {
  let component: AddEditHomepageLawConfigComponent;
  let fixture: ComponentFixture<AddEditHomepageLawConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditHomepageLawConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHomepageLawConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
