import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CategoriaVehiculo } from '../../../../common/models/categoriavehiculo';
import { CategoriaVehiculoService } from '../../../../common/services/categoria-vehiculo.service';
import { ActaControlService } from '../../../../tui/services/acta-control.service';
import { ActaControl } from '../../../../tui/models/actacontrol';
import { InventarioVehiculoService } from '../../../../common/services/inventario-vehiculo.service';
import { InventarioVehiculo } from '../../../../common/models/inventariovehiculo';
import { Infraccion } from 'src/app/common/models/infraccion';
import { InfraccionService } from '../../../../common/services/infraccion.service';
import { ComisariaService } from '../../../../common/services/comisaria.service';
import { Comisaria } from '../../../../common/models/comisaria';
import { ActaInternamiento } from '../../../models/actainternamiento';
import { ActaInternamientoService } from '../../../services/acta-internamiento.service';
import { Vehiculo } from 'src/app/vehiculo/models/vehiculo';
import { VehiculoService } from 'src/app/vehiculo/services/vehiculo.service';

@Component({
  selector: 'app-registro-acta-internamiento',
  templateUrl: './registro-acta-internamiento.component.html',
  styleUrls: ['./registro-acta-internamiento.component.css']
})
export class RegistroActaInternamientoComponent implements OnInit {

  formActa: FormGroup;

  cVehiculo: Vehiculo;
  cActa: ActaControl;
  cActaInternamiento: ActaInternamiento;

  codigoInfraccionList: Infraccion[];
  categoriaVehiculoList: CategoriaVehiculo[];
  comisariaList: Comisaria[];
  inventarioVehiculoList1: InventarioVehiculo[];
  inventarioVehiculoList2: InventarioVehiculo[];
  inventarioVehiculoList3: InventarioVehiculo[];

  idVehCapturado: number;
  idActaCapturado: number;

  constructor(
    private fb: FormBuilder,
    private categoriavehiculoService: CategoriaVehiculoService,
    private vehiculoService: VehiculoService,
    private actacontrolService: ActaControlService,
    private inventariovehiculoService: InventarioVehiculoService,
    private infraccionService: InfraccionService,
    private comisariaService: ComisariaService,
    private actaInternamientoService: ActaInternamientoService
  ) { 
    this.createForm();
    this.cVehiculo = new Vehiculo();
    this.cActa = new ActaControl();
    this.cActaInternamiento = new ActaInternamiento();
  }

  ngOnInit(): void {
    this.getCategoriaVehiculo();
    this.getInventarioSeccion1();
    this.getInventarioSeccion2();
    this.getInventarioSeccion3();
    this.getCodInfracciones();
    this.getComisarias();
  }

  createForm(){
    this.formActa = this.fb.group({
      vfNroActa: ['', [Validators.required]],

      vfFechaInternamiento: ['', [Validators.required]],
      vfHoraInternamiento: ['', [Validators.required]],
      vfNroActaControl: ['', [Validators.required]],
      vfPlaca: ['', [Validators.required]],
      vfCategoriaVehiculo: [],
      vfMarca: ['', [Validators.required]],
      vfColor: ['', [Validators.required]],
      vfNroMotor: ['', [Validators.required]],
      vfCodInfraccion: [],
      vfComisaria: [],
      vfGrua: [''],
      vfPnp: ['', [Validators.required]],
      orders: this.fb.array([]),
      orders2: this.fb.array([]),
      orders3: this.fb.array([]),
      vfObservacion: ['']
    })
  }

  // ordersData = [
  //   { id: 100, name: 'order 1' },
  //   { id: 200, name: 'order 2' },
  //   { id: 300, name: 'order 3' },
  //   { id: 400, name: 'order 4' },
  //   { id: 500, name: 'order 5' }
  // ];

  get ordersFormArray() {
    return this.formActa.controls['orders'] as FormArray;
  }
  get ordersFormArray2() {
    return this.formActa.controls['orders2'] as FormArray;
  }

  get ordersFormArray3() {
    return this.formActa.controls['orders3'] as FormArray;
  }


  private addCheckboxes() {
    //this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
    this.ordersFormArray.clear();
    this.inventarioVehiculoList1.forEach(() => this.ordersFormArray.push(new FormControl(false))); 
  } 

  private addCheckboxes2() {   
    this.ordersFormArray2.clear(); 
    this.inventarioVehiculoList2.forEach(() => this.ordersFormArray2.push(new FormControl(false)));   
  } 

  private addCheckboxes3() {    
    this.ordersFormArray3.clear(); 
    this.inventarioVehiculoList3.forEach(() => this.ordersFormArray3.push(new FormControl(false)));   
  } 

  get vfNroActa() { return this.formActa.get( "vfNroActa"); }

  get vfFechaInternamiento() { return this.formActa.get( "vfFechaInternamiento"); }
  get vfHoraInternamiento() { return this.formActa.get( "vfHoraInternamiento"); }
  get vfNroActaControl() { return this.formActa.get( "vfNroActaControl"); }
  get vfPlaca() { return this.formActa.get( "vfPlaca"); }
  get vfMarca() { return this.formActa.get( "vfMarca"); }
  get vfColor() { return this.formActa.get( "vfColor"); }
  get vfNroMotor() { return this.formActa.get( "vfNroMotor"); }
  get vfPnp() { return this.formActa.get( "vfPnp" ); }
  get vfGrua() { return this.formActa.get( "vfGrua" ); }
  get vfObservacion() { return this.formActa.get( "vfObservacion" ); }

