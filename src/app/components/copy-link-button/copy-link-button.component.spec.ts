import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyLinkButtonComponent } from './copy-link-button.component';

describe('CopyLinkButtonComponent', () => {
  let component: CopyLinkButtonComponent;
  let fixture: ComponentFixture<CopyLinkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyLinkButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyLinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
