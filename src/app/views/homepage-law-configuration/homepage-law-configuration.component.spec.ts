import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLawConfigurationComponent } from './homepage-law-configuration.component';

describe('HomepageLawConfigurationComponent', () => {
  let component: HomepageLawConfigurationComponent;
  let fixture: ComponentFixture<HomepageLawConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageLawConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageLawConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
