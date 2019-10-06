import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProseneComponent } from './listado-prosene.component';

describe('ListadoProseneComponent', () => {
  let component: ListadoProseneComponent;
  let fixture: ComponentFixture<ListadoProseneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoProseneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProseneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
