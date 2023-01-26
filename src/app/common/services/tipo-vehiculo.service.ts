import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { TipoVehiculo } from '../models/tipovehiculo';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {
  apiUrl: string = ROOT_URL.concat("/utilitarios");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getTipoVehiculos(){
    return this.http.get<TipoVehiculo[]>(`${this.apiUrl}/tiposVehiculos`);
  }
}
