import { TestBed } from '@angular/core/testing';

import { LoginadminService } from './loginadmin.service';

describe('LoginadminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginadminService = TestBed.get(LoginadminService);
    expect(service).toBeTruthy();
  });
});
