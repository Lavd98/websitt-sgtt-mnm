import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from '../models/vehiculo';
import { ROOT_URL } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  apiUrl: string = ROOT_URL.concat("/vehiculos");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getVehiculoByPlaca(placa: string){
    return this.http.get<Vehiculo>(`${this.apiUrl}/FilterByPlaca/${placa}`)
  }
}
