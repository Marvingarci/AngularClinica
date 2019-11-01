import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseAdminComponent } from './pase-admin.component';

describe('PaseAdminComponent', () => {
  let component: PaseAdminComponent;
  let fixture: ComponentFixture<PaseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
