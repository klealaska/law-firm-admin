import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawCategoryComponent } from './law-category.component';

describe('LawCategoryComponent', () => {
  let component: LawCategoryComponent;
  let fixture: ComponentFixture<LawCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
