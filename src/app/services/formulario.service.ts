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
import { PacienteAntecedentePersonal } from '../interfaces/paciente-antecedente-personal';
import { PacienteHabitoToxicologico } from '../interfaces/paciente-habito-toxicologico';
import { PacienteHospitalariaQuirurgica } from '../interfaces/paciente-hospitalaria-quirurgica';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  idActualizar: number;
  IngresoPaciente: Paciente;
  NuevoIngreso: Paciente;
  esAlumno: boolean = true;

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  API_ENDPOINT = "http://127.0.0.1:8000/api/"


  constructor(private httpClient: HttpClient) {

  }

  ultimoIdAntecedente() {
    return this.httpClient.get(this.API_ENDPOINT + 'ultimoIdAntecedente');
  }

  enviarPacienteAntecedenteFamiliar(paciente_antecedente_familiar: PacienteAntecedenteFamiliar) {
    return this.httpClient.post(this.API_ENDPOINT + 'pacientes_antecedentes_familiares',
      paciente_antecedente_familiar,
      { headers: this.headers });
  }

  enviarPacienteAntecedentePersonal(paciente_antecedente_personal: PacienteAntecedentePersonal) {
    return this.httpClient.post(this.API_ENDPOINT + 'pacientes_antecedentes_personales',
      paciente_antecedente_personal,
      { headers: this.headers });
  }
  actualizarPacienteAntecedentePersonal(paciente_antecedente_personal: any) {
    return this.httpClient.put(this.API_ENDPOINT + 'pacientes_antecedentes_personales/'+paciente_antecedente_personal.id_enfermedad,
      paciente_antecedente_personal,
      { headers: this.headers });
  }

  enviarPacienteHabitoToxicologico(paciente_habito_toxicologico: PacienteHabitoToxicologico) {
    return this.httpClient.post(this.API_ENDPOINT + 'pacientes_habitos_toxicologicos',
      paciente_habito_toxicologico,
      { headers: this.headers });
  }

  enviarPacienteHospitalariaQuirurgica(paciente_hospitalaria_quirurgica: PacienteHospitalariaQuirurgica) {
    return this.httpClient.post(this.API_ENDPOINT + 'p_hospitalarias_quirurgicas',
      paciente_hospitalaria_quirurgica,
      { headers: this.headers });
  }
  actualizarPacienteHospitalariaQuirurgica(paciente_hospitalaria_quirurgica: any) {
    return this.httpClient.put(this.API_ENDPOINT + 'p_hospitalarias_quirurgicas/'+paciente_hospitalaria_quirurgica.id_hospitalaria_quirurgica,
      paciente_hospitalaria_quirurgica,
      { headers: this.headers });
  }


  enviarEnfermedad(enfermedad: any) {
    return this.httpClient.post(this.API_ENDPOINT + 'enfermedades', enfermedad,
     { headers: this.headers }); }
  actualizarEnfermedad(enfermedadeditar: any) {
      return this.httpClient.put(this.API_ENDPOINT + 'enfermedades/' +enfermedadeditar.id_enfermedadeditar, enfermedadeditar,
       { headers: this.headers }); }


  // estos dos servicios son solo para el input de otro
  enviarHabitoToxicologico(habito_toxicologico: any) {
    return this.httpClient.post(this.API_ENDPOINT + 'habitos_toxicologicos',habito_toxicologico,
      { headers: this.headers }); }
  actualizarHabitoToxicologico(habito_toxicologico) {
    return this.httpClient.put(this.API_ENDPOINT + 'habitos_toxicologicos/'+habito_toxicologico.idhabitotoxicologico, habito_toxicologico,
          { headers: this.headers });  }




  enviarTipoEnfermedad(tipo_enfermedad: any) {

    return this.httpClient.post(this.API_ENDPOINT + 'tipos_enfermedades', tipo_enfermedad, { headers: this.headers });

  }



  enviarTelefonoEmergencia(telefono_emergencia) {

    return this.httpClient.post(this.API_ENDPOINT + 'telefonos_emergencia', telefono_emergencia, { headers: this.headers });

  }

  enviarTelefonoPaciente(telefono_paciente) {

    return this.httpClient.post(this.API_ENDPOINT + 'telefonos_pacientes', telefono_paciente, { headers: this.headers });

  }


  actualizarPaciente(paciente: Paciente) {
    return this.httpClient.put(
      this.API_ENDPOINT + 'pacientes/' + paciente.id_paciente,
      paciente,
      { headers: this.headers }
    );
  }






 

  actualizarPacienteHabitoToxicologico(paciente_habito_toxicologico) {
    return this.httpClient.put(this.API_ENDPOINT + 'pacientes_habitos_toxicologicos/' + paciente_habito_toxicologico.id_habito_toxicologico,paciente_habito_toxicologico,
      { headers: this.headers });
  }
 












  actualizarActividadSexual(actividad_sexual: ActividadSexual) {
    return this.httpClient.put(
      this.API_ENDPOINT + 'actividad_sexual/' + actividad_sexual.id_paciente,
      actividad_sexual,
      { headers: this.headers }
    );
  }

  actualizarAntecedenteGinecologico(antecedente_ginecologico: AntecedentesGinecologicos) {
    return this.httpClient.put(
      this.API_ENDPOINT + 'antecedentes_ginecologicos/' + antecedente_ginecologico.id_paciente,
      antecedente_ginecologico,
      { headers: this.headers }
    );
  }

  actualizarAntecedenteObstetrico(antecedente_obstetrico: AntecedentesObstetricos) {
    return this.httpClient.put(
      this.API_ENDPOINT + 'antecedentes_obstetricos/' + antecedente_obstetrico.id_paciente,
      antecedente_obstetrico,
      { headers: this.headers }
    );
  }

  actualizarPlanificacionFamiliar(planificacion_familiar: PlanificacionesFamiliares) {
    return this.httpClient.put(
      this.API_ENDPOINT + 'planificaciones_familiares/' + planificacion_familiar.id_paciente,
      planificacion_familiar,
      { headers: this.headers }
    );
  }

  guardarDatosGenerales(paciente: Paciente) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'pacientes',
      paciente,
      { headers: this.headers }
    );
  };



  obtenerPacientes() {
    return this.httpClient.get(this.API_ENDPOINT + 'pacientes');
  }
 

  obtenerPaciente(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'pacientes/' + id_paciente);
  }

  obtenerPacientePorCuenta(paciente){
    
      return this.httpClient.post(this.API_ENDPOINT + 'obtenerPaciente', paciente, {headers: this.headers});
      
  }

  obtenerColumnaTelefono(numero_telefono) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerColumnaNumeroTelefono/' + numero_telefono);
  }



  obtenerParentescos() {
    return this.httpClient.get(this.API_ENDPOINT + 'parentescos');
  }

  obtenerEstadosCiviles() {
    return this.httpClient.get(this.API_ENDPOINT + 'estados_civiles');
  }

  obtenerSegurosMedicos() {
    return this.httpClient.get(this.API_ENDPOINT + 'seguros_medicos');
  }

  obtenerPracticasSexuales() {
    return this.httpClient.get(this.API_ENDPOINT + 'practicas_sexuales');
  }

  obtenerMetodosPlanificaciones() {
    return this.httpClient.get(this.API_ENDPOINT + 'metodos_planificaciones');
  }

  obtenerColumnaEnfermedades(id_grupo_enfermedad) {
    return this.httpClient.get(this.API_ENDPOINT + 'columna_enfermedades/' + id_grupo_enfermedad);
  }

  obtenerColumnaHabitoToxicologico() {
    return this.httpClient.get(this.API_ENDPOINT + 'columna_habito_toxicologico');
  }

  obtenerColumnaIdentidad(numero_identidad) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerColumnaIdentidad/' + numero_identidad);
  }

  obtenerAntecedentesFamiliares() {
    return this.httpClient.get(this.API_ENDPOINT + 'antecedentes_familiares');
  }
 
  
  obtenerEmergenciaPersona(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'telefonos_emergencia/' + id_paciente);
  }
  obtenerEmergenciaPersonas() {
    return this.httpClient.get(this.API_ENDPOINT + 'telefonos_emergencia/' );
  }  

  obtenerAntecedenteFamiliar(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'pacientes_antecedentes_familiares/' + id_paciente);
  }
  obtenerDesnutricionesAF(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerdesnutricionAF/' + id_paciente);
  }
  obtenerMentalesAF(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenermentalesAF/' + id_paciente);
  }
  obtenerAlergiasAF(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obteneralergiasAF/' + id_paciente);
  }
  obtenerCanceresAF(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenercanceresAF/' + id_paciente);
  }
  obtenerOtrosAF(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerotrosAF/' + id_paciente);
  }
  


  obtenerAntecedentesPersonales() {
    return this.httpClient.get(
      this.API_ENDPOINT + 'antecedentes_personales');
  }

  obtenerAntecedentePersonal($id_paciente: any) {
    return this.httpClient.get(
      this.API_ENDPOINT + 'pacientes_antecedentes_personales/' + $id_paciente);
  }

  // OBTENGO LAS ENF AP POR PACIENTE Y ENFERMEDAD ESPECIFICA RESPECTIVAMENTE
  obtenerDesnutricionesAP(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerdesnutricionAP/' + id_paciente);
  }
  obtenerMentalesAP(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenermentalesAP/' + id_paciente);
  }
  obtenerAlergiasAP(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obteneralergiasAP/' + id_paciente);
  }
  obtenerCanceresAP(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenercanceresAP/' + id_paciente);
  }
  obtenerOtrosAP(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerotrosAP/' + id_paciente);
  }
  obtenerhospitalarias_quirurgicas(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerhospitalarias_quirurgicas/' + id_paciente);
  }

  obtenerUnaDesnutricionAP(id_enfermedad: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerUnadesnutricionAP/' + id_enfermedad);
  }
  obtenerUnaMentalAP(id_enfermedad: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerUnamentalesAP/' + id_enfermedad);
  }
  obtenerUnaAlergiaAP(id_enfermedad: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerUnaalergiasAP/' + id_enfermedad);
  }
  obtenerUnCancerAP(id_enfermedad: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerUnacanceresAP/' + id_enfermedad);
  }
  obtenerUnOtroAP(id_enfermedad: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerUnaotrosAP/' + id_enfermedad);
  }
  obtenerUnahospitalaria_quirurgica(id_hospitalaria: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerUnahospitalaria_quirurgica/' + id_hospitalaria);
  }








  
  obtenerHabitosToxicologicos() {
    return this.httpClient.get(this.API_ENDPOINT + 'habitos_toxicologicos_personales');
  }
  obtenerHabitoToxicologico(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'pacientes_habitos_toxicologicos/' + id_paciente);
  }
  obtenerUnhabito(id_habito_toxi: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'obtenerUnhabito/' + id_habito_toxi);
  }

  

  obtenerActividadesSexuales() {
    return this.httpClient.get(this.API_ENDPOINT + 'actividad_sexual');
  }

  obtenerActividadSexual($id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'actividad_sexual/' + $id_paciente);
  }

  obtenerAntecedentesGinecologicos() {
    return this.httpClient.get(this.API_ENDPOINT + 'antecedentes_ginecologicos');
  }

  obtenerAntecedenteGinecologico(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'antecedentes_ginecologicos/' + id_paciente);
  }


  obtenerAntecedentesObstetricos() {
    return this.httpClient.get(this.API_ENDPOINT + 'antecedentes_obstetricos');
  }

  obtenerAntecedenteObstetrico(id_paciente: any) {
    return this.httpClient.get(this.API_ENDPOINT + 'antecedentes_obstetricos/' + id_paciente);
  }


  obtenerPlanificacionesFamiliares() {
    return this.httpClient.get(
      this.API_ENDPOINT + 'planificaciones_familiares');
  }

  obtenerPlanificacionFamiliar(id_paciente: any) {
    return this.httpClient.get(
      this.API_ENDPOINT + 'planificaciones_familiares/' + id_paciente);
  }




  getUltimoID() {
    return this.httpClient.get(this.API_ENDPOINT + 'pacientes/ultimo/si');
  }

  getScrap() {
    return this.httpClient.get(this.API_ENDPOINT + 'datos_login');
  }


  guardarAntecedentesFamiliares(antecedente_familiar: AntecedentesFamiliares) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_familiares',
      antecedente_familiar,
      { headers: this.headers }
    );
  };

  guardarAntecedentesPersonales(antecedente_personal: AntecedentesPersonales) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_personales',
      antecedente_personal,
      { headers: this.headers }
    );
  };

  guardarHabitosToxicologicosPersonales(habito_toxicologico_personal: HabitosToxicologicosPersonales) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'habitos_toxicologicos_personales',
      habito_toxicologico_personal,
      { headers: this.headers }
    );
  };

  guardarActividadSexual(actividad_sexual: ActividadSexual) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'actividad_sexual',
      actividad_sexual,
      { headers: this.headers }
    );
  };

  guardarAntecedentesGinecologicos(antecedente_ginecologico: AntecedentesGinecologicos) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_ginecologicos',
      antecedente_ginecologico,
      { headers: this.headers }
    );
  };

  guardarPlanificacionesFamiliares(planificacion_familiar: PlanificacionesFamiliares) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'planificaciones_familiares',
      planificacion_familiar,
      { headers: this.headers }
    );
  };

  guardarAntecedentesObstetricos(antecedente_obstetrico: AntecedentesObstetricos) {
    return this.httpClient.post(
      this.API_ENDPOINT + 'antecedentes_obstetricos',
      antecedente_obstetrico,
      { headers: this.headers }
    );
  };



eliminarEmergenciaPersona(id_paciente: any) {
  return this.httpClient.delete(this.API_ENDPOINT + 'telefonos_emergencia/' + id_paciente);
}
eliminarCualquierEnfermedadAF(id_paciente: any) {
  return this.httpClient.delete(this.API_ENDPOINT + 'pacientes_antecedentes_familiares/' + id_paciente);
}
eliminarCualquierEnfermedadAP(id_paciente: any) {
  return this.httpClient.delete(this.API_ENDPOINT + 'pacientes_antecedentes_personales/' + id_paciente);
}
eliminarHospitalaria(id_paciente: any) {
  return this.httpClient.delete(this.API_ENDPOINT + 'p_hospitalarias_quirurgicas/' + id_paciente);
}
eliminarHabitoTox(id_paciente: any) {
  return this.httpClient.delete(this.API_ENDPOINT + 'pacientes_habitos_toxicologicos/' + id_paciente);
}

}



