import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAdapterComponent } from './editor-adapter.component';

describe('EditorAdapterComponent', () => {
  let component: EditorAdapterComponent;
  let fixture: ComponentFixture<EditorAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorAdapterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
