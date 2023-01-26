import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroActaControlComponent } from './pages/actaControl/registro-acta-control/registro-acta-control.component';
import { ListadoActaControlComponent } from './pages/actaControl/listado-acta-control/listado-acta-control.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'registro-acta-control', component: RegistroActaControlComponent},
    {path: 'listado-acta-control', component: ListadoActaControlComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuiRoutingModule { }
