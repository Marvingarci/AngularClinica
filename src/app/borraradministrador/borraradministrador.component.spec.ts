import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorraradministradorComponent } from './borraradministrador.component';

describe('BorraradministradorComponent', () => {
  let component: BorraradministradorComponent;
  let fixture: ComponentFixture<BorraradministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorraradministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorraradministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
