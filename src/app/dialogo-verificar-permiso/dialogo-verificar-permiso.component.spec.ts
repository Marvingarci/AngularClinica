import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoVerificarPermisoComponent } from './dialogo-verificar-permiso.component';

describe('DialogoVerificarPermisoComponent', () => {
  let component: DialogoVerificarPermisoComponent;
  let fixture: ComponentFixture<DialogoVerificarPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoVerificarPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoVerificarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
