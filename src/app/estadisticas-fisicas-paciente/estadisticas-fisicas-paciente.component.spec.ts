import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasFisicasPacienteComponent } from './estadisticas-fisicas-paciente.component';

describe('EstadisticasFisicasPacienteComponent', () => {
  let component: EstadisticasFisicasPacienteComponent;
  let fixture: ComponentFixture<EstadisticasFisicasPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasFisicasPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasFisicasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
