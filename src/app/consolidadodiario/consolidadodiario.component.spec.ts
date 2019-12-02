import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadodiarioComponent } from './consolidadodiario.component';

describe('ConsolidadodiarioComponent', () => {
  let component: ConsolidadodiarioComponent;
  let fixture: ComponentFixture<ConsolidadodiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadodiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadodiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
