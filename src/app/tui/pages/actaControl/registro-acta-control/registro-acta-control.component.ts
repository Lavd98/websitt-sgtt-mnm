import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TipoDocumentoService } from '../../../../common/services/tipo-documento.service';

import { TipoDocumentoIdentidad } from '../../../../common/models/tipodocumentoidentidad';
import { AnioFabricacionService } from '../../../../common/services/anio-fabricacion.service';
import { EmpresaService } from '../../../../common/services/empresa.service';
import { Empresa } from '../../../../common/models/empresa';
import { VehiculoService } from '../../../../common/services/vehiculo.service';
import { Vehiculo } from '../../../../common/models/vehiculo';
import { TipoServicioVehiculo } from '../../../../common/models/tiposerviciovehiculo';
import { TipoVehiculo } from 'src/app/common/models/tipovehiculo';
import { CategoriaVehiculo } from '../../../../common/models/categoriavehiculo';
import { TipoVehiculoService } from '../../../../common/services/tipo-vehiculo.service';
import { TipoServicioVehiculoService } from '../../../../common/services/tipo-servicio-vehiculo.service';
import { CategoriaVehiculoService } from '../../../../common/services/categoria-vehiculo.service';
import { Infraccion } from '../../../../common/models/infraccion';
import { InfraccionService } from '../../../../common/services/infraccion.service';
import { MedidaPreventivaService } from '../../../../common/services/medida-preventiva.service';
import { MedidaPreventiva } from '../../../../common/models/medidapreventiva';
import { ActaControl } from '../../../models/actacontrol';
import { ActaControlService } from '../../../services/acta-control.service';

@Component({
  selector: 'app-registro-acta-control',
  templateUrl: './registro-acta-control.component.html',
  styleUrls: ['./registro-acta-control.component.css']
})
export class RegistroActaControlComponent implements OnInit {
  formActa: FormGroup;

  disabledValue = true;
  cEmpresa: Empresa;
  cVehiculo: Vehiculo;
  cActa: ActaControl;

  aniosList = [];
  tipoDocumentoIdentidadList: TipoDocumentoIdentidad[];
  tipoServicioVehiculoList: TipoServicioVehiculo[];
  tipoVehiculoList: TipoVehiculo[];
  categoriaVehiculoList: CategoriaVehiculo[];
  codigoInfraccionList: Infraccion[];
  medidaPreventivaList: MedidaPreventiva[];

  idVehCapturado: number;
  idEmpresaCapturado: number;

  // tipoDoc
  fTipoDocIdentidad: String = "";
  
  // reniecDniResult: ReniecDniResult[];
  fTipoDocIdentidadPropietario: String = "";
  fTipoDocIdentidadAutoridad: String = "";
  //Departamento
  fDepartamentoInfractor: String = "";
  // listaUbigeo!: ubigeo[];
  //Provincia
  fProvinciaInfractor: String = "";
  // listaProvincia: ubigeo[];
  //Distrito
  // listaDistrito: ubigeo[];
  fDistritoInfractor: String = "";
  //onchage1 departamento - provincia
  vdepartamento: string = "000000";
  //onchage2 provincia -departamento
  vprovincia: string = "000000";
  //Año de fabricación
  fAnioFabVehiculo!: string;
  // listaAnioFabricacion: AnioFabricacion[];
  //Grupo Infracción
  fgrupoInfraccion: String = "";
  // listaGrupoInfraccion: GrupoInfraccion[];
  //Año Infraccion
  fanioInfraccion!: string;
  // listaAnioInfraccion: AnioFabricacion[];
  //Infracción por año
  // listaInfraccion: Infraccion[];
  fInfraccion!: string;
  //FechaInfraccion
  ffechaInfraccion!: string;
  //Distrito de Infracción
  fDistritoInfraccion: String = "";
  // listaDistritoInfraccion: ubigeo[];

  // listaClaseCategoria: claseCategoria[];
  // listaCategoria: claseCategoria[];

