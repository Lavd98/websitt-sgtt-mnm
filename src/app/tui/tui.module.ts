import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TuiRoutingModule } from './tui-routing.module';
import { RegistroActaControlComponent } from './pages/actaControl/registro-acta-control/registro-acta-control.component';
import { ListadoActaControlComponent } from './pages/actaControl/listado-acta-control/listado-acta-control.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsActaControlComponent } from './pages/actaControl/details-acta-control/details-acta-control.component';
import { RegistroTarjetaCirculacionComponent } from './pages/tarjetaCirculacion/registro-tarjeta-circulacion/registro-tarjeta-circulacion.component';
import { RegistroVehiculoComponent } from '../vehiculo/popups/registro-vehiculo/registro-vehiculo.component';
import { VehiculoModule } from '../vehiculo/vehiculo.module';


@NgModule({
  declarations: [
    RegistroActaControlComponent,
    ListadoActaControlComponent,
    DetailsActaControlComponent,
    RegistroTarjetaCirculacionComponent
  ],
  imports: [
    CommonModule,
    TuiRoutingModule,

    VehiculoModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TuiModule { }
