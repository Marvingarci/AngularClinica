import { TestBed, async, inject } from '@angular/core/testing';

import { AuthAdministradorGuard } from './auth-administrador.guard';

describe('AuthAdministradorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthAdministradorGuard]
    });
  });

  it('should ...', inject([AuthAdministradorGuard], (guard: AuthAdministradorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
