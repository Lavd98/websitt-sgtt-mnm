import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TuiRoutingModule } from './tui-routing.module';
import { RegistroActaControlComponent } from './pages/actaControl/registro-acta-control/registro-acta-control.component';
import { ListadoActaControlComponent } from './pages/actaControl/listado-acta-control/listado-acta-control.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RegistroActaControlComponent,
    ListadoActaControlComponent
  ],
  imports: [
    CommonModule,
    TuiRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TuiModule { }
