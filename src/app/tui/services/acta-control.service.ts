import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROOT_URL } from 'src/app/common/models/config';
import { ActaControl } from '../models/actacontrol';

@Injectable({
  providedIn: 'root'
})
export class ActaControlService {

  apiUrl: string = ROOT_URL.concat("/actacontroles");
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http:HttpClient
  ) { }

  addActaControl(actaControl: ActaControl){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ActaControl>(this.apiUrl, actaControl, {headers});
  }

  getActas(){
    return this.http.get<ActaControl[]>(this.apiUrl);
  }

  getActaById(id: number){
    return this.http.get<ActaControl>(`${this.apiUrl}/${id}`);
  }

  getActaByNro(nroActa: string){
    return this.http.get<ActaControl>(`${this.apiUrl}/FilterByTerm/${nroActa}`)
  }

  getActasByTerm(term: string){
    return this.http.get<ActaControl[]>(`${this.apiUrl}/FilterByTerm/${term}`)
  }

  
  setEstado(id: number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<ActaControl>(`${this.apiUrl}/setEstado/${id}`, {headers});
  }

}
