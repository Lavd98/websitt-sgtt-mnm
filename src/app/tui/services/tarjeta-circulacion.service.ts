import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from 'src/app/common/models/config';
import { TarjetaCirculacion } from '../models/tarjetacirculacion';

@Injectable({
  providedIn: 'root'
})
export class TarjetaCirculacionService {
  apiUrl: string = ROOT_URL.concat("/tarjetacirculaciones");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http:HttpClient
  ) { }

  addTarjeta(tarjetacirculacion: TarjetaCirculacion){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<TarjetaCirculacion>(this.apiUrl, tarjetacirculacion, {headers});
  }

}
