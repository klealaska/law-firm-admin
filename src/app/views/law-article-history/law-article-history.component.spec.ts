import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawArticleHistoryComponent } from './law-article-history.component';

describe('LawArticleHistoryComponent', () => {
  let component: LawArticleHistoryComponent;
  let fixture: ComponentFixture<LawArticleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawArticleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawArticleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
