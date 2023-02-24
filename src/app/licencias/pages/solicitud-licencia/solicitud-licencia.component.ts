import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TipoDocumentoIdentidad } from 'src/app/common/models/tipodocumentoidentidad';
import { TipoDocumentoService } from '../../../common/services/tipo-documento.service';
import { TipoTramite, tipoTramiteList, CategoriaSolicitudList } from '../../models/solicitud.models';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { Img, Txt, Table } from 'pdfmake-wrapper/lib/definitions';

@Component({
  selector: 'app-solicitud-licencia',
  templateUrl: './solicitud-licencia.component.html',
  styleUrls: ['./solicitud-licencia.component.css']
})
export class SolicitudLicenciaComponent implements OnInit {

  formSolicitud: FormGroup;
  tipoDocumentoIdentidadList: TipoDocumentoIdentidad[];
  tipoTramite = tipoTramiteList;
  categoria = CategoriaSolicitudList;
  constructor(
    private fb: FormBuilder,
    private tipodocumentoidentidadservice: TipoDocumentoService
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.getTipoDocumentoIdentidad();
    this.formSolicitud.patchValue({ vfTramite: this.tipoTramite[0].id});
    this.formSolicitud.patchValue({ vfCategoria: this.categoria[0].id});
  }

  createForm(){
    this.formSolicitud = this.fb.group({
      vfApePat: ['', [Validators.required]],
      vfApeMat: ['', [Validators.required]],
      vfNombres: ['', [Validators.required]],
      vfDireccion: ['', [Validators.required]],
      vfTipoDoc: [],
      vfNroDoc: ['', [Validators.required]],
      vfFechaNac: ['', [Validators.required]],
      vfCel: ['', [Validators.required]],
      vfLicPri: [''],
      vfGrupoSan:['', [Validators.required]],
      vfTramite: [],
      vfCategoria: [],
      fechaExp:['', [Validators.required]],
    });
  }

  get vfApePat() { return this.formSolicitud.get( "vfApePat"); }
  get vfApeMat() { return this.formSolicitud.get( "vfApeMat"); }
  get vfNombres() { return this.formSolicitud.get( "vfNombres"); }
  get vfDireccion() { return this.formSolicitud.get( "vfDireccion"); }
  get vfNroDoc() { return this.formSolicitud.get( "vfNroDoc"); }
  get vfFechaNac() { return this.formSolicitud.get( "vfFechaNac"); }
  get vfCel() { return this.formSolicitud.get( "vfCel"); }
  get vfLicPri() { return this.formSolicitud.get( "vfLicPri"); }
  get vfGrupoSan() { return this.formSolicitud.get( "vfGrupoSan"); }
  get fechaExp() { return this.formSolicitud.get( "fechaExp"); }

  getTipoDocumentoIdentidad() {
    this.tipodocumentoidentidadservice.getTipoDocumentos().subscribe(data => {
      this.tipoDocumentoIdentidadList = data;
      this.formSolicitud.patchValue({ vfTipoDoc: this.tipoDocumentoIdentidadList[0].idTIPODOCUMENTOIDENTIDAD});
    })
  };

  generarPDF(){
   
  }


}
