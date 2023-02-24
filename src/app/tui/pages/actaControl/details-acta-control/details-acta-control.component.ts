import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActaControlService } from '../../../services/acta-control.service';
import { ActaControl } from '../../../models/actacontrol';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoDocumentoIdentidad } from 'src/app/common/models/tipodocumentoidentidad';
import { TipoServicioVehiculo } from 'src/app/common/models/tiposerviciovehiculo';
import { TipoVehiculo } from 'src/app/common/models/tipovehiculo';
import { CategoriaVehiculo } from 'src/app/common/models/categoriavehiculo';
import { Infraccion } from 'src/app/common/models/infraccion';
import { MedidaPreventiva } from 'src/app/common/models/medidapreventiva';
import { AnioFabricacionService } from '../../../../common/services/anio-fabricacion.service';
import { TipoServicioVehiculoService } from '../../../../common/services/tipo-servicio-vehiculo.service';
import { TipoVehiculoService } from '../../../../common/services/tipo-vehiculo.service';
import { CategoriaVehiculoService } from '../../../../common/services/categoria-vehiculo.service';
import { InfraccionService } from '../../../../common/services/infraccion.service';
import { MedidaPreventivaService } from '../../../../common/services/medida-preventiva.service';
import { EmpresaService } from '../../../../common/services/empresa.service';
import { Empresa } from '../../../../common/models/empresa';

import { TipoDocumentoService } from '../../../../common/services/tipo-documento.service';
import { Vehiculo } from 'src/app/vehiculo/models/vehiculo';
import { VehiculoService } from 'src/app/vehiculo/services/vehiculo.service';

@Component({
  selector: 'app-details-acta-control',
  templateUrl: './details-acta-control.component.html',
  styleUrls: ['./details-acta-control.component.css']
})
export class DetailsActaControlComponent implements OnInit {

  formActa: FormGroup;

  aniosList = [];
  tipoDocumentoIdentidadList: TipoDocumentoIdentidad[];
  tipoServicioVehiculoList: TipoServicioVehiculo[];
  tipoVehiculoList: TipoVehiculo[];
  categoriaVehiculoList: CategoriaVehiculo[];
  codigoInfraccionList: Infraccion[];
  medidaPreventivaList: MedidaPreventiva[];

  idActaCapturado: number;
  idVehCapturado: number;
  idEmpresaCapturado: number;
  tieneLicencia: boolean;

  cActa: ActaControl;
  cEmpresa: Empresa;
  cVehiculo: Vehiculo;

  constructor(
    private fb: FormBuilder,
    private actacontrolService: ActaControlService,
    private router: ActivatedRoute,
    private tipodocumentoidentidadservice: TipoDocumentoService,
    private anioFabricacionService: AnioFabricacionService,
    private tiposerviciovehiculoService: TipoServicioVehiculoService,
    private tipovehiculoService: TipoVehiculoService,
    private categoriavehiculoService: CategoriaVehiculoService,
    private infraccionService: InfraccionService,
    private medidapreventivaService: MedidaPreventivaService,
    private empresaService: EmpresaService,
    private vehiculoService: VehiculoService
  ) {
    this.createForm();
    this.cActa = new ActaControl();
    this.cEmpresa = new Empresa();
    this.cVehiculo = new Vehiculo();
   }

  ngOnInit(): void {
    this.idActaCapturado = +this.router.snapshot.paramMap.get('id');
    console.log(this.idActaCapturado);
    
    this.getTipoDocumentoIdentidad();
    this.getAnios();
    this.getTipoServicioVehiculo();
    this.getTipoVehiculo();
    this.getCategoriaVehiculo();
    this.getCodInfracciones();
    this.getMedidaPreventivas();

    this.getActa();
  }

