import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaVehiculoService } from '../../../common/services/categoria-vehiculo.service';
import { CategoriaVehiculo } from '../../../common/models/categoriavehiculo';
import { TipoVehiculo } from '../../../common/models/tipovehiculo';
import { TipoServicioVehiculo } from '../../../common/models/tiposerviciovehiculo';
import { TipoServicioVehiculoService } from '../../../common/services/tipo-servicio-vehiculo.service';
import { TipoVehiculoService } from '../../../common/services/tipo-vehiculo.service';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.component.html',
  styleUrls: ['./registro-vehiculo.component.css']
})
export class RegistroVehiculoComponent implements OnInit {

  vehiculoForm: FormGroup;

  categoriaVehiculoList: CategoriaVehiculo[];
  tipoVehiculoList: TipoVehiculo[];
  tipoServicioVehiculoList: TipoServicioVehiculo[];

  cVehiculo: Vehiculo;

  constructor(
    private fb: FormBuilder,
    private categoriavehiculoService: CategoriaVehiculoService,
    private tiposerviciovehiculoService: TipoServicioVehiculoService,
    private tipovehiculoService: TipoVehiculoService,
    private vehiculoService: VehiculoService
  ) {
    this.createForm();
    this.cVehiculo = new Vehiculo();
   }

  ngOnInit(): void {
    this.getCategoriaVehiculo();
    this.getTipoServicioVehiculo();
    this.getTipoVehiculo();
  }

  createForm(){
    this.vehiculoForm = this.fb.group({
      vfPlaca: ['', [Validators.required]],
      vfCategoriaVehiculo: [],
      vfMarca: ['', [Validators.required]],
      vfModelo: ['', [Validators.required]],
      vfColor: ['', [Validators.required]],
      vfMotor: ['', [Validators.required]],
      vfVin: ['', [Validators.required]],
      vfSerie: ['', [Validators.required]],
      vfCarroceria: ['', [Validators.required]],
      vfPropietario: ['', [Validators.required]],
      vfAnioFab: [''],
      vfAnioMod: [''],
      vfNroTarjeta: [''],
      vfTipoVehiculo: [],
      vfModalidadServicio: []

    })
  }

  get vfPlaca() { return this.vehiculoForm.get("vfPlaca"); }
  get vfMarca() { return this.vehiculoForm.get("vfMarca"); }
  get vfModelo() { return this.vehiculoForm.get("vfModelo"); }
  get vfColor() { return this.vehiculoForm.get("vfColor"); }
  get vfMotor() { return this.vehiculoForm.get("vfMotor"); }
  get vfVin() { return this.vehiculoForm.get("vfVin"); }
  get vfSerie() { return this.vehiculoForm.get("vfSerie"); }
  get vfCarroceria() { return this.vehiculoForm.get("vfCarroceria"); }
  get vfPropietario() { return this.vehiculoForm.get("vfPropietario"); }
  get vfAnioFab() { return this.vehiculoForm.get("vfAnioFab"); }
  get vfAnioMod() { return this.vehiculoForm.get("vfAnioMod"); }
  get vfNroTarjeta() { return this.vehiculoForm.get("vfNroTarjeta"); }



  getCategoriaVehiculo(){
    this.categoriavehiculoService.getCategoriasVehiculos().subscribe( data =>{
      this.categoriaVehiculoList = data;
      this.vehiculoForm.patchValue({vfCategoriaVehiculo: this.categoriaVehiculoList[0].idCATEGORIAVEHICULO });
    })
  }

  getTipoServicioVehiculo(){
    this.tiposerviciovehiculoService.getTiposServiciosVehiculo().subscribe( data =>{
      this.tipoServicioVehiculoList = data;
      this.vehiculoForm.patchValue({vfModalidadServicio: this.tipoServicioVehiculoList[0].idTIPOSERVICIOVEHICULO});
    })
  }

  getTipoVehiculo(){
    this.tipovehiculoService.getTipoVehiculos().subscribe( data =>{
      this.tipoVehiculoList = data;
      this.vehiculoForm.patchValue({vfTipoVehiculo: this.tipoVehiculoList[0].idTIPOVEHICULO })
    })
  }

  addVehiculo(){
    if(this.vehiculoForm.valid){
      this.cVehiculo.placa =  this.vehiculoForm.value.vfPlaca == null ? "" : this.vehiculoForm.value.vfPlaca;
      this.cVehiculo.idCATEGORIAVEHICULO = +this.vehiculoForm.value.vfCategoriaVehiculo;
      this.cVehiculo.marca = this.vehiculoForm.value.vfMarca == null ? "" : this.vehiculoForm.value.vfMarca;
      this.cVehiculo.modelo = this.vehiculoForm.value.vfModelo == null ? "" : this.vehiculoForm.value.vfModelo;
      this.cVehiculo.color = this.vehiculoForm.value.vfColor == null ? "" : this.vehiculoForm.value.vfColor;
      this.cVehiculo.motor = this.vehiculoForm.value.vfPlaca == null ? "" : this.vehiculoForm.value.vfPlaca;
      this.cVehiculo.vin = this.vehiculoForm.value.vfVin == null ? "" : this.vehiculoForm.value.vfVin;
      this.cVehiculo.serie = this.vehiculoForm.value.vfSerie == null ? "" : this.vehiculoForm.value.vfSerie;
      this.cVehiculo.carroceria = this.vehiculoForm.value.vfCarroceria == null ? "" : this.vehiculoForm.value.vfCarroceria;
      this.cVehiculo.propietario = this.vehiculoForm.value.vfPropietario == null ? "" : this.vehiculoForm.value.vfPropietario;
      this.cVehiculo.estado = true;
      this.cVehiculo.anioFabricacion = this.vehiculoForm.value.vfAnioFab == null ? "" : this.vehiculoForm.value.vfAnioFab;
      this.cVehiculo.anioModelo = this.vehiculoForm.value.vfAnioMod == null ? "" : this.vehiculoForm.value.vfAnioMod;
      this.cVehiculo.nroTarjeta = this.vehiculoForm.value.vfNroTarjeta == null ? "" : this.vehiculoForm.value.vfNroTarjeta;
      this.cVehiculo.idTIPOVEHICULO = +this.vehiculoForm.value.vfTipoVehiculo;
      this.cVehiculo.idTIPOSERVICIOVEHICULO = +this.vehiculoForm.value.vfModalidadServicio;

      console.log(this.cVehiculo)

      this.vehiculoService.addVehiculo(this.cVehiculo).subscribe(resp =>{
        alert('Registrado Correctamente');
        this.vehiculoForm.reset();
        this.ngOnInit();
      }),
          error => {
                      alert("No se ha registrado");
                      console.log("Error Occured " + error);
                    }
    }else{
      alert("Ingrese los campos requeridos");
    }
  }

}
