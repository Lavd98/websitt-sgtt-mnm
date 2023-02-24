import { Component, OnInit } from '@angular/core';
import { Subsistema } from '../../models/subsistema';

@Component({
  selector: 'app-subsistemas',
  templateUrl: './subsistemas.component.html',
  styleUrls: ['./subsistemas.component.css']
})
export class SubsistemasComponent implements OnInit {

  title = '..::WEBSITT::..';
  subsistemalist: Subsistema[];
  fname:string="";
  fruta:string="";
  idMenu:string="";
  editCustomer:boolean=false;
  subsistemaObject:Subsistema;
  FormHeader=""
  p:number = 1;
  username:string;
  password:string;
  idPerfil:string;

  constructor() { }

  ngOnInit(): void {
  }

}