  createForm() {
    this.formActa = this.fb.group({
      vfNroActa: ['', [Validators.required]],

      vfTipoDocIdentidadConductor: [],
      vfDniConductor: ['', [Validators.required]],
      vfApePatConductor: ['', [Validators.required]],
      vfApeMatConductor: ['', [Validators.required]],
      vfNombresConductor: ['', [Validators.required]],
      vfDireccionConductor: ['', [Validators.required]],
      vfCheckedLic: false,
      vfLicenciaConductor: ['', [Validators.required]],
      vfClaseLicencia: ['', [Validators.required]],
      vfCategoriaLicencia: ['', [Validators.required]],

      vfCheckedCirculacion: false,
      vfRuc: ['', [Validators.required]],
      vfEmpresa: ['', [Validators.required]],
      vfTarjetaCirculacion: ['', [Validators.required]],

      vfPlaca: ['', [Validators.required]],
      vfTarjeta: ['', [Validators.required]],
      vfAnioFabVehiculo: [''],
      vfModalidadServicio: [],
      vfTipoVehiculo: [],
      vfCategoriaVehiculo: ['', [Validators.required]],
      vfCheckedPropietario: false,
      vfNombrePropietario: ['', [Validators.required]],

      vfFechaInfraccion: ['', [Validators.required]],
      vfHoraInfraccion: ['', [Validators.required]],
      vfCodInfraccion: [],
      vfConductaInfraccion: ['', [Validators.required]],
      vfLugarOcurrencia: ['', [Validators.required]],
      vfObservacionInspector: [''],
      vfObservacionConductor: [''],

      vfTipoDocIdentidadAutoridad: [],
      vfDniAutoridad: ['', [Validators.required]],
      vfNombreApellidoAutoridad: ['', [Validators.required]],

      vfMedidaPreventida: []
    });
  }

  get vfNroActa() { return this.formActa.get( "vfNroActa"); }

  get vfDniConductor() { return this.formActa.get( "vfDniConductor"); }
  get vfApePatConductor() { return this.formActa.get( "vfApePatConductor"); }
  get vfApeMatConductor() { return this.formActa.get( "vfApeMatConductor"); }
  get vfNombresConductor() { return this.formActa.get( "vfNombresConductor"); }
  get vfDireccionConductor() { return this.formActa.get( "vfDireccionConductor"); }
  get vfCheckedLic() { return this.formActa.get( "vfCheckedLic"); }
  get vfLicenciaConductor() { return this.formActa.get( "vfLicenciaConductor"); }
  get vfClaseLicencia() { return this.formActa.get( "vfClaseLicencia"); }
  get vfCategoriaLicencia() { return this.formActa.get( "vfCategoriaLicencia"); }
 
  get vfCheckedCirculacion() { return this.formActa.get( "vfCheckedCirculacion"); }
  get vfRuc() { return this.formActa.get( "vfRuc"); }
  get vfEmpresa() { return this.formActa.get( "vfEmpresa"); }
  get vfTarjetaCirculacion() { return this.formActa.get( "vfTarjetaCirculacion"); }

  get vfPlaca() { return this.formActa.get( "vfPlaca"); }
  get vfTarjeta() { return this.formActa.get( "vfTarjeta"); }
  get vfAnioFabVehiculo() { return this.formActa.get("vfAnioFabVehiculo"); }
  get vfCategoriaVehiculo() { return this.formActa.get( "vfCategoriaVehiculo"); }
  get vfCheckedPropietario() { return this.formActa.get( "vfCheckedPropietario"); }
  get vfNombrePropietario() { return this.formActa.get( "vfNombrePropietario"); }

  get vfFechaInfraccion() { return this.formActa.get( "vfFechaInfraccion"); }
  get vfHoraInfraccion() { return this.formActa.get( "vfHoraInfraccion"); }
  // get vfCodInfraccion() { return this.formActa.get( "vfCodInfraccion"); }
  get vfConductaInfraccion() { return this.formActa.get( "vfConductaInfraccion"); }
  get vfLugarOcurrencia() { return this.formActa.get( "vfLugarOcurrencia"); }
  get vfObservacionInspector() { return this.formActa.get( "vfObservacionInspector"); }
  get vfObservacionConductor() { return this.formActa.get( "vfObservacionConductor"); }

  get vfDniAutoridad() { return this.formActa.get( "vfDniAutoridad"); }
  get vfNombreApellidoAutoridad() { return this.formActa.get( "vfNombreApellidoAutoridad"); }

