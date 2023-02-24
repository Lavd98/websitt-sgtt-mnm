import { Component, OnInit } from '@angular/core';
import { ActaControlService } from '../../../services/acta-control.service';
import { ActaControl } from '../../../models/actacontrol';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-acta-control',
  templateUrl: './listado-acta-control.component.html',
  styleUrls: ['./listado-acta-control.component.css']
})
export class ListadoActaControlComponent implements OnInit {

  listForm: FormGroup;

  value: string;

  actasList: ActaControl[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actacontrolService: ActaControlService
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.getActas();
  }

  createForm() {
    this.listForm = this.fb.group({
      vfNroActa: [''], 
    })
  }

  get vfNroActa() { return this.listForm.get( "vfNroActa"); }
  

  getActas() {
    this.actacontrolService.getActas().subscribe( data =>{
      this.actasList = data;
    })
  }

  onKeyUp(term){
    this.value = term.target.value;
    if(this.value.length != 0){
      this.actacontrolService.getActasByTerm(this.value).subscribe( data =>{
        this.actasList = data;
      })
    }else{
      this.actacontrolService.getActas().subscribe( data =>{
        this.actasList = data;
      })
    }
  }

  // filter(){
  //   this.actacontrolService.getActasByTerm(this.value).subscribe( data =>{
  //     this.actasList = data;
  //   })
  // }


  setEstado(id: number) {
    this.actacontrolService.setEstado(id).subscribe( data =>{
      this.getActas();
    })
  }

  routerDetails(id: number) {
    this.router.navigate(['tui/acta-control/', id])
  }

}
