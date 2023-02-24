import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { RegistroVehiculoComponent } from './popups/registro-vehiculo/registro-vehiculo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistroVehiculoComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    RegistroVehiculoComponent
  ]
})
export class VehiculoModule { }
