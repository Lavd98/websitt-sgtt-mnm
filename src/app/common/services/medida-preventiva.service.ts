import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from '../models/config';
import { MedidaPreventiva } from '../models/medidapreventiva';

@Injectable({
  providedIn: 'root'
})
export class MedidaPreventivaService {
  apiUrl: string = ROOT_URL.concat("/medidapreventivas");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getTMedidasPreventivas(){
    return this.http.get<MedidaPreventiva[]>(this.apiUrl);
  }
}
