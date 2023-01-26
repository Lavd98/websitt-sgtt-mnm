import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { TipoDocumentoIdentidad } from '../models/tipodocumentoidentidad';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  apiUrl: string = ROOT_URL.concat("/tipodocumentoidentidades");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getTipoDocumentos(){
    return this.http.get<TipoDocumentoIdentidad[]>(this.apiUrl);
  }
}
