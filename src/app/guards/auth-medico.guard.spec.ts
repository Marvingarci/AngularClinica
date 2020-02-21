import { TestBed, async, inject } from '@angular/core/testing';

import { AuthMedicoGuard } from './auth-medico.guard';

describe('AuthMedicoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthMedicoGuard]
    });
  });

  it('should ...', inject([AuthMedicoGuard], (guard: AuthMedicoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
