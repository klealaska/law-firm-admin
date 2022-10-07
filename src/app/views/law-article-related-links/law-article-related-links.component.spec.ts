import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawArticleRelatedLinksComponent } from './law-article-related-links.component';

describe('LawArticleRelatedLinksComponent', () => {
  let component: LawArticleRelatedLinksComponent;
  let fixture: ComponentFixture<LawArticleRelatedLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawArticleRelatedLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawArticleRelatedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
