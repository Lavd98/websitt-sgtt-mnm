import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { InventarioVehiculo } from '../models/inventariovehiculo';

@Injectable({
  providedIn: 'root'
})
export class InventarioVehiculoService {
  
  apiUrl: string = ROOT_URL.concat("/utilitarios/inventarioVehiculo");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getInventarioVehiculoBySeccion(seccion: number){
    return this.http.get<InventarioVehiculo[]>(`${this.apiUrl}/FilterBySeccion/${seccion}`);
  }
}