  //Observació
  fObservacion!: string;
  //Registro persona natural
  respuesta!: string;
  fdniConductor: String = "";
  //Buscar DNI - CARGAR DATOS PERSONA
  // infractor: infractorInfraccion;
  fapepat: String = "";
  fapemat: String = "";
  fnombres: String = "";
  fDireccionInfractor: String = "";
  fLicenciaInfractor: String = "";
  vdistrito: string = "000000";
  fidInfractor!: number;
  //CARGAR DATOS VEHICULO
  respuestaVehiculo!: string;
  fplaca: String = "";
  fColor!: string;
  fNombrePropietario: String = "";
  fidVehiculo!: number;
  fMarca!: string;
  fModelo!: string;
  //Documento propietario
  fDniPropietario: String = "";
  fDireccionPropietario: String = "";
  //Autoridad que interviene
  fNombreAutoridad: String = "";
  fDniAutoridad: String = "";
  fDireccionAutoridad: String = "";
  //Registrar Acta de Control
  // pacta: ActaControl;
  fNroActa!: string;
  fclase!: string;
  fcategoria!: string;
  fesPropietario!: boolean;
  ftieneLicencia!: boolean;
  fIdinspector!: number;
  vgrupoinfraccion: number = 3;
  d!: Date;
  fechamax!: string;
  file!: string;

  vestadoCivil: string = "";
  vrestriccion: string = "";

  constructor(
    private fb: FormBuilder,
    private tipodocumentoidentidadservice: TipoDocumentoService,
    private anioFabricacionService: AnioFabricacionService,
    private empresaService: EmpresaService,
    private vehiculoService: VehiculoService,
    private tiposerviciovehiculoService: TipoServicioVehiculoService,
    private tipovehiculoService: TipoVehiculoService,
    private categoriavehiculoService: CategoriaVehiculoService,
    private infraccionService: InfraccionService,
    private medidapreventivaService: MedidaPreventivaService,
    private actacontrolService: ActaControlService
  )
  {
    this.createForm();
    this.cEmpresa = new Empresa();
    this.cVehiculo = new Vehiculo();
    this.cActa = new ActaControl()
  }

