import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { Anio } from '../models/anio';

@Injectable({
  providedIn: 'root'
})
export class AnioFabricacionService {

  apiUrl: string = ROOT_URL.concat("/utilitarios");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getAnios(){
    return this.http.get<Anio[]>(`${this.apiUrl}/aniosFabricacion`);
  }
}
