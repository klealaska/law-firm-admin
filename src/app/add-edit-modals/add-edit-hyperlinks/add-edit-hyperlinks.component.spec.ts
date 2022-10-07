import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHyperlinksComponent } from './add-edit-hyperlinks.component';

describe('AddEditHyperlinksComponent', () => {
  let component: AddEditHyperlinksComponent;
  let fixture: ComponentFixture<AddEditHyperlinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditHyperlinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHyperlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
