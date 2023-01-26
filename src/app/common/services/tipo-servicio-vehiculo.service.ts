import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { TipoServicioVehiculo } from '../models/tiposerviciovehiculo';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioVehiculoService {
  apiUrl: string = ROOT_URL.concat("/utilitarios");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getTiposServiciosVehiculo(){
    return this.http.get<TipoServicioVehiculo[]>(`${this.apiUrl}/tiposServiciosVehiculo`);
  }
}
