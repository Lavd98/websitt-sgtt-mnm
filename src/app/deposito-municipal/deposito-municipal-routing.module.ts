import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroActaInternamientoComponent } from './pages/actaInternamiento/registro-acta-internamiento/registro-acta-internamiento.component';
import { ListadoActaInternamientoComponent } from './pages/actaInternamiento/listado-acta-internamiento/listado-acta-internamiento.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'registro-acta-internamiento', component: RegistroActaInternamientoComponent},
    {path: 'listado-acta-internamiento', component: ListadoActaInternamientoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositoMunicipalRoutingModule { }
