import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vehiculo } from 'src/app/vehiculo/models/vehiculo';
import { VehiculoService } from 'src/app/vehiculo/services/vehiculo.service';
import { Empresa } from '../../../../common/models/empresa';
import { EmpresaService } from '../../../../common/services/empresa.service';
import { TarjetaCirculacion } from '../../../models/tarjetacirculacion';
import { TarjetaCirculacionService } from '../../../services/tarjeta-circulacion.service';

@Component({
  selector: 'app-registro-tarjeta-circulacion',
  templateUrl: './registro-tarjeta-circulacion.component.html',
  styleUrls: ['./registro-tarjeta-circulacion.component.css']
})
export class RegistroTarjetaCirculacionComponent implements OnInit {

  formTarjeta: FormGroup;

  cTarjeta: TarjetaCirculacion;
  cVehiculo: Vehiculo;

  idVehCapturado: number;

  empresasList: Empresa[];

  noExistVeh: boolean;

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private empresaService: EmpresaService,
    private tarjetacirculacionService: TarjetaCirculacionService
  ) { 
    this.createForm();
    this.cTarjeta = new TarjetaCirculacion();
    this.cVehiculo = new Vehiculo();
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  createForm(){
    this.formTarjeta = this.fb.group({
      vfNroExpediente: ['', [Validators.required]],

      vfBoletaPago: ['', [Validators.required]],
      vfFechaPago: ['', [Validators.required]],
      vfNroSocio: ['', [Validators.required]],
      vfMontoTarjeta: [''],
      vfMontoIncVeh: [''],
      vfEmpresa: [],
      vfFechaExpedicion: ['', [Validators.required]],
      vfFechaVencimiento: ['', [Validators.required]],

      vfPlaca: ['', [Validators.required]],
      vfCarroceria: ['', [Validators.required]],
      vfNroSerie: ['', [Validators.required]],
      vfMotor: ['', [Validators.required]],
      vfColor: ['', [Validators.required]],
      vfAnioFab: ['', [Validators.required]],
      vfPropietario: ['', [Validators.required]],
      
    });
  }

  get vfNroExpediente() { return this.formTarjeta.get( "vfNroExpediente"); }

  get vfBoletaPago() { return this.formTarjeta.get( "vfBoletaPago"); }
  get vfFechaPago() { return this.formTarjeta.get( "vfFechaPago"); }
  get vfNroSocio() { return this.formTarjeta.get( "vfNroSocio"); }
  get vfMontoTarjeta() { return this.formTarjeta.get( "vfMontoTarjeta"); }
  get vfMontoIncVeh() { return this.formTarjeta.get( "vfMontoIncVeh"); }
  get vfFechaExpedicion() { return this.formTarjeta.get( "vfFechaExpedicion"); }
  get vfFechaVencimiento() { return this.formTarjeta.get( "vfFechaVencimiento"); }

  get vfPlaca() { return this.formTarjeta.get( "vfPlaca"); }
  get vfCarroceria() { return this.formTarjeta.get( "vfCarroceria"); }
  get vfNroSerie() { return this.formTarjeta.get( "vfNroSerie"); }
  get vfMotor() { return this.formTarjeta.get( "vfMotor"); }
  get vfColor() { return this.formTarjeta.get( "vfColor"); }
  get vfAnioFab() { return this.formTarjeta.get( "vfAnioFab"); }
  get vfPropietario() { return this.formTarjeta.get( "vfPropietario"); }

  buscarVehiculo(){
    this.vehiculoService.getVehiculoByPlaca(this.vfPlaca.value).subscribe( data => {

      if(data[0] != undefined){
        this.noExistVeh = false;

      this.cVehiculo = data;
      
      this.formTarjeta.patchValue({vfCarroceria: this.cVehiculo[0].carroceria}); 
      this.formTarjeta.patchValue({vfNroSerie: this.cVehiculo[0].serie});
      this.formTarjeta.patchValue({vfMotor: this.cVehiculo[0].motor});
      this.formTarjeta.patchValue({vfColor: this.cVehiculo[0].color});
      this.formTarjeta.patchValue({vfAnioFab: this.cVehiculo[0].anioFabricacion});
      this.formTarjeta.patchValue({vfPropietario: this.cVehiculo[0].propietario});

      this.idVehCapturado = this.cVehiculo[0].idVEHICULO;
      }else{
        this.noExistVeh = true
        this.formTarjeta.patchValue({vfCarroceria: ""}); 
        this.formTarjeta.patchValue({vfNroSerie: ""});
        this.formTarjeta.patchValue({vfMotor: ""});
        this.formTarjeta.patchValue({vfColor: ""});
        this.formTarjeta.patchValue({vfAnioFab: ""});
        this.formTarjeta.patchValue({vfPropietario: ""});
      }
      
    })
  }

  getEmpresas(){
    this.empresaService.getAllEmpresas().subscribe(data =>{
      this.empresasList = data;
      this.formTarjeta.patchValue({vfEmpresa: this.empresasList[0].idEMPRESA });
    })
  }

  capturaFecha(){
    const fechaCap = new Date(this.vfFechaExpedicion.value);
    // const array = fechaCap.split('-');
    let anioAgregado = new Date(fechaCap.setUTCFullYear(fechaCap.getUTCFullYear() + 1));
    const dia = String(anioAgregado.getUTCDate()).padStart(2,'0');
    const mes = String(anioAgregado.getUTCMonth() + 1).padStart(2,'0');
    const anio = anioAgregado.getFullYear()
    const fechaString = `${anio}-${mes}-${dia}`;

    console.log(anioAgregado);

    

    this.formTarjeta.patchValue({vfFechaVencimiento: fechaString});

  }

  registrarTarjetaCirculacion(){
    if(this.formTarjeta.valid){
      this.cTarjeta.nroExpediente = this.formTarjeta.value.vfNroExpediente == null ? "" : this.formTarjeta.value.vfNroExpediente;
      this.cTarjeta.nroBoletaPago = this.formTarjeta.value.vfBoletaPago == null ? "" : this.formTarjeta.value.vfBoletaPago;
      this.cTarjeta.fechaPago = this.formTarjeta.value.vfFechaPago == null ? "" : this.formTarjeta.value.vfFechaPago;
      this.cTarjeta.nroSocio = this.formTarjeta.value.vfNroSocio == null ? "" : this.formTarjeta.value.vfNroSocio;
      this.cTarjeta.montoTC = this.formTarjeta.value.vfMontoTarjeta == null ? "" : this.formTarjeta.value.vfMontoTarjeta;
      this.cTarjeta.montoIncVeh = this.formTarjeta.value.vfMontoIncVeh == null ? "" : this.formTarjeta.value.vfMontoIncVeh;
      this.cTarjeta.idEMPRESA = +this.formTarjeta.value.vfEmpresa;
      this.cTarjeta.fechaExpedicion = this.formTarjeta.value.vfFechaExpedicion == null ? "" : this.formTarjeta.value.vfFechaExpedicion;
      this.cTarjeta.fechaVencimiento = this.formTarjeta.value.vfFechaVencimiento == null ? "" : this.formTarjeta.value.vfFechaVencimiento;
      this.cTarjeta.idVEHICULO = +this.idVehCapturado;
      this.cTarjeta.estado = true;

      console.log(this.cTarjeta);
      this.tarjetacirculacionService.addTarjeta(this.cTarjeta).subscribe(res =>{
        alert('Registrado Correctamente');
        this.formTarjeta.reset();
        this.ngOnInit();
      }),
      error => {
                  alert("No se ha registrado");
                  console.log("Error Occured " + error);
                }
    }
  }

}

