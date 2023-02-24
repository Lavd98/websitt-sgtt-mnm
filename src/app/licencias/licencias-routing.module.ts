import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudLicenciaComponent } from './pages/solicitud-licencia/solicitud-licencia.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'solicitud', component: SolicitudLicenciaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenciasRoutingModule { }
