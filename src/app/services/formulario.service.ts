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

  API_ENDPOINT = "http://127.0.0.1:8000/api/"

  headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private httpClient :HttpClient) {

   }
   put(paciente){
    const Headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.put(this.API_ENDPOINT+'/pacientes/'+ paciente.id_paciente , paciente, {headers: Headers});
  }

  guardarDatosGenerales(paciente: Paciente){
    return this.httpClient.post(this.API_ENDPOINT + 'pacientes', paciente, {headers: this.headers});
  };

  get(){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes');
  }
  getUno(paciente: number){
    const Headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.get(this.API_ENDPOINT+'pacientes/'+paciente);
  }

  guardarAntecedentesFamiliares(antecedente_familiar: AntecedentesFamiliares){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_familiares', antecedente_familiar, {headers: headers});
  };

  guardarAntecedentesPersonales(antecedente_personal: AntecedentesPersonales){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_personales', antecedente_personal, {headers: headers});
  };

  guardarHabitosToxicologicosPersonales(habito_toxicologico_personal: HabitosToxicologicosPersonales){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'habitos_toxicologicos_personales', habito_toxicologico_personal, {headers: headers});
  };

  guardarActividadSexual(actividad_sexual: ActividadSexual){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'actividad_sexual', actividad_sexual, {headers: headers});
  };

  guardarAntecedentesGinecologicos(antecedente_ginecologico: AntecedentesGinecologicos){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_ginecologicos', antecedente_ginecologico, {headers: headers});
  };

  guardarPlanificacionesFamiliares(planificacion_familiar: PlanificacionesFamiliares){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'planificaciones_familiares', planificacion_familiar, {headers: headers});
  };

  guardarAntecedentesObstetricos(antecedente_obstetrico: AntecedentesObstetricos){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'antecedentes_obstetricos', antecedente_obstetrico, {headers: headers});
  };
}
