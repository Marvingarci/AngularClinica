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

  //graficas
  pesosPaciente: any;
  pulsosPaciente:any;
  alturasPaciente: any;
  temperaturasPaciente: any;
  presionesPaciente: any;

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

  obtenerCitasVigetentesPorPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/citas_vigentes/'+id_paciente,{headers:this.headers});


  }

  obtenerCitasPorPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/citas/'+id_paciente,{headers:this.headers});


  }

  obtenerEstadisticasPacientes(){

    return this.httpClient.get(this.API_ENDPOINT+'/contarPacientes',{headers:this.headers});

  }

  obtenerPesosPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/pesosPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerTodosPesosPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/todosPesosPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerPulsosPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/pulsosPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerTodosPulsosPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/todosPulsosPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerAlturasPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/alturasPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerTodasAlturasPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/todasAlturasPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerTemperaturasPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/temperaturasPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerTodasTemperaturasPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/todasTemperaturasPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerPresionesPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/presionesPaciente/'+ id_paciente,{headers:this.headers});

  }

  obtenerTodasPresionesPaciente(id_paciente){

    return this.httpClient.get(this.API_ENDPOINT+'/todasPresionesPaciente/'+ id_paciente,{headers:this.headers});

  }

  

  

}
