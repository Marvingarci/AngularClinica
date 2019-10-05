import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoPacienteComponent } from './dato-paciente.component';

describe('DatoPacienteComponent', () => {
  let component: DatoPacienteComponent;
  let fixture: ComponentFixture<DatoPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatoPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
