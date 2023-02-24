import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ROOT_URL } from '../models/config';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl: string = ROOT_URL.concat("/empresas");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getAllEmpresas(){
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  getEmpresasByRuc(ruc: string){
    return this.http.get<Empresa>(`${this.apiUrl}/FilterByRuc/${ruc}`);
  }
}
