import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from 'src/app/common/models/config';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  apiUrl: string = ROOT_URL.concat("/vehiculos");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  addVehiculo(vehiculo: Vehiculo){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Vehiculo>(this.apiUrl, vehiculo, {headers});
  }

  getVehiculoByPlaca(placa: string){
    return this.http.get<Vehiculo>(`${this.apiUrl}/FilterByPlaca/${placa}`)
  }
}
