import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAdministradoresComponent } from './ver-administradores.component';

describe('VerAdministradoresComponent', () => {
  let component: VerAdministradoresComponent;
  let fixture: ComponentFixture<VerAdministradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAdministradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
