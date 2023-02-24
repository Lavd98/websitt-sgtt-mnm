import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroActaControlComponent } from './pages/actaControl/registro-acta-control/registro-acta-control.component';
import { ListadoActaControlComponent } from './pages/actaControl/listado-acta-control/listado-acta-control.component';
import { DetailsActaControlComponent } from './pages/actaControl/details-acta-control/details-acta-control.component';
import { RegistroTarjetaCirculacionComponent } from './pages/tarjetaCirculacion/registro-tarjeta-circulacion/registro-tarjeta-circulacion.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'registro-acta-control', component: RegistroActaControlComponent},
    {path: 'acta-control/:id', component: DetailsActaControlComponent},
    {path: 'listado-acta-control', component: ListadoActaControlComponent},

    {path: 'registro-tarjeta-circulacion', component: RegistroTarjetaCirculacionComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuiRoutingModule { }
