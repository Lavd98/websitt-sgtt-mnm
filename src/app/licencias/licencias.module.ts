import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenciasRoutingModule } from './licencias-routing.module';
import { SolicitudLicenciaComponent } from './pages/solicitud-licencia/solicitud-licencia.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SolicitudLicenciaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LicenciasRoutingModule
  ]
})
export class LicenciasModule { }