  getCodInfracciones(){
    this.infraccionService.getInfracciones().subscribe( data =>{
     this.codigoInfraccionList = data;
     this.formActa.patchValue({vfCodInfraccion:this.codigoInfraccionList[0].idINFRACCION });
    })
 }

  getCategoriaVehiculo(){
    this.categoriavehiculoService.getCategoriasVehiculos().subscribe( data =>{
      this.categoriaVehiculoList = data;
      this.formActa.patchValue({vfCategoriaVehiculo: this.categoriaVehiculoList[0].idCATEGORIAVEHICULO });
    })
  }

  getComisarias(){
    this.comisariaService.getComisarias().subscribe( data =>{
      this.comisariaList = data;
      this.formActa.patchValue({vfComisaria: this.comisariaList[0].idCOMISARIA})
    })
  }

  getInventarioSeccion1(){
    this.inventariovehiculoService.getInventarioVehiculoBySeccion(1).subscribe(data => {
      this.inventarioVehiculoList1 = data;
      this.addCheckboxes();    
    })
  }
  getInventarioSeccion2(){
    this.inventariovehiculoService.getInventarioVehiculoBySeccion(2).subscribe(data => {
      this.inventarioVehiculoList2 = data;
      this.addCheckboxes2(); 
    })
  }
  getInventarioSeccion3(){
    this.inventariovehiculoService.getInventarioVehiculoBySeccion(3).subscribe(data => {
      this.inventarioVehiculoList3 = data;
      this.addCheckboxes3(); 
    })
  }

  buscarActa(){
    this.actacontrolService.getActaByNro(this.vfNroActaControl.value).subscribe( data => {
      this.cActa = data;
      this.idActaCapturado = this.cActa[0].idACTACONTROL;
      this.idVehCapturado = this.cActa[0].idVEHICULO;
      this.formActa.patchValue({vfPlaca: this.cActa[0].placa})
      this.formActa.patchValue({vfCategoriaVehiculo: this.cActa[0].idCATEGORIAVEHICULO});
      this.formActa.patchValue({vfMarca: this.cActa[0].marca});
      this.formActa.patchValue({vfColor: this.cActa[0].color});
      this.formActa.patchValue({vfNroMotor: this.cActa[0].motor});
      this.formActa.patchValue({vfCodInfraccion: this.cActa[0].idINFRACCION})
      console.log(this.idVehCapturado);
    })
  }

  buscarVehiculo(){
    this.vehiculoService.getVehiculoByPlaca(this.vfPlaca.value).subscribe( data => {
      this.cVehiculo = data;
      this.formActa.patchValue({vfCategoriaVehiculo: this.cVehiculo[0].idCATEGORIAVEHICULO});
      this.formActa.patchValue({vfMarca: this.cVehiculo[0].marca});
      this.formActa.patchValue({vfColor: this.cVehiculo[0].color});
      this.formActa.patchValue({vfNroMotor: this.cVehiculo[0].motor});
      this.idVehCapturado = this.cVehiculo[0].idVEHICULO;
    })
  }

  click(){
    

      if(this.formActa.valid){

        let n1 = this.formActa.controls['vfNroActa'].value;
        let nroActaFormat = n1.padStart(7,'0');
        console.log(nroActaFormat)

      const selectedOrderIds = this.formActa.value.orders
      .map((checked, i) => checked ? this.inventarioVehiculoList1[i].idINVVEH : null)
      .filter(v => v !== null);
      console.log(selectedOrderIds);

      const selectedOrderIds2 = this.formActa.value.orders2
      .map((checked, i) => checked ? this.inventarioVehiculoList2[i].idINVVEH : null)
      .filter(v => v !== null);
      console.log(selectedOrderIds2);

      const selectedOrderIds3 = this.formActa.value.orders3
      .map((checked, i) => checked ? this.inventarioVehiculoList3[i].idINVVEH : null)
      .filter(v => v !== null);
      console.log(selectedOrderIds3);
               
      this.cActaInternamiento.listaIdInventario=[].concat(selectedOrderIds,selectedOrderIds2,selectedOrderIds3);

        this.cActaInternamiento.nroActaInternamiento = nroActaFormat;
        this.cActaInternamiento.fechaInternamiento = this.formActa.value.vfFechaInternamiento  == null ? "" : this.formActa.value.vfFechaInternamiento;
        this.cActaInternamiento.horaInternamiento = this.formActa.value.vfHoraInternamiento  == null ? "" : this.formActa.value.vfHoraInternamiento;
        this.cActaInternamiento.idACTACONTROL = this.idActaCapturado;
        this.cActaInternamiento.nombrePolicia = this.formActa.value.vfPnp  == null ? "" : this.formActa.value.vfPnp;
        this.cActaInternamiento.idCOMISARIA = +this.formActa.value.vfComisaria;
        this.cActaInternamiento.gruaChofer = this.formActa.value.vfGrua  == null ? "" : this.formActa.value.vfGrua;
        this.cActaInternamiento.observacion = this.formActa.value.vfObservacion  == null ? "" :this.formActa.value.vfObservacion;
        this.cActaInternamiento.estado = true;

        console.log(this.cActaInternamiento);

        this.actaInternamientoService.addActaInternamiento(this.cActaInternamiento).subscribe( res =>{
          alert('Registrado Correctamente');
            this.formActa.reset();
            this.ngOnInit();
        })
        ,
          error => {
                      alert("No se ha registrado");
                      console.log("Error Occured " + error);
                    }

      }else{
        alert("Ingrese los campos requeridos");
      }
  }
}
