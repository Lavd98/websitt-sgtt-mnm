import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActaInternamientoComponent } from './listado-acta-internamiento.component';

describe('ListadoActaInternamientoComponent', () => {
  let component: ListadoActaInternamientoComponent;
  let fixture: ComponentFixture<ListadoActaInternamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoActaInternamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoActaInternamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
