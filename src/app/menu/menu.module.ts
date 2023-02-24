import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ModulesComponent } from './pages/modules/modules.component';


@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
