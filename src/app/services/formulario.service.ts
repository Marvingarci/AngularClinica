import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../interfaces/paciente';
import { AntecedentesFamiliares } from '../interfaces/antecedentes-familiares';
import { AntecedentesPersonales } from '../interfaces/antecedentes-personales';
import { HabitosToxicologicosPersonales } from '../interfaces/habitos-toxicologicos-personales';
import { ActividadSexual } from '../interfaces/actividad-sexual';
import { AntecedentesGinecologicos } from '../interfaces/antecedentes-ginecologicos';
import { PlanificacionesFamiliares } from '../interfaces/planificaciones-familiares';
import { AntecedentesObstetricos } from '../interfaces/antecedentes-obstetricos';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  idActualizar: number;
  IngresoPaciente: Paciente;
  NuevoIngreso: Paciente;
  esAlumno: boolean = true;
  API_ENDPOINT = "http://127.0.0.1:8000/api/"

  headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient :HttpClient) {

   }

   
   actualizarPaciente(paciente: Paciente){
    return this.httpClient.put(this.API_ENDPOINT+'pacientes/'+ paciente.id_paciente , paciente, {headers: this.headers});
  }

  guardarDatosGenerales(paciente: Paciente){
    return this.httpClient.post(this.API_ENDPOINT + 'pacientes', paciente, {headers: this.headers});
  };

  get(){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes');
  }

  getUltimoID(){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes/ultimo/si');
  }

  getScrap(){
    return this.httpClient.get(this.API_ENDPOINT+'login');
  }
  
  getUno(paciente: number){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes/'+paciente);
  }

  getPaciente(){
    return this.httpClient.get(this.API_ENDPOINT + 'pacientes');
  }

  guardarAntecedentesFamiliares(antecedente_familiar: AntecedentesFamiliares){
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_familiares', antecedente_familiar, {headers: this.headers});
  };

  guardarAntecedentesPersonales(antecedente_personal: AntecedentesPersonales){
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_personales', antecedente_personal, {headers: this.headers});
  };

  guardarHabitosToxicologicosPersonales(habito_toxicologico_personal: HabitosToxicologicosPersonales){
    return this.httpClient.post(this.API_ENDPOINT + 'habitos_toxicologicos_personales', habito_toxicologico_personal, {headers: this.headers});
  };

  guardarActividadSexual(actividad_sexual: ActividadSexual){
    return this.httpClient.post(this.API_ENDPOINT + 'actividad_sexual', actividad_sexual, {headers: this.headers});
  };

  guardarAntecedentesGinecologicos(antecedente_ginecologico: AntecedentesGinecologicos){
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_ginecologicos', antecedente_ginecologico, {headers: this.headers});
  };

  guardarPlanificacionesFamiliares(planificacion_familiar: PlanificacionesFamiliares){
    return this.httpClient.post(this.API_ENDPOINT + 'planificaciones_familiares', planificacion_familiar, {headers: this.headers});
  };

  guardarAntecedentesObstetricos(antecedente_obstetrico: AntecedentesObstetricos){
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_obstetricos', antecedente_obstetrico, {headers: this.headers});
  };
}