  getActa(){
    this.actacontrolService.getActaById(this.idActaCapturado).subscribe( data =>{
      this.cActa = data;
      console.log(this.cActa[0].idINFRACCION);
      this.formActa.patchValue({vfNroActa: this.cActa[0].nroActa});
      this.formActa.patchValue({vfTipoDocIdentidadConductor: this.cActa[0].tipoDocumentoInfractor});
      this.formActa.patchValue({vfDniConductor: this.cActa[0].nroDocumentoInfractor});
      this.formActa.patchValue({vfApePatConductor: this.cActa[0].apellidoPaternoInfractor});
      this.formActa.patchValue({vfApeMatConductor: this.cActa[0].apellidoMaternoInfractor});
      this.formActa.patchValue({vfNombresConductor: this.cActa[0].nombresInfractor});
      this.formActa.patchValue({vfDireccionConductor: this.cActa[0].direccionInfractor});
      this.formActa.patchValue({vfLicenciaConductor: this.cActa[0].licenciaConducirInfractor});
      this.formActa.patchValue({vfClaseLicencia: this.cActa[0].claseLicenciaInfractor});
      this.formActa.patchValue({vfCategoriaLicencia: this.cActa[0].categoriaLicenciaInfractor});
      this.formActa.patchValue({vfRuc: this.cActa[0].ruc});
      this.formActa.patchValue({vfEmpresa: this.cActa[0].razonSocial});
      this.formActa.patchValue({vfTarjetaCirculacion: this.cActa[0].nroTarjetaCirculacion});
      this.formActa.patchValue({vfPlaca: this.cActa[0].placa});
      this.buscarVehiculo();
      this.formActa.patchValue({vfFechaInfraccion: this.cActa[0].fechaInfraccion});
      this.formActa.patchValue({vfHoraInfraccion: this.cActa[0].horaInfraccion});
      this.formActa.patchValue({vfCodInfraccion: this.cActa[0].idINFRACCION});
      this.formActa.patchValue({vfConductaInfraccion: this.cActa[0].conductaInfraccion});
      this.formActa.patchValue({vfLugarOcurrencia: this.cActa[0].lugarOcurrenciaInfraccion});
      this.formActa.patchValue({vfObservacionInspector: this.cActa[0].observacionInspector});
      this.formActa.patchValue({vfObservacionConductor: this.cActa[0].observacionConductor});
      this.formActa.patchValue({vfTipoDocIdentidadAutoridad: this.cActa[0].tipoDocumentoAutoridad});
      this.formActa.patchValue({vfDniAutoridad: this.cActa[0].nroDocumentoAutoridad});
      this.formActa.patchValue({vfNombreApellidoAutoridad: this.cActa[0].nombreCompletoAutoridad});
      this.formActa.patchValue({vfMedidaPreventida: this.cActa[0].idMEDIDAPREVENTIVA});
      
      
      
      

      this.validarCampoLicencia();
      this.validarCampoRuc();
    })
  }

  validarCampoLicencia(){
    if((this.cActa[0].licenciaConducirInfractor).length === 0 || this.cActa[0].licenciaConducirInfractor === null ){
      this.formActa.patchValue({vfCheckedLic: true});
      this.disabledLic();
    }else{
      this.formActa.patchValue({vfCheckedLic: false});
      this.disabledLic();
    }
  }