  ngOnInit(): void {
    this.createForm();
    this.getTipoDocumentoIdentidad();
    this.getAnios();
    this.getTipoServicioVehiculo();
    this.getTipoVehiculo();
    this.getCategoriaVehiculo();
    this.getCodInfracciones();
    this.getMedidaPreventivas();

    // this.d = new Date();
    // this.fechamax = this.d.getFullYear() + "-" + ((this.d.getMonth() + 1).toString().length == 2 ? (this.d.getMonth() + 1).toString() : "0" + (this.d.getMonth() + 1).toString()) + "-" + (this.d.getDate().toString().length == 2 ? this.d.getDate().toString() : "0" + this.d.getDate().toString());
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
      vfAnioFabVehiculo: [],
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
    // this.formActa = new FormGroup({
    //   vfNroActa: new FormControl('', [Validators.required]),

    //   vfTipoDocIdentidadConductor: new FormControl(),
    //   vfDniConductor: new FormControl('', [Validators.required]),
    //   vfApePatConductor: new FormControl('', [Validators.required]),
    //   vfApeMatConductor: new FormControl('', [Validators.required]),
    //   vfNombresConductor: new FormControl('', [Validators.required]),
    //   vfDireccionConductor: new FormControl('', [Validators.required]),
    //   vfCheckedLic: new FormControl(false),
    //   vfLicenciaConductor: new FormControl('', [Validators.required]),
    //   vfClaseLicencia: new FormControl('', [Validators.required]),
    //   vfCategoriaLicencia: new FormControl('', [Validators.required]),

    //   vfCheckedCirculacion: new FormControl(false),
    //   vfRuc: new FormControl('', [Validators.required]),
    //   vfEmpresa: new FormControl('', [Validators.required]),
    //   vfTarjetaCirculacion: new FormControl('', [Validators.required]),

    //   vfPlaca: new FormControl('', [Validators.required]),
    //   vfTarjeta: new FormControl('', [Validators.required]),
    //   vfAnioFabVehiculo: new FormControl(),
    //   vfModalidadServicio: new FormControl(),
    //   vfTipoVehiculo: new FormControl(),
    //   vfCategoriaVehiculo: new FormControl(),
    //   vfCheckedPropietario: new FormControl(false),
    //   vfNombrePropietario: new FormControl('', [Validators.required]),

    //   vfFechaInfraccion: new FormControl('', [Validators.required]),
    //   vfHoraInfraccion: new FormControl('', [Validators.required]),
    //   vfCodInfraccion: new FormControl(),
    //   vfConductaInfraccion: new FormControl('', [Validators.required]),
    //   vfLugarOcurrencia: new FormControl('', [Validators.required]),
    //   vfObservacionInspector: new FormControl(''),
    //   vfObservacionConductor: new FormControl(''),

    //   vfTipoDocIdentidadAutoridad: new FormControl(),
    //   vfDniAutoridad: new FormControl('', [Validators.required]),
    //   vfNombreApellidoAutoridad: new FormControl('', [Validators.required]),
    //   vfMedidaPreventida: new FormControl(),
    // })
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
  get vfCategoriaVehiculo() { return this.formActa.get( "vfCategoriaVehiculo"); }
  get vfCheckedPropietario() { return this.formActa.get( "vfCheckedPropietario"); }
  get vfNombrePropietario() { return this.formActa.get( "vfNombrePropietario"); }

  get vfFechaInfraccion() { return this.formActa.get( "vfFechaInfraccion"); }
  get vfHoraInfraccion() { return this.formActa.get( "vfHoraInfraccion"); }
  get vfConductaInfraccion() { return this.formActa.get( "vfConductaInfraccion"); }
  get vfLugarOcurrencia() { return this.formActa.get( "vfLugarOcurrencia"); }
  get vfObservacionInspector() { return this.formActa.get( "vfObservacionInspector"); }
  get vfObservacionConductor() { return this.formActa.get( "vfObservacionConductor"); }

  get vfDniAutoridad() { return this.formActa.get( "vfDniAutoridad"); }
  get vfNombreApellidoAutoridad() { return this.formActa.get( "vfNombreApellidoAutoridad"); }
  

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
      this.idVehCapturado = this.cVehiculo[0].idVEHICULO;
    })
  }



  LimpiarInfractor() {
    this.formActa.patchValue({ vfnombres: '' });
    this.formActa.patchValue({ vfapepat: '' });
    this.formActa.patchValue({ vfapemat: '' });
    //this.angForm.patchValue({ vfUbigeo: '' });
    // this.ubigeoCapturado = "";
    // this.initialUbigeo = "";
    this.formActa.patchValue({ vfDireccionInfractor: '' });
    this.formActa.patchValue({ vfLicenciaInfractor: '' });
    this.formActa.patchValue({ vfclase: '' });
    this.formActa.patchValue({ vfcategoria: '' });
  }

  getTipoDocumentoIdentidad() {
    this.tipodocumentoidentidadservice.getTipoDocumentos().subscribe(data => {
      this.tipoDocumentoIdentidadList = data;
      this.formActa.patchValue({ vfTipoDocIdentidadConductor: this.tipoDocumentoIdentidadList[0].idTIPODOCUMENTOIDENTIDAD});
      this.formActa.patchValue({ vfTipoDocIdentidadAutoridad: this.tipoDocumentoIdentidadList[0].idTIPODOCUMENTOIDENTIDAD});
    })
  }

  getVehiculo() {
    // this.LimpiarVehiculo();
    // this.vehiculoService.getByPlaca(this.angForm.value.vfplaca).subscribe(data => {
    //   this.angForm.patchValue({ vfNombrePropietario: data.propietario1.concat(" " + data.propietario2) });
    //   this.angForm.patchValue({ vfAnioFabVehiculo: data.anioFabricacion });
    //   this.angForm.patchValue({ vfDireccionPropietario: data.direccionPropietario });
    //   this.fidVehiculo = Number(data.idVehiculo);
    // })

  }


  RegistrarActa() {
    if(this.formActa.valid){
      if( (this.formActa.controls['vfNroActa'].value).length <= 6 ){
        if( this.idVehCapturado != null && this.idVehCapturado != 0 ){
          //Aniadir 0 a la izquierda del nro de Acta
          let n1 = this.formActa.controls['vfNroActa'].value;
          let nroActaFormat = n1.padStart(6,'0');

          this.cActa.nroActa = nroActaFormat;

          this.cActa.tipoDocumentoInfractor = this.formActa.value.vfTipoDocIdentidadConductor;
          this.cActa.nroDocumentoInfractor = this.formActa.value.vfDniConductor;
          this.cActa.apellidoPaternoInfractor =  this.formActa.value.vfApePatConductor == null ? "" : this.formActa.value.vfApePatConductor;
          this.cActa.apellidoMaternoInfractor = this.formActa.value.vfApeMatConductor == null ? "" : this.formActa.value.vfApeMatConductor;
          this.cActa.nombresInfractor = this.formActa.value.vfNombresConductor == null ? "" : this.formActa.value.vfNombresConductor;
          this.cActa.direccionInfractor = this.formActa.value.vfDireccionConductor == null ? "" : this.formActa.value.vfDireccionConductor;
          this.cActa.licenciaConducirInfractor = this.formActa.value.vfLicenciaConductor == null ? "" : this.formActa.value.vfLicenciaConductor;
          this.cActa.claseLicenciaInfractor = this.formActa.value.vfClaseLicencia == null ? "" : this.formActa.value.vfClaseLicencia;
          this.cActa.categoriaLicenciaInfractor = this.formActa.value.vfCategoriaLicencia == null ? "" : this.formActa.value.vfCategoriaLicencia;

          this.cActa.idEMPRESA = this.idEmpresaCapturado == null ? Number('') : this.idEmpresaCapturado;
          this.cActa.nroTarjetaCirculacion = this.formActa.value.vfTarjetaCirculacion == null ? "" : this.formActa.value.vfTarjetaCirculacion;

          this.cActa.idVEHICULO = this.idVehCapturado;

          this.cActa.fechaInfraccion = this.formActa.value.vfFechaInfraccion == null ? "" : this.formActa.value.vfFechaInfraccion;
          this.cActa.horaInfraccion = this.formActa.value.vfHoraInfraccion == null ? "" : this.formActa.value.vfHoraInfraccion;
          this.cActa.idINFRACCION = this.formActa.value.vfCodInfraccion;
          this.cActa.conductaInfraccion = this.formActa.value.vfConductaInfraccion == null ? "" : this.formActa.value.vfConductaInfraccion;
          this.cActa.lugarOcurrenciaInfraccion = this.formActa.value.vfLugarOcurrencia == null ? "" : this.formActa.value.vfLugarOcurrencia;
          this.cActa.observacionInspector = this.formActa.value.vfObservacionInspector == null ? "" : this.formActa.value.vfObservacionInspector;
          this.cActa.observacionConductor = this.formActa.value.vfObservacionConductor == null ? "" : this.formActa.value.vfObservacionConductor;

          this.cActa.tipoDocumentoAutoridad = this.formActa.value.vfTipoDocIdentidadAutoridad;
          this.cActa.nroDocumentoAutoridad = this.formActa.value.vfDniAutoridad == null ? "" : this.formActa.value.vfDniAutoridad;
          this.cActa.nombreCompletoAutoridad = this.formActa.value.vfNombreApellidoAutoridad == null ? "" : this.formActa.value.vfNombreApellidoAutoridad;

          this.cActa.idMEDIDAPREVENTIVA = this.formActa.value.vfMedidaPreventida;

          this.cActa.estado = true;

          this.actacontrolService.addActaControl(this.cActa).subscribe( res =>{
            alert('Registrado Correctamente');
            this.formActa.reset();
            this.ngOnInit();
          }),
          error => {
                      alert("No se ha registrado");
                      console.log("Error Occured " + error);
                    }

          console.log(this.cActa)
        }else{
          alert("Debe registrar los datos del vehículo");
        }
      }else{
        alert("Debe ingresar el formato correcto de la papeleta, con 6 dígitos");
      }
    }else{
      alert('Debe ingresar todos los campos solicitados')
    }
    // if (this.angForm.valid) {

    //   //vfNroActa
    //   if (this.angForm.value.vfNroActa.toString().length <= 6) {

    //     if (this.fidVehiculo != null && this.fidVehiculo != 0) {

    //       var n1 = this.angForm.value.vfNroActa.toString();
    //       var zerofilled = ('000000' + n1).slice(-6);
    //       console.log(zerofilled);

    //       //this.angForm.value.vfTipoDocIdentidad 
    //       this.pacta.usuariocrea = localStorage.getItem('username');

    //       this.pacta.idTipDocIde = Number(this.angForm.value.vfTipoDocIdentidad);
    //       this.pacta.idActCon = 0;
    //       this.pacta.nroPapeleta = "" + zerofilled;
    //       this.pacta.idInfractor = this.fidInfractor = 0;
    //       //this.pacta.idUbigeoInfractor = this.angForm.value.vfUbigeo == null ? "" : this.angForm.value.vfUbigeo;
    //       this.pacta.idUbigeoInfractor = this.ubigeoCapturado == null ? "" : this.ubigeoCapturado;

    //       this.pacta.numdocInfractor = this.angForm.value.vfdniConductor == null ? "" : this.angForm.value.vfdniConductor;
    //       this.pacta.nombreInfractor = this.angForm.value.vfnombres + " " + this.angForm.value.vfapepat + " " + this.angForm.value.vfapemat;
    //       this.pacta.direccioninfractor = this.angForm.value.vfDireccionInfractor == null ? "" : this.angForm.value.vfDireccionInfractor;

    //       this.pacta.nomInfractor = this.angForm.value.vfnombres == null ? "" : this.angForm.value.vfnombres;
    //       this.pacta.apepatInfractor = this.angForm.value.vfapepat == null ? "" : this.angForm.value.vfapepat;
    //       this.pacta.apematInfractor = this.angForm.value.vfapemat == null ? "" : this.angForm.value.vfapemat;

    //       this.pacta.idVehiculo = this.fidVehiculo;
    //       this.pacta.propietario1 = this.angForm.value.vfNombrePropietario == null ? "" : this.angForm.value.vfNombrePropietario;
    //       this.pacta.lugarOcurrencia = this.angForm.value.vfLugarOcurrencia == null ? "" : this.angForm.value.vfLugarOcurrencia;
    //       this.pacta.boletaInternamiento = this.angForm.value.vfBoletaInternamiento == null ? "" : this.angForm.value.vfBoletaInternamiento;

    //       this.pacta.direccionPropietario = this.angForm.value.vfDireccionPropietario == null ? "" : this.angForm.value.vfDireccionPropietario;
    //       this.pacta.idInfraccion = Number(this.angForm.value.vfInfraccion);
    //       this.pacta.tieneLicencia = this.angForm.value.vftieneLicencia;
    //       this.pacta.esPropietario = true;
    //       this.pacta.licencia = this.angForm.value.vfLicenciaInfractor;
    //       this.pacta.clase = this.angForm.value.vfclase;
    //       this.pacta.categoria = this.angForm.value.vfcategoria;
    //       this.pacta.fechaInfraccion = this.angForm.value.vffechaInfraccion;
    //       this.pacta.idDistritoOcurrencia = this.angForm.value.vfDistritoInfraccion;
    //       this.pacta.retencion = false;
    //       this.pacta.idInspector = this.fIdinspector;
    //       this.pacta.fechaFijaRet = this.angForm.value.vffechaInfraccion == null ? "1900-01-01" : this.angForm.value.vffechaInfraccion;
    //       this.pacta.obsActa = this.angForm.value.vfObservacion == null ? "" : this.angForm.value.vfObservacion;
    //       this.pacta.estado = true;
    //       this.pacta.pagado = 0.0;
    //       this.pacta.respCompartida = false;
    //       this.pacta.horaInfraccion = this.angForm.value.vfhoraInfraccion == null ? "00:00:00" : this.angForm.value.vfhoraInfraccion;
    //       this.pacta.codigo = this.angForm.value.vfDniAutoridad == null ? "" : this.angForm.value.vfDniAutoridad;
    //       this.pacta.nomInspector = this.angForm.value.vfNombreAutoridad == null ? "" : this.angForm.value.vfNombreAutoridad;

    //       this.pacta.ruc = this.angForm.value.vfRuc == null ? "" : this.angForm.value.vfRuc;
    //       this.pacta.empresa = this.angForm.value.vfEmpresa == null ? "" : this.angForm.value.vfEmpresa;
    //       this.pacta.digital = this.pacta.digital == null ? "" : this.pacta.digital;

    //       this.pacta.estadoCivil = this.vestadoCivil == null ? "" : this.vestadoCivil;
    //       this.pacta.restriccion = this.vrestriccion == null ? "" : this.vrestriccion;

    //       console.log(this.pacta);

    //       this.actaControlService.AddActaControl(this.pacta).subscribe(res => {
    //         alert("Registrado correctamente");
    //       })
    //         , err => {
    //           alert("No se ha registrado");
    //           console.log("Error Occured " + err);
    //         }
    //     }
    //     else
    //       alert("Debe registrar los datos del vehículo");
    //   }
    //   else
    //     alert("Debe ingresar el formato correcto de la papeleta, con 6 dígitos");
    // }
    // else {
    //   alert("Debe ingresar todos los campos solicitados");
    // }
  }


  // public cargandoImagen(event) {

  //   console.log(event.target.files[0].name);
  //   this.file = event.target.files[0].name;
  //   this.pacta.digital = event.target.files[0].name;

  //   this.actaControlService.UploadFiles(event.target.files[0]).subscribe(res => {
  //     console.log(res);

  //     alert("Registrado correctamente");
  //   })
  //     , err => {
  //       console.log("Error Occured " + err);
  //     }

  // }

  limpiar() {

    // this.pacta.idActCon = 0;
    // this.angForm.patchValue({ vfNroActa: "" });
    // //this.angForm.patchValue({ vfUbigeo: "" });
    // this.ubigeoCapturado = "";
    // this.initialUbigeo = "";

    // this.angForm.patchValue({ vfdniConductor: "" });
    // this.angForm.patchValue({ vfnombres: "" });
    // this.angForm.patchValue({ vfapepat: "" });
    // this.angForm.patchValue({ vfapemat: "" });
    // this.angForm.patchValue({ vfDireccionInfractor: "" });
    // this.angForm.patchValue({ vfNombrePropietario: "" });
    // this.angForm.patchValue({ direccionPropietario: "" });
    // this.angForm.patchValue({ vfLicenciaInfractor: null });
    // this.angForm.patchValue({ vfLicenciaInfractor: "" });
    // this.angForm.patchValue({ vfclase: "" });
    // this.angForm.patchValue({ vfcategoria: "" });
    // this.angForm.patchValue({ vffechaInfraccion: "" });
    // this.angForm.patchValue({ vfDniAutoridad: "" });
    // this.angForm.patchValue({ vfNombreAutoridad: "" });
    // this.angForm.patchValue({ vfObservacion: "" });
    // this.angForm.patchValue({ vfhoraInfraccion: "" });

    // this.angForm.patchValue({ vfplaca: "" });
    // this.angForm.patchValue({ vfRuc: "" });
    // this.angForm.patchValue({ vfEmpresa: "" });

    // this.pacta.digital = null;

    // this.angForm.patchValue({ vfAnioFabVehiculo: this.listaAnioFabricacion[0].anioFabricacion });
    // this.angForm.patchValue({ vfInfraccion: this.listaInfraccion[0].idInfraccion });
    // this.angForm.patchValue({ vfDistritoInfraccion: this.listaDistritoInfraccion[0].idUbigeo });

  }


  public download() {

    // this.actaControlService.downloadFile(this.file).subscribe(
    //   data => {
    //     switch (data.type) {
    //       case HttpEventType.DownloadProgress:

    //         break;
    //       case HttpEventType.Response:

    //         const downloadedFile = new Blob([data.body], { type: data.body.type });
    //         const a = document.createElement('a');
    //         a.setAttribute('style', 'display:none;');
    //         document.body.appendChild(a);
    //         a.download = this.file;
    //         a.href = URL.createObjectURL(downloadedFile);
    //         a.target = '_blank';
    //         a.click();
    //         document.body.removeChild(a);
    //         break;
    //     }
    //   },
    //   error => {

    //   }
    // );
  }

  BuscarPagado() {

    // this.papeletaInfraccionService.GetByIDPago(this.angForm.value.vfNroActa, 2).subscribe((tempdate) => {

    //   console.log(tempdate);
    //   if (tempdate.idPapInf > 0 && tempdate.pagado > 0)
    //     alert("**** LA PAPELETA SE ENCUENTRA REGISTRADA Y PAGADA ******\n" + "OBS: "
    //       + tempdate.obsPapeleta + "\n" + "FECHA: " + tempdate.fechaInfraccion + "\n MONTO: S/." + tempdate.pagado
    //       + "\n ADMINISTRADO: " + tempdate.cliente);
    //   else if (tempdate.idPapInf > 0 && tempdate.pagado == 0)
    //     alert("**** LA PAPELETA SE ENCUENTRA REGISTRADA Y NO PAGADA ******\n" + "");

    // })
    //   , err => {
    //     console.log(err);
    //   }

  }
}
