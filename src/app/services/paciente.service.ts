import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventario } from '../interfaces/inventario';
import { HistoriaSubsiguiente } from "../interfaces/historia_subsiguiente";
import { Cita } from '../interfaces/cita';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  id_historia_subsiguiente: any;
  imagenactual: string;
  API_ENDPOINT = 'http://127.0.0.1:8000/api'
  sihayimagen: boolean = false;

   headers = new HttpHeaders({'Content-Type':'application/json'});

 
  constructor(private httpClient :HttpClient) { }
 

  guardarHistoriaSubsiguiente(historia_subsiguiente: HistoriaSubsiguiente){
    return this.httpClient.post(this.API_ENDPOINT+'/historias_subsiguientes',historia_subsiguiente,{headers:this.headers});
  }
  
  obtenerHistoriaSubsiguiente(id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'/historias_subsiguientes/'+id_paciente);
  }
  // Obtener las citas diarias para consolidado  
  obtenerHistoriasSubsiguientes(){
    return this.httpClient.get(this.API_ENDPOINT+'/historias_subsiguientes');
  }

  ActualizarImagen(datos){
    
    return this.httpClient.post(this.API_ENDPOINT+'/pacientes/actualizarImagen',datos, {headers: this.headers});
  }

  guardarCita(cita: Cita){

    return this.httpClient.post(this.API_ENDPOINT+'/citas',cita,{headers:this.headers});

  }

  obtenerCitas(){

    return this.httpClient.get(this.API_ENDPOINT+'/citas',{headers:this.headers});


  }

  obtenerEstadisticasPacientes(){

    return this.httpClient.get(this.API_ENDPOINT+'/contarPacientes',{headers:this.headers});

  }

}
