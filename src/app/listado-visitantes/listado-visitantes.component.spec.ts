import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVisitantesComponent } from './listado-visitantes.component';

describe('ListadoVisitantesComponent', () => {
  let component: ListadoVisitantesComponent;
  let fixture: ComponentFixture<ListadoVisitantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoVisitantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoVisitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
