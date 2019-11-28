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
// import { PruebaPaciente } from '../interfaces/prueba-paciente';
import { PacienteAntecedenteFamiliar } from '../interfaces/paciente-antecedente-familiar';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  idActualizar: number;
  IngresoPaciente: Paciente;
  NuevoIngreso: Paciente;
  esAlumno: boolean = true;

  headers = new HttpHeaders({'Content-Type':'application/json'});
  API_ENDPOINT = "http://127.0.0.1:8000/api/"


  constructor(private httpClient :HttpClient) {

   }

   ultimoIdAntecedente(){
     return this.httpClient.get(this.API_ENDPOINT+'ultimoIdAntecedente');
   }

  enviarPruebaPaciente(paciente_antecedente_familiar: PacienteAntecedenteFamiliar){
    return this.httpClient.post(this.API_ENDPOINT+'pacientes_antecedentes_familiares',
    paciente_antecedente_familiar, 
    {headers: this.headers});
  }


  enviarEnfermedad(enfermedad: any){

    return this.httpClient.post(this.API_ENDPOINT+'enfermedades', enfermedad, {headers: this.headers});

  }

  enviarTipoEnfermedad(tipo_enfermedad: any){

    return this.httpClient.post(this.API_ENDPOINT+'tipos_enfermedades', tipo_enfermedad, {headers: this.headers});

  }



  enviarParentescos(){

  }

   
   actualizarPaciente(paciente: Paciente){
    return this.httpClient.put(
      this.API_ENDPOINT+'pacientes/'+ paciente.id_paciente, 
      paciente, 
      {headers: this.headers}
    );
  }

  actualizarAntecedenteFamiliar(antecedente_familiar: AntecedentesFamiliares){
    return this.httpClient.put(
      this.API_ENDPOINT+'antecedentes_familiares/'+ antecedente_familiar.id_paciente, 
      antecedente_familiar, 
      {headers: this.headers}
    );
  }

  actualizarAntecedentePersonal(antecedente_personal: AntecedentesPersonales){
    return this.httpClient.put(
      this.API_ENDPOINT+'antecedentes_personales/'+ antecedente_personal.id_paciente,
      antecedente_personal, 
      {headers: this.headers}
    );
  }

  actualizarHabitoToxicologico(habito_toxicologico_personal: HabitosToxicologicosPersonales){
    return this.httpClient.put(
      this.API_ENDPOINT+'habitos_toxicologicos_personales/'+ habito_toxicologico_personal.id_paciente,
      habito_toxicologico_personal,
      {headers: this.headers}  
    );
  }

  actualizarActividadSexual(actividad_sexual: ActividadSexual){
    return this.httpClient.put(
      this.API_ENDPOINT+'actividad_sexual/'+ actividad_sexual.id_paciente,
      actividad_sexual,
      {headers: this.headers}  
    );
  }

  actualizarAntecedenteGinecologico(antecedente_ginecologico: AntecedentesGinecologicos){
    return this.httpClient.put(
      this.API_ENDPOINT+'antecedentes_ginecologicos/'+ antecedente_ginecologico.id_paciente,
      antecedente_ginecologico,
      {headers: this.headers}
    );
  }

  actualizarAntecedenteObstetrico(antecedente_obstetrico: AntecedentesObstetricos){
    return this.httpClient.put(
      this.API_ENDPOINT+'antecedentes_obstetricos/'+ antecedente_obstetrico.id_paciente,
      antecedente_obstetrico,
      {headers: this.headers}
    );
  }

  actualizarPlanificacionFamiliar(planificacion_familiar: PlanificacionesFamiliares){
    return this.httpClient.put(
      this.API_ENDPOINT+'planificaciones_familiares/'+ planificacion_familiar.id_paciente,
      planificacion_familiar,
      {headers: this.headers}
    );
  }

  guardarDatosGenerales(paciente: Paciente){
    return this.httpClient.post(
      this.API_ENDPOINT + 'pacientes', 
      paciente, 
      {headers: this.headers}
    );
  };

  

  obtenerPacientes(){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes');
  }

  obtenerPaciente(id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes/'+id_paciente);
  }


  obtenerParentescos(){
    return this.httpClient.get(this.API_ENDPOINT+'parentescos');
  }


  obtenerAntecedentesFamiliares(){
    return this.httpClient.get(this.API_ENDPOINT+'antecedentes_familiares');
  }

  obtenerAntecedenteFamiliar(id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes_antecedentes_familiares/'+id_paciente);
  }




  obtenerAntecedentesPersonales(){
    return this.httpClient.get(
      this.API_ENDPOINT+'antecedentes_personales');
  }

  obtenerAntecedentePersonal($id_paciente: any){
    return this.httpClient.get(
      this.API_ENDPOINT+'antecedentes_personales/'+$id_paciente);
  }




  obtenerHabitosToxicologicos(){
    return this.httpClient.get(this.API_ENDPOINT+'habitos_toxicologicos_personales');
  }

  obtenerHabitoToxicologico(id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'habitos_toxicologicos_personales/'+id_paciente);
  }




  obtenerActividadesSexuales(){
    return this.httpClient.get(this.API_ENDPOINT+'actividad_sexual');
  }

  obtenerActividadSexual($id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'actividad_sexual/'+$id_paciente);
  }




  obtenerAntecedentesGinecologicos(){
    return this.httpClient.get(this.API_ENDPOINT+'antecedentes_ginecologicos');
  }

  obtenerAntecedenteGinecologico(id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'antecedentes_ginecologicos/'+id_paciente);
  }




  obtenerAntecedentesObstetricos(){
    return this.httpClient.get(this.API_ENDPOINT+'antecedentes_obstetricos');
  }

  obtenerAntecedenteObstetrico(id_paciente: any){
    return this.httpClient.get(this.API_ENDPOINT+'antecedentes_obstetricos/'+id_paciente);
  }




  obtenerPlanificacionesFamiliares(){
    return this.httpClient.get(
      this.API_ENDPOINT+'planificaciones_familiares');
  }

  obtenerPlanificacionFamiliar(id_paciente: any){
    return this.httpClient.get(
      this.API_ENDPOINT+'planificaciones_familiares/'+id_paciente);
  }




  getUltimoID(){
    return this.httpClient.get(this.API_ENDPOINT+'pacientes/ultimo/si');
  }

  getScrap(){
    return this.httpClient.get(this.API_ENDPOINT+'login');
  }
  

  guardarAntecedentesFamiliares(antecedente_familiar: AntecedentesFamiliares){
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_familiares', 
      antecedente_familiar, 
      {headers: this.headers}
    );
  };

  guardarAntecedentesPersonales(antecedente_personal: AntecedentesPersonales){
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_personales', 
      antecedente_personal, 
      {headers: this.headers}
    );
  };

  guardarHabitosToxicologicosPersonales(habito_toxicologico_personal: HabitosToxicologicosPersonales){
    return this.httpClient.post(
      this.API_ENDPOINT + 'habitos_toxicologicos_personales', 
      habito_toxicologico_personal, 
      {headers: this.headers}
    );
  };

  guardarActividadSexual(actividad_sexual: ActividadSexual){
    return this.httpClient.post(
      this.API_ENDPOINT + 'actividad_sexual', 
      actividad_sexual, 
      {headers: this.headers}
    );
  };

  guardarAntecedentesGinecologicos(antecedente_ginecologico: AntecedentesGinecologicos){
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_ginecologicos', 
      antecedente_ginecologico, 
      {headers: this.headers}
    );
  };

  guardarPlanificacionesFamiliares(planificacion_familiar: PlanificacionesFamiliares){
    return this.httpClient.post(
      this.API_ENDPOINT + 'planificaciones_familiares', 
      planificacion_familiar, 
      {headers: this.headers}
    );
  };

  guardarAntecedentesObstetricos(antecedente_obstetrico: AntecedentesObstetricos){
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_obstetricos', 
      antecedente_obstetrico, 
      {headers: this.headers}
    );
  };
}
