import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPacienteGuard } from './auth-paciente.guard';

describe('AuthPacienteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPacienteGuard]
    });
  });

  it('should ...', inject([AuthPacienteGuard], (guard: AuthPacienteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
