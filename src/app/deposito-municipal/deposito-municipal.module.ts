import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositoMunicipalRoutingModule } from './deposito-municipal-routing.module';
import { RegistroActaInternamientoComponent } from './pages/actaInternamiento/registro-acta-internamiento/registro-acta-internamiento.component';
import { ListadoActaInternamientoComponent } from './pages/actaInternamiento/listado-acta-internamiento/listado-acta-internamiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RegistroActaInternamientoComponent,
    ListadoActaInternamientoComponent
  ],
  imports: [
    CommonModule,
    DepositoMunicipalRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DepositoMunicipalModule { }
