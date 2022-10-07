import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLawArticleHistoryComponent } from './add-edit-law-article-history.component';

describe('AddEditLawArticleHistoryComponent', () => {
  let component: AddEditLawArticleHistoryComponent;
  let fixture: ComponentFixture<AddEditLawArticleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLawArticleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLawArticleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
