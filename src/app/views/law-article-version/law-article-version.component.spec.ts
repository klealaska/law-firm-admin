import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawArticleVersionComponent } from './law-article-version.component';

describe('LawArticleVersionComponent', () => {
  let component: LawArticleVersionComponent;
  let fixture: ComponentFixture<LawArticleVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawArticleVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawArticleVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
