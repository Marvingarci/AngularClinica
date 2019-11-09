import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarMedicoComponent } from './borrar-medico.component';

describe('BorrarMedicoComponent', () => {
  let component: BorrarMedicoComponent;
  let fixture: ComponentFixture<BorrarMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
