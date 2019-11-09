import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicos } from '../interfaces/medicos';


@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  idActualizar: number;
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
  getMedico(){
    return this.httpClient.get(this.API_ENDPOINT+'/medicos');
  }

  constructor(private httpClient :HttpClient,medicosService:MedicosService) { }

  saveMedico(medicos:Medicos){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/medicos',medicos,{headers:headers});
  }

  put(medicos:Medicos){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+'/medicos/'+medicos.id,medicos,{headers:headers});
  }
  delete(id){      
  return this.httpClient.delete(this.API_ENDPOINT+'/medicos/'+id);
  }
}
