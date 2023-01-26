import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { Comisaria } from '../models/comisaria';

@Injectable({
  providedIn: 'root'
})
export class ComisariaService {
  apiUrl: string = ROOT_URL.concat("/utilitarios/comisarias");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getComisarias(){
    return this.http.get<Comisaria[]>(this.apiUrl);
  }
}
