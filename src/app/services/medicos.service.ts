import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicos } from '../interfaces/medicos';


@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  idActualizar: number;
  datasourceService: any;
  API_ENDPOINT = 'http://127.0.0.1:8000/api'


  obtenerMedicos(){
    return this.httpClient.get(this.API_ENDPOINT+'/medicos');
  }


  obtenerMedico(id){
  
    return this.httpClient.get(this.API_ENDPOINT+'/obtenerMedico/'+ id);

  }

  constructor(private httpClient :HttpClient,medicosService:MedicosService) { }

  GuardarMedico(medicos:Medicos){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT+'/medicos',medicos,{headers:headers});
  }

  actualizarMedico(medicos: Medicos){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+'/medicos/'+medicos.id_medico,medicos,{headers:headers});
  }
  
  borrarMedico(id){      
    return this.httpClient.delete(this.API_ENDPOINT+'/medicos/'+id);
  }
}
