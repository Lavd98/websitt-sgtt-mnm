import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { CategoriaVehiculo } from '../models/categoriavehiculo';

@Injectable({
  providedIn: 'root'
})
export class CategoriaVehiculoService {
  apiUrl: string = ROOT_URL.concat("/utilitarios");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getCategoriasVehiculos(){
    return this.http.get<CategoriaVehiculo[]>(`${this.apiUrl}/categoriasVehiculo`);
  }
}
