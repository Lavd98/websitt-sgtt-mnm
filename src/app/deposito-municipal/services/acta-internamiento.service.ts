import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from 'src/app/common/models/config';
import { ActaInternamiento } from '../models/actainternamiento';

@Injectable({
  providedIn: 'root'
})
export class ActaInternamientoService {

  apiUrl: string = ROOT_URL.concat("/actainternamientos");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http:HttpClient
  ) { }

  addActaInternamiento(actaInternamiento: ActaInternamiento){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ActaInternamiento>(this.apiUrl, actaInternamiento, {headers});
  }

}
