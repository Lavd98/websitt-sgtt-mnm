import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudLicenciaComponent } from './solicitud-licencia.component';

describe('SolicitudLicenciaComponent', () => {
  let component: SolicitudLicenciaComponent;
  let fixture: ComponentFixture<SolicitudLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudLicenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
