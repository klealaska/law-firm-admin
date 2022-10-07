import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlinksComponent } from './hyperlinks.component';

describe('HyperlinksComponent', () => {
  let component: HyperlinksComponent;
  let fixture: ComponentFixture<HyperlinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyperlinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
