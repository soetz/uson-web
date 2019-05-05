import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToNoteFieldComponent } from './go-to-note-field.component';

describe('GoToNoteFieldComponent', () => {
  let component: GoToNoteFieldComponent;
  let fixture: ComponentFixture<GoToNoteFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoToNoteFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToNoteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