  validarCampoRuc(){
    if( this.cActa[0].ruc  === null ){
      this.formActa.patchValue({vfCheckedCirculacion: true});
      this.disabledPersJur();
    }else{
      this.formActa.patchValue({vfCheckedCirculacion: false});
      this.disabledPersJur();
    }
  }
  //Bloqueo de inputs mediante checkbox(tiene licencia o no)
 disabledLic(){
  if(this.vfCheckedLic.value === false || undefined){
    this.formActa.get('vfLicenciaConductor')?.enable();
    this.formActa.get('vfCategoriaLicencia')?.enable();
    this.formActa.get('vfClaseLicencia')?.enable();
  }else{
    this.formActa.controls['vfLicenciaConductor'].disable();
    this.formActa.controls['vfCategoriaLicencia'].disable();
    this.formActa.controls['vfClaseLicencia'].disable();
    // this.formActa.get('vfLicenciaConductor')?.disable();
    // this.formActa.get('vfCategoriaLicencia')?.disable();
    // this.formActa.get('vfClaseLicencia')?.disable();
    this.formActa.patchValue({vfLicenciaConductor: ''});
    this.formActa.patchValue({vfCategoriaLicencia: ''});
    this.formActa.patchValue({vfClaseLicencia: ''});
  }
}

disabledPersJur(){
  if(this.vfCheckedCirculacion.value === false || undefined ){
    this.formActa.get('vfRuc')?.enable();
    this.formActa.get('vfEmpresa')?.enable();
    this.formActa.get('vfTarjetaCirculacion')?.enable();
  }else{
    this.formActa.controls['vfRuc']?.disable();
    this.formActa.controls['vfEmpresa']?.disable();
    this.formActa.controls['vfTarjetaCirculacion']?.disable();
    // this.formActa.get('vfRuc')?.disable();
    // this.formActa.get('vfEmpresa')?.disable();
    // this.formActa.get('vfTarjetaCirculacion')?.disable();
    this.formActa.patchValue({vfRuc: ''});
    this.formActa.patchValue({vfEmpresa: ''});
    this.formActa.patchValue({vfTarjetaCirculacion: ''});
  }
}

propietario() {
  if(this.vfCheckedPropietario.value === false || undefined){
    this.formActa.patchValue({vfNombrePropietario: ''});
    this.formActa.get('vfNombrePropietario')?.enable();
  }else{
    this.formActa.patchValue({vfNombrePropietario: `${this.vfNombresConductor.value} ${this.vfApePatConductor.value} ${this.vfApeMatConductor.value}`});
    this.formActa.get('vfNombrePropietario')?.disable();
  }
}

getTipoDocumentoIdentidad() {
  this.tipodocumentoidentidadservice.getTipoDocumentos().subscribe(data => {
    this.tipoDocumentoIdentidadList = data;
    this.formActa.patchValue({ vfTipoDocIdentidadConductor: this.tipoDocumentoIdentidadList[0].idTIPODOCUMENTOIDENTIDAD});
    this.formActa.patchValue({ vfTipoDocIdentidadAutoridad: this.tipoDocumentoIdentidadList[0].idTIPODOCUMENTOIDENTIDAD});
  })
}

getAnios(){
this.anioFabricacionService.getAnios().subscribe(data =>{
  this.aniosList = data;
  this.formActa.patchValue({vfAnioFabVehiculo: this.aniosList[0].anios});
})
}

getTipoServicioVehiculo(){
  this.tiposerviciovehiculoService.getTiposServiciosVehiculo().subscribe( data =>{
    this.tipoServicioVehiculoList = data;
    this.formActa.patchValue({vfModalidadServicio: this.tipoServicioVehiculoList[0].idTIPOSERVICIOVEHICULO});
  })
}

getTipoVehiculo(){
  this.tipovehiculoService.getTipoVehiculos().subscribe( data =>{
    this.tipoVehiculoList = data;
    this.formActa.patchValue({vfTipoVehiculo: this.tipoVehiculoList[0].idTIPOVEHICULO })
  })
}

getCategoriaVehiculo(){
  this.categoriavehiculoService.getCategoriasVehiculos().subscribe( data =>{
    this.categoriaVehiculoList = data;
    this.formActa.patchValue({vfCategoriaVehiculo: this.categoriaVehiculoList[0].idCATEGORIAVEHICULO });
  })
}

getCodInfracciones(){
   this.infraccionService.getInfracciones().subscribe( data =>{
    this.codigoInfraccionList = data;
    this.formActa.patchValue({vfCodInfraccion:this.codigoInfraccionList[0].idINFRACCION });
   })
}

getMedidaPreventivas(){
  this.medidapreventivaService.getTMedidasPreventivas().subscribe( data =>{
    this.medidaPreventivaList = data;
    this.formActa.patchValue({vfMedidaPreventida: this.medidaPreventivaList[0].idMEDIDAPREVENTIVA});
  })
}

buscarEmpresa(){
  this.empresaService.getEmpresasByRuc(this.vfRuc.value).subscribe( data => {
    this.cEmpresa = data;
    this.formActa.patchValue({vfEmpresa: this.cEmpresa[0].razonSocial });
    this.idEmpresaCapturado = this.cEmpresa = this.cEmpresa[0].idEMPRESA;
  })
}

buscarVehiculo(){
  this.vehiculoService.getVehiculoByPlaca(this.vfPlaca.value).subscribe( data => {
    this.cVehiculo = data;
    this.formActa.patchValue({vfNombrePropietario: this.cVehiculo[0].propietario});
      this.formActa.patchValue({vfTarjeta: this.cVehiculo[0].nroTarjeta});
      this.formActa.patchValue({vfAnioFabVehiculo: this.cVehiculo[0].anioFabricacion});
      this.formActa.patchValue({vfModalidadServicio: this.cVehiculo[0].idTIPOSERVICIOVEHICULO});
      this.formActa.patchValue({vfTipoVehiculo: this.cVehiculo[0].idTIPOVEHICULO});
      this.formActa.patchValue({vfCategoriaVehiculo: this.cVehiculo[0].idCATEGORIAVEHICULO});
      this.idVehCapturado = this.cVehiculo[0].idVEHICULO;
  })
}

ModificarActa(){

}

}
