import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { At1Component } from './at1.component';

describe('At1Component', () => {
  let component: At1Component;
  let fixture: ComponentFixture<At1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ At1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(At1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
