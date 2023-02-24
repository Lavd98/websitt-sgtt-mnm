import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActaInternamiento } from '../../../models/actainternamiento';
import { ActaInternamientoService } from '../../../services/acta-internamiento.service';

@Component({
  selector: 'app-listado-acta-internamiento',
  templateUrl: './listado-acta-internamiento.component.html',
  styleUrls: ['./listado-acta-internamiento.component.css']
})
export class ListadoActaInternamientoComponent implements OnInit {

  listForm: FormGroup;

  value: string;

  actasList: ActaInternamiento[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actainternamientoService: ActaInternamientoService
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
    this.actainternamientoService.getActas().subscribe( data =>{
      this.actasList = data;
    })
  }

}
