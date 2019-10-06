import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTrabajadoresComponent } from './listado-trabajadores.component';

describe('ListadoTrabajadoresComponent', () => {
  let component: ListadoTrabajadoresComponent;
  let fixture: ComponentFixture<ListadoTrabajadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTrabajadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
