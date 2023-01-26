import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ROOT_URL } from '../models/config';
import { Infraccion } from '../models/infraccion';

@Injectable({
  providedIn: 'root'
})
export class InfraccionService {

  apiUrl: string = ROOT_URL.concat("/infracciones");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  getInfracciones(){
    return this.http.get<Infraccion[]>(this.apiUrl);
  }
}
