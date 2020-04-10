import { Component, OnInit, ViewChild, SimpleChange, SimpleChanges, Input, OnDestroy, Inject, Injectable, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from "../services/formulario.service";
import { Paciente } from "../interfaces/paciente";
import { AppComponent } from '../app.component';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { select, MyErrorStateMatcher, antecedentesPersonales, habitosToxicologicos } from '../formulario/formulario.component';
import { AntecedentesFamiliares } from '../interfaces/antecedentes-familiares';
import { MatTableDataSource, MatSidenav, MatDialog, MatSnackBar, MatDialogRef, MatSnackBarConfig, SimpleSnackBar, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AntecedentesPersonales } from '../interfaces/antecedentes-personales';
import { HabitosToxicologicosPersonales } from '../interfaces/habitos-toxicologicos-personales';
import { ActividadSexual } from '../interfaces/actividad-sexual';
import { AntecedentesGinecologicos } from '../interfaces/antecedentes-ginecologicos';
import { PlanificacionesFamiliares } from '../interfaces/planificaciones-familiares';
import { AntecedentesObstetricos } from '../interfaces/antecedentes-obstetricos';
import { PacienteAntecedenteFamiliar } from "../interfaces/paciente-antecedente-familiar";
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { InventariosService } from '../services/inventarios.service';
import { Cita } from '../interfaces/Cita';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TelefonoEmergencia } from '../interfaces/telefono-emergencia';
import { DesnutricionAF } from '../interfaces/desnutricionAF';
import { Login } from '../interfaces/login';
import { MentalAF } from '../interfaces/mentalAF';
import { AlergiaAF } from '../interfaces/alergiaAF';
import { CancerAF } from '../interfaces/cancerAF';
import { OtroAF } from '../interfaces/OtrosAF';
import { DesnutricionAP } from '../interfaces/desnutricionAP';
import { AlergiaAP } from '../interfaces/alergiaAP';
import { CancerAP } from '../interfaces/cancerAP';
import { OtroAP } from '../interfaces/otroAP';
import { MentalAP } from '../interfaces/MentalAP';
import { PacienteHospitalariaQuirurgica } from '../interfaces/paciente-hospitalaria-quirurgica';
import { WebcamInitError } from '../modules/webcam/domain/webcam-init-error';
import { WebcamImage } from '../modules/webcam/domain/webcam-image';
import { Subject, Observable, timer, interval, empty } from 'rxjs';
import { WebcamUtil } from '../modules/webcam/util/webcam.util';
import { PacienteAntecedentePersonal } from '../interfaces/paciente-antecedente-personal';
import { PacienteHabitoToxicologico } from '../interfaces/paciente-habito-toxicologico';
import { HabitoToxicologico } from '../interfaces/habito-toxicologico';
import { EnfermedadEditar } from '../interfaces/enfermedadeditar';
import { PdfMakeWrapper, Txt, Canvas, Line } from 'pdfmake-wrapper';
import { Telefono } from '../interfaces/telefono';
import { ActividadSexualAdd } from '../interfaces/actividad_sexual_add';
import { AntecedentesGinecologicosAdd } from '../interfaces/antecedente_ginecologicoadd';
import { AntecedentesObstetricosAdd } from '../interfaces/antecedentes-obstetricos-add';
import { PlanificacionesFamiliaresAdd } from '../interfaces/planificaciones-familiares-add';
import { HistoriaSubsiguiente } from '../interfaces/historia_subsiguiente';
import { PacienteService } from '../services/paciente.service';
import * as moment from 'moment';
import { BreakpointObserver } from '@angular/cdk/layout';


export interface Element {

  numero: number;
  enfermedad?: string;
  id_grupo_enfermedad?: number
  observacion?: string;
  parentesco?: any;
  habito_toxicologico?: string;
  id_paciente_habito_toxicologico?: number;

}
export interface Parentescos {
  value: number;
  viewValue: string;
}
export interface Select {
  value: string;
  viewValue: string;
}
export interface Categorias {
  value: number;
  viewValue: string;
}
export interface Sexos {
  value: string;
  viewValue: string;
}

export interface EstadosCiviles {
  value: number;
  viewValue: string;
}

export interface SegurosMedicos {
  value: number;
  viewValue: string;
}

export interface PracticasSexuales {
  value: number;
  viewValue: string;
}

export interface MetodoPlanificacion {
  value: number;
  viewValue: string;
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

export interface familiar {
  id_paciente?: number;
  id_antecedente?: string;
  id_parentesco?: string;
}



export interface antecedentesFamiliares {

  antecedente: number;
  parentesco: number;

}





@Component({
  selector: 'app-ver-paciente',
  inputs: ['cambios'],
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VerPacienteComponent implements OnInit {
  static mostrarHistoriasSub() {
    throw new Error("Method not implemented.");
  }
  
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  dataSource1: any;
  columnsToDisplay = ['fecha', 'observaciones', 'impresion', 'indicaciones'];
  expandedElement: Cita | null;

  events: string[] = [];
  opened: boolean;
  paciente1: Paciente;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  titulo = 'Ingreso de datos restantes';



  matcher = new MyErrorStateMatcher();

  formulario_datos_generales = new FormGroup({
    nombre_completo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{5,40}$/)
      , Validators.maxLength(40), Validators.minLength(5)]),

    numero_cuenta: new FormControl('', [Validators.required, Validators.pattern(/^[2][0-9]{10}$/)
      , Validators.maxLength(11), Validators.minLength(11)]),

    numero_identidad: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\d{4}\d{5}$/)
      , Validators.maxLength(13), Validators.minLength(13)]),

    lugar_procedencia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{5,30}$/)
      , Validators.maxLength(30), Validators.minLength(5)]),

    direccion: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{5,30}$/)
      , Validators.maxLength(30), Validators.minLength(5)]),

    carrera: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{5,30}$/)
      , Validators.maxLength(30), Validators.minLength(5)]),

    fecha_nacimiento: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    categoria: new FormControl('', [Validators.required]),
    estado_civil: new FormControl('', Validators.required),
    seguro_medico: new FormControl('', Validators.required),

    //datos de lso telefonos
    numero_telefono: new FormControl('', [Validators.pattern(/^\d{8}$/)]),
    numero_telefono_agregar: new FormControl('', [Validators.pattern(/^\d{8}$/)]),
    emergencia_telefono: new FormControl('', [Validators.pattern(/^\d{8}$/)]),
    emergencia_persona: new FormControl('', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,30}$/)]),

    //datos restantes
    peso: new FormControl('', [Validators.max(500), Validators.min(2), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    talla: new FormControl('', [Validators.max(2.5), Validators.min(0.2), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    temperatura: new FormControl('', [Validators.max(60), Validators.min(20), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    presion: new FormControl('', [Validators.max(200), Validators.min(50), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    pulso: new FormControl('', [Validators.max(140), Validators.min(40), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    prosene: new FormControl('', []),
  });





  formulario_antecedentes_familiares = new FormGroup({
    parentesco_desnutricion: new FormControl('', []),
    tipo_desnutricion: new FormControl('', [Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,15}$/)]),
    parentesco_enfermedades_mentales: new FormControl('', []),
    tipo_enfermedad_mental: new FormControl('', []),
    parentesco_alergias: new FormControl('', []),
    tipo_alergia: new FormControl('', []),
    parentesco_cancer: new FormControl('', []),
    tipo_cancer: new FormControl('', []),
    otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    parentesco_otros: new FormControl('', []),
  });

  formulario_antecedentes_personales = new FormGroup({
    observacion_desnutricion: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_desnutricion: new FormControl('', [Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,15}$/)]),
    observacion_enfermedades_mentales: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_enfermedad_mental: new FormControl('', [Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,15}$/)]),
    observacion_alergias: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_alergia: new FormControl('', [Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,15}$/)]),
    observacion_cancer: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_cancer: new FormControl('', [Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,15}$/)]),
    fecha_antecedente_hospitalario: new FormControl('', []),
    tratamiento: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    diagnostico: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tiempo_hospitalizacion: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    otros: new FormControl('', [Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,15}$/)]),
    observacion_otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
  });

  formulario_habito_toxicologico_personal = new FormGroup({
    otros: new FormControl('', [Validators.maxLength(15), Validators.minLength(6)]),
    observacion_otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
  });

  formulario_actividad_sexual = new FormGroup({
    actividad_sexual: new FormControl('', [Validators.required]),
    // hay que validar que si actividad sexual es true que sean requeridos estos 3 campos
    edad_inicio_sexual: new FormControl('', [Validators.max(50)]),
    numero_parejas_sexuales: new FormControl('', [Validators.max(99)]),
    practicas_sexuales_riesgo: new FormControl(''),
  });

  formulario_antecedente_ginecologico = new FormGroup({
    edad_inicio_menstruacion: new FormControl('', [Validators.max(18), Validators.min(7)]),
    fum: new FormControl('', []),

    citologia: new FormControl('', []),
    fecha_citologia: new FormControl(''),
    resultado_citologia: new FormControl('', [Validators.maxLength(60), Validators.minLength(3)]),

    duracion_ciclo_menstrual: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    periocidad_ciclo_menstrual: new FormControl('', []),
    caracteristicas_ciclo_menstrual: new FormControl('', [])
  });

  formulario_planificacion_familiar = new FormGroup({
    planificacion_familiar: new FormControl('', Validators.required),
    metodo_planificacion: new FormControl(''),
    observacion_planificacion: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
  });

  formulario_antecedente_obstetrico = new FormGroup({
    partos: new FormControl('', [Validators.max(10), Validators.min(0)]),
    abortos: new FormControl('', [Validators.max(10), Validators.min(0)]),
    cesarias: new FormControl('', [Validators.max(10), Validators.min(0)]),
    hijos_vivos: new FormControl('', [Validators.max(10), Validators.min(0)]),
    hijos_muertos: new FormControl('', [Validators.max(10), Validators.min(0)]),
    fecha_termino_ult_embarazo: new FormControl(''),
    descripcion_termino_ult_embarazo: new FormControl(''),
    observaciones: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
  });


  // variable que hace cambien los acordiones
  step;

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }



  habilitarInputs(formControl: FormControl[]) {
    formControl.forEach(controlador => {
      controlador.enable({ onlySelf: true });
      controlador.setValidators(Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,15}$/));



    });
  }

  habilitarInputsinvalidacion(formControl: FormControl[]) {
    formControl.forEach(controlador => {
      controlador.enable({ onlySelf: true });
    });
  }

  borrarInputs(formControl: FormControl[]) {
    formControl.forEach(controlador => {
      controlador.setValue('');
      controlador.disable({ onlySelf: true });

      if (controlador.parent == this.formulario_antecedentes_familiares) {
        //elimino todas la validaciones que tenga el controlador
        controlador.clearValidators();
        controlador.updateValueAndValidity();
      }
    });
  }

  mostrarCamposDesnutricionAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposDesnutricionAF').style.display = "block";
    console.log(document.getElementById('InputDesnutricion'));
    this.autocomplete(document.getElementById('InputDesnutricion'), this.enfermedadesDesnutricion, this.tipo_desnutricion);

    
  }

  mostrarCamposEnfermedadesMentalesAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposEnfermedadesMentalesAF').style.display = "block";
    this.autocomplete(document.getElementById('InputEnfermedadAF'), this.enfermedadesMentales, this.tipo_enfermedad_mental);

  }

  mostrarCamposAlergiasAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposAlergiasAF').style.display = "block";
    this.autocomplete(document.getElementById('InputAlergiaAF'), this.enfermedadesAlergias, this.tipo_alergia);

  }

  mostrarCamposCancerAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposCancerAF').style.display = "block";
    this.autocomplete(document.getElementById('InputCancerAF'), this.enfermedadesCancer, this.tipo_cancer);

  }

  mostrarCamposOtroAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposOtrosAF').style.display = "block";
  }

  mostrarCamposDesnutricionAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposDesnutricionAP').style.display = "block";
    this.autocomplete(document.getElementById('InputDenutricionAP'), this.enfermedadesDesnutricion, this.tipo_desnutricion_ap);

  }

  mostrarCamposEnfermedadesMentalesAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposEnfermedadesMentalesAP').style.display = "block";
    this.autocomplete(document.getElementById('InputEnfermedadAP'), this.enfermedadesMentales, this.tipo_enfermedad_mental_ap);

  }

  mostrarCamposAlergiasAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposAlergiasAP').style.display = "block";
    this.autocomplete(document.getElementById('inputAlergiaAP'), this.enfermedadesAlergias, this.tipo_alergia_ap);

  }

  mostrarCamposCancerAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposCanceresAP').style.display = "block";
    this.autocomplete(document.getElementById('InputCancerAP'), this.enfermedadesCancer, this.tipo_cancer_ap);

  }

  mostrarCamposOtroAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposOtrosAP').style.display = "block";
  }

  mostrarCamposHospitalariasQuirurgicas() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposHospitalariasQ').style.display = "block";
  }

  mostrarCamposToxicologicos() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarToxicologicos').style.display = "block";
    this.autocomplete(document.getElementById('inputOtrosHT'), this.habitosToxicologicos, this.otros_ht);
  }

  des = true;
  ingreso: string;
  des1 = true;
  ingreso1: string;
  des2 = true;
  ingreso2: string;
  des3 = true;
  ingreso3: string;

  ///// Creacion de variables
  mostrarHisorias: boolean = false;
  historias_subsiguientes_paciente: HistoriaSubsiguiente[];

  Mostrar() {
    this.des = false;
  }
  Esconder() {
    this.ingreso = null;
    this.des = true;
  }
  Mostrar1() {
    this.des1 = false;
  }
  Esconder1() {
    this.ingreso1 = null;
    this.des1 = true;
  }
  Mostrar2() {
    this.des2 = false;
  }
  Esconder2() {
    this.ingreso2 = null;
    this.des2 = true;
  }
  Mostrar3() {
    this.des3 = false;
  }
  Esconder3() {
    this.ingreso3 = null;
    this.des3 = true;
  }
  mostrarS() {
    this.ocultar = false;
  }
  mostrarN() {
    this.ocultar = true;
  }


  ocultar: boolean = true;


  paciente: Paciente = {
    id_paciente: null,
    numero_paciente: null,
    nombre_completo: null,
    numero_cuenta: null,
    numero_identidad: null,
    imagen: null,
    lugar_procedencia: null,
    direccion: null,
    carrera: null,
    fecha_nacimiento: null,
    sexo: null,
    estado_civil: null,
    seguro_medico: null,
    telefono: null,
    categoria: null,
  }

  datosScraping: Login = {
    cuenta: null,
    password: null,
    nombre: null,
    carrera: null,
    centro: null,
    numero_identidad: null,
  }

  telefono_Emergencias: TelefonoEmergencia = {
    id_telefono_emergencia: null,
    id_paciente: null,
    telefono_emergencia: null,
    emergencia_persona: null,
  }
  telefono: Telefono = {
    id_telefono: null,
    id_paciente: null,
    telefono: null,
  }
  telefonos_Emergencias: TelefonoEmergencia[];
  tel_emergencia: any;
  tel_persona: any;



  antecedente_familiar: AntecedentesFamiliares = {
    diabetes: null,
    parentesco_diabetes: null,
    tb_pulmonar: null,
    parentesco_tb_pulmonar: null,
    desnutricion: null,
    parentesco_desnutricion: null,
    tipo_desnutricion: null,
    enfermedades_mentales: null,
    parentesco_enfermedades_mentales: null,
    tipo_enfermedad_mental: null,
    convulsiones: null,
    parentesco_convulsiones: null,
    alcoholismo_sustancias_psicoactivas: null,
    parentesco_alcoholismo_sustancias_psicoactivas: null,
    alergias: null,
    parentesco_alergias: null,
    tipo_alergia: null,
    cancer: null,
    parentesco_cancer: null,
    tipo_cancer: null,
    hipertension_arterial: null,
    parentesco_hipertension_arterial: null,
    otros: null,
    parentesco_otros: null,
    id_paciente: null
  };

  desnutricionAF: DesnutricionAF = {
    enfermedad: null,
    parentesco: null
  }

  mentalAF: MentalAF = {
    enfermedad: null,
    parentesco: null
  }

  alergiaAF: AlergiaAF = {
    enfermedad: null,
    parentesco: null
  }

  cancerAF: CancerAF = {
    enfermedad: null,
    parentesco: null
  }

  otroAF: OtroAF = {
    enfermedad: null,
    parentesco: null
  }

  desnutricionAP: DesnutricionAP = {
    enfermedad: null,
    observacion: null
  }

  mentalAP: MentalAP = {
    enfermedad: null,
    observacion: null
  }

  alergiaAP: AlergiaAP = {
    enfermedad: null,
    observacion: null
  }

  cancerAP: CancerAP = {
    enfermedad: null,
    observacion: null
  }

  otroAP: OtroAP = {
    enfermedad: null,
    observacion: null
  }

  ante_familiar: any;
  ante_personal: any;
  ante_familiardesnutricionAF: any;
  ante_familiarmentalAF: any;
  ante_familiaralergiaAF: any;
  ante_familiarcancerAF: any;
  ante_familiarotroAF: any;
  ante_familiardesnutricionAP: any;
  ante_familiarmentalAP: any;
  ante_familiaralergiaAP: any;
  ante_familiarcancerAP: any;
  ante_familiarotroAP: any;
  habito_toxi: any;
  VarActualizar: any;
  act_sex: any;
  plani_fam: any;
  hospitalaria_qui: any;




  ante_familiar_filtrado: familiar[];

  antecedente_personal: AntecedentesPersonales = {
    diabetes: null,
    observacion_diabetes: null,
    tb_pulmonar: null,
    observacion_tb_pulmonar: null,
    its: null,
    observacion_its: null,
    desnutricion: null,
    observacion_desnutricion: null,
    tipo_desnutricion: null,
    enfermedades_mentales: null,
    observacion_enfermedades_mentales: null,
    tipo_enfermedad_mental: null,
    convulsiones: null,
    observacion_convulsiones: null,
    alergias: null,
    observacion_alergias: null,
    tipo_alergia: null,
    cancer: null,
    observacion_cancer: null,
    tipo_cancer: null,
    hospitalarias_quirurgicas: null,
    fecha_antecedente_hospitalario: null,
    tratamiento: null,
    diagnostico: null,
    tiempo_hospitalizacion: null,
    traumaticos: null,
    observacion_traumaticos: null,
    otros: null,
    observacion_otros: null,
    id_paciente: null
  };

  habito_toxicologico_personal: HabitosToxicologicosPersonales = {
    id_habito_toxicologico_personal: null,
    alcohol: null,
    observacion_alcohol: null,
    tabaquismo: null,
    observacion_tabaquismo: null,
    marihuana: null,
    observacion_marihuana: null,
    cocaina: null,
    observacion_cocaina: null,
    otros: null,
    observacion_otros: null,
    id_paciente: null,
  }



  actividad_sexual: ActividadSexual = {
    actividad_sexual: null,
    edad_inicio_sexual: null,
    numero_parejas_sexuales: null,
    practicas_sexuales_riesgo: null,
    id_paciente: null
  };


  actividad_sexual_add: ActividadSexualAdd = {
    actividad_sexual: null,
    edad_inicio_sexual: null,
    numero_parejas_sexuales: null,
    practicas_sexuales_riesgo: null,
    id_paciente: null
  };

  antecedente_ginecologico: AntecedentesGinecologicos = {
    edad_inicio_menstruacion: null,
    fum: null,
    citologia: null,
    fecha_citologia: null,
    resultado_citologia: null,
    duracion_ciclo_menstrual: null,
    periocidad_ciclo_menstrual: null,
    caracteristicas_ciclo_menstrual: null,
    id_paciente: null
  };

  antecedente_ginecologico_add: AntecedentesGinecologicosAdd = {
    edad_inicio_menstruacion: null,
    fum: null,
    citologia: null,
    fecha_citologia: null,
    resultado_citologia: null,
    duracion_ciclo_menstrual: null,
    periocidad_ciclo_menstrual: null,
    caracteristicas_ciclo_menstrual: null,
    id_paciente: null
  };

  planificacion_familiardata: PlanificacionesFamiliares = {
    planificacion_familiar: null,
    metodo_planificacion: null,
    observacion_planificacion: null,
    id_paciente: null
  };
  planificacion_familiardata_add: PlanificacionesFamiliaresAdd = {
    planificacion_familiar: null,
    metodo_planificacion: null,
    observacion_planificacion: null,
    id_paciente: null
  };

  antecedente_obstetrico: AntecedentesObstetricos = {
    partos: null,
    abortos: null,
    cesarias: null,
    hijos_vivos: null,
    hijos_muertos: null,
    fecha_termino_ult_embarazo: null,
    descripcion_termino_ult_embarazo: null,
    observaciones: null,
    id_paciente: null
  };

  antecedente_obstetrico_add: AntecedentesObstetricosAdd = {
    partos: null,
    abortos: null,
    cesarias: null,
    hijos_vivos: null,
    hijos_muertos: null,
    fecha_termino_ult_embarazo: null,
    descripcion_termino_ult_embarazo: null,
    observaciones: null,
    id_paciente: null
  };

  enfermedad: Element = {

    numero: null,
    enfermedad: null,
    parentesco: null,
    id_grupo_enfermedad: null,
  }

  paciente_antecedente_familiar: PacienteAntecedenteFamiliar = {
    id_paciente: null,
    id_enfermedad: null,
    id_parentesco: null,
  };

  paciente_antecedente_personal: PacienteAntecedentePersonal = {
    id_paciente: null,
    id_enfermedad: null,
    observacion: null,
  };

  paciente_habito_toxicologico: PacienteHabitoToxicologico = {
    id_paciente: null,
    id_habito_toxicologico: null,
    observacion: null,
  }
  habito_toxicologico: HabitoToxicologico = {
    habito_toxicologico: null,
    idhabitotoxicologico: null
  }

  enfermedadeditar: EnfermedadEditar = {
    id_enfermedadeditar: null,
    id_grupo_enfermedad: null,
    enfermedad: null
  }



  paciente_hospitalaria_quirurgica: PacienteHospitalariaQuirurgica = {
    id_hospitalaria_quirurgica: null,
    id_paciente: null,
    fecha: null,
    tiempo_hospitalizacion: null,
    diagnostico: null,
    tratamiento: null,
  }

  // creo estos arreglos de los cuales extraigo el valor de cada elemento y lo mando a la tabla de la base de datos respectiva
  // estos arreglos son de los controladores del formulario.

  antecedentesF: antecedentesFamiliares[];
  antecedentesP: antecedentesPersonales[];
  habitosT: habitosToxicologicos[];

  //creo un arreglo de la interfaz en donde voy a mostrar los datos de la tabla
  tablaAntecedentesFamiliares: any;
  tablaAntecedentesPersonales: any;
  tablaHabitosToxicologicos: any;
  tablaTelefonosEmergencia: any;
  tablaTelefonos: any;
  tablaDesnutricionAF: any;
  tablaMentalAF: any;
  tablaAlergiaAF: any;
  tablaCancerAF: any;
  tablaOtroAF: any;
  tablaDesnutricionAP: any;
  tablaMentalAP: any;
  tablaAlergiaAP: any;
  tablaCancerAP: any;
  tablaOtroAP: any;
  mostrarmensajeactividadsexual: any;
  mostrarmensajeplanificacionfamiliar: any;
  tablahospitalarias: any;



  tablaOtrosAF: Element[] = [];
  tablaDesnutricionesAF: Element[] = [];
  tablaEnfermedadesMentalesAF: Element[] = [];
  tablaAlergiasAF: Element[] = [];
  tablaCanceresAF: Element[] = [];









  dataSourceTablaTelefonosEmergenciaActualizar: any;

  //creo un arreglo en el cual se añaden las columnas que se van a mostrar en la tabla en el html
  columnasTablaAntecedentesFamiliares: string[] = ['antecedente', 'valor', 'parentesco'];
  columnasTablaAntecedentesPersonales: string[] = ['antecedente', 'valor', 'observacion'];
  columnastablaHabitosToxicologicos: string[] = ['habito_toxicologico', 'observacion'];
  columnastablaHabitosToxicologicosEditar: string[] = ['numero', 'habito_toxicologico', 'observacion', 'botoneliminar', 'botoneditar'];
  columnasTablaEmergenciaPersona: string[] = ['persona', 'telefono'];
  columnasTablaTelefono: string[] = ['numero', 'telefono'];
  columnasTablaTelefonosEmergencia: string[] = ['numero', 'nombre', 'telefono', 'botones'];
  columnasTablaTelefonosEditar: string[] = ['numero', 'telefono', 'botones'];
  columnasTablaDesnutricionAF: string[] = ['grupoenfermedad', 'enfermedad', 'parentesco', 'botones'];
  columnasTablaMentalAF: string[] = ['grupoenfermedad', 'enfermedad', 'parentesco', 'botones'];
  columnasTablaAlergiaAF: string[] = ['grupoenfermedad', 'enfermedad', 'parentesco', 'botones'];
  columnasTablaCancerAF: string[] = ['grupoenfermedad', 'enfermedad', 'parentesco', 'botones'];
  columnasTablaOtroAF: string[] = ['grupoenfermedad', 'enfermedad', 'parentesco', 'botoneseliminar'];
  columnasTablaDesnutricionAP: string[] = ['grupoenfermedad', 'enfermedad', 'observacion', 'botones', 'botonesE'];
  columnasTablaMentalAP: string[] = ['grupoenfermedad', 'enfermedad', 'observacion', 'botones', 'botonesE'];
  columnasTablaAlergiaAP: string[] = ['grupoenfermedad', 'enfermedad', 'observacion', 'botones', 'botonesE'];
  columnasTablaCancerAP: string[] = ['grupoenfermedad', 'enfermedad', 'observacion', 'botones', 'botonesE'];
  columnasTablaOtroAP: string[] = ['grupoenfermedad', 'enfermedad', 'observacion', 'botones', 'botonesE'];
  columnashospitalarias: string[] = ['fecha', 'tiempo_hospitalizacion', 'diagnostico', 'tratamiento'];
  columnashospitalariaseditar: string[] = ['fecha', 'tiempo_hospitalizacion', 'diagnostico', 'tratamiento', 'botones', 'botonesE'];

  //date picker
  minDate = new Date(1950, 0, 1);
  maxDate = new Date();

  //select
  categorias: Categorias[] = [
    { value: 1, viewValue: 'Empleado' },
    { value: 2, viewValue: 'Visitante' },
    { value: 3, viewValue: 'Estudiante' }
  ];

  dataSourceTablaTelefonosEmergencia: any;

  seguros_medicos: SegurosMedicos[] = [];

  estados_civiles: EstadosCiviles[] = [];

  sexos: Sexos[] = [
    { value: 'Hombre', viewValue: 'Hombre' },
    { value: 'Mujer', viewValue: 'Mujer' },

  ];


  // parentescos: select[] = [
  //   {value: 'Padre' , viewValue: 'Padre'},
  //   {value: 'Madre' , viewValue: 'Madre'},
  //   {value: 'Abuelos' , viewValue: 'Abuelos'},
  //   {value: 'Tios' , viewValue: 'Tios'},
  // ];

  parentescos: Parentescos[] = [];

  desnutriciones: select[] = [
    { value: 'Obecidad', viewValue: 'Obecidad' },
    { value: 'Muy degaldo', viewValue: 'Muy delgado' },
  ];

  enfermedades_mentaless: select[] = [
    { value: 'Alzheimer', viewValue: 'Alzheimer' },
    { value: 'Parkinson', viewValue: 'Parkinson' },
    { value: 'Esquizofrenia', viewValue: 'Esquizofrenia' },
    { value: 'Ansiedad', viewValue: 'Ansiedad' },
    { value: 'Trastorno de pánico', viewValue: 'Trastorno de pánico' },
    { value: 'Estrés', viewValue: 'Estrés' },
    { value: 'Bipolar', viewValue: 'Bipolar' },
  ];

  tipos_alergias: select[] = [
    { value: 'Medicamentos', viewValue: 'Medicamentos' },
    { value: 'Alimentos', viewValue: 'Alimentos' },
    { value: 'Cambios de clima', viewValue: 'Cambios de clima' },
    { value: 'Tipo de tela', viewValue: 'Tipos de tela' },
    { value: 'Animales', viewValue: 'Animales' },
    { value: 'Otros', viewValue: 'Otros' },
  ];

  canceres: select[] = [
    { value: 'Mama', viewValue: 'Mama' },
    { value: 'Tiroides', viewValue: 'Tiroides' },
    { value: 'Estómago', viewValue: 'Estómago' },
    { value: 'Páncreas', viewValue: 'Páncreas' },
    { value: 'Testiculo', viewValue: 'Testiculo' },
    { value: 'Pene', viewValue: 'Pene' },
    { value: 'Leucemia', viewValue: 'Leucemia' },
  ];

  practicas_sexuales: PracticasSexuales[] = [];

  periocidades: select[] = [
    { value: 'Regular', viewValue: 'Regular' },
    { value: 'Irregular', viewValue: 'Irregular' },
  ];

  caracteristicas: select[] = [
    { value: 'Abundante', viewValue: 'Abundante' },
    { value: 'Normal', viewValue: 'Normal' },
    { value: 'Escasa', viewValue: 'Escasa' },
  ];

  metodos: MetodoPlanificacion[] = [];

  resultados_embarazos: select[] = [
    { value: 'Sin complicaciones', viewValue: 'Sin complicaciones' },
    { value: 'Con complicaciones', viewValue: 'Con complicaciones' },
  ];


  //id que se recupera del paciente mandado a traer
  id: any;
  ideditarAP: any
  ideditarTX: any
  // variable que identifica si el paciente tiene imagen de perfil
  public noImg: boolean = true;


  // arreglos de cada tipo de interfaz en los que se guardan los datos que se mandan  
  // a traer todos los datos respectivos desde la api
  pacientes: Paciente[];
  antecedentes_familiares: AntecedentesFamiliares[];
  desnutricion_AF: DesnutricionAF[];
  mental_AF: MentalAF[];
  alergia_AF: AlergiaAF[];
  cancer_AF: CancerAF[];
  otro_AF: OtroAF[];
  antecedentes_personales: AntecedentesPersonales[];
  desnutricion_AP: DesnutricionAP[];
  mental_AP: MentalAP[];
  alergia_AP: AlergiaAP[];
  cancer_AP: CancerAP[];
  otro_AP: OtroAP[];
  habitos_toxicologicos: HabitosToxicologicosPersonales[];

  actividades_sexuales: ActividadSexual[];
  antecedentes_ginecologicos: AntecedentesGinecologicos[];
  antecedentes_obstetricos: AntecedentesObstetricos[];
  planificaciones_familiares: PlanificacionesFamiliares[];

  //variable que identifica si un input es editable
  readonlyDatosGenerales: boolean = true;
  disabledDatosGenerales: boolean = true;
  datosRepetido: boolean = true;
  mostrarcuentaycarreca: boolean = true;
  mostrarcuentaalumno: boolean = true;
  readonlyAntecedentesFamiliares: boolean = true;
  readonlyAntecedentesPersonales: boolean = true;
  readonlyHabitosToxicologicos: boolean = true;
  readonlyActividadSexual: boolean = true;
  readonlyAntecedentesObstetricos: boolean = true;
  readonlyAntecedentesGinecologicos: boolean = true;
  readonlyPlanificacionFamiliar: boolean = true;
  ocultarbtnagregardesnutricionAF: boolean = true;
  ocultarbtnagregarmentalAF: boolean = true;
  ocultarbtnagregaralergiaAF: boolean = true;
  ocultarbtnagregarcancerAF: boolean = true;
  ocultarbtnagregarotroAF: boolean = true;
  ocultarbtnagregardesnutricionAP: boolean = true;
  ocultarbtnagregarmentalAP: boolean = true;
  ocultarbtnagregaralergiaAP: boolean = true;
  ocultarbtnagregarcancerAP: boolean = true;
  ocultarbtnagregarotroAP: boolean = true;
  ocultarbtnagregarhospitalaria: boolean = true;
  ocultarbtnagregartoxicologico: boolean = true;
  vercitologia: boolean = true;
  verplanificacion: boolean = true;

  //variable que identifica si un paciente es un alumno
  esAlumno: boolean = true;


  //variable para editar
  editandoToxi: boolean = false;
  editandoDesAP: boolean = false;
  editandoMenAP: boolean = false;
  editandoAleAP: boolean = false;
  editandoCanAP: boolean = false;
  editandoOtroAP: boolean = false;
  editandoHospitalariaAP: boolean = false;


  //variable que identifica si un paciente tiene estos campos
  mostrarAntecedenteGinecologico: boolean = false;
  mostrarAntecedenteObstetrico: boolean = false;
  mostrarPlanificacionFamiliar: boolean = false;

  enfermedadesDesnutricion: string[] = [];
  enfermedadesMentales: string[] = [];
  enfermedadesAlergias: string[] = [];
  enfermedadesCancer: string[] = [];
  habitosToxicologicos: string[] = [];


  constructor(private formularioService: FormularioService,
    private mensaje: MatSnackBar, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    activar: AppComponent, private subsiguiente: MatDialog,
    private pacienteService: PacienteService, public cambiarFoto: MatDialog) {

    activar.mostrar();
    this.mostrarcuentaycarreca = true;
    this.mostrarcuentaalumno = false;
    //para que se mire el telefono arriba    
    this.telefono.telefono = this.numero_telefono.value;
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {


      //obtener los datos de los servicios de la api
      this.cargarPaciente();
      this.cargarEmergenciaPersonaYa();
      this.cargarTelefono();
      this.cargarAntecedentesFamiliares();
      this.cargarAntecedentesPersonales();
      this.cargarDesnnutricionAF();
      this.cargarMentalAF();
      this.cargarAlergiaAF();
      this.cargarCancerAF();
      this.cargarOtrosAF();
      this.cargarDesnnutricionAP();
      this.cargarMentalAP();
      this.cargarAlergiaAP();
      this.cargarCancerAP();
      this.cargarOtrosAP();
      this.cargarHabitoToxicologico();
      this.cargarActividadSexual();

      this.cargarPlanificacionFamiliar();
      this.cargarHospitalarias();
      this.cargarAntecedentesGinecologicos();
      this.cargarAntecedentesObstetricos();


    }
  }                      //FIN DEL CONSTRUCTOR

  generarPDF() {

    this.formularioService.obtenerPaciente(this.id).subscribe((data: any) => {
      this.paciente = data;
    }, (error) => {
      console.log(error);
    });


    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('Constancia').fontSize(16).alignment("center").end
    );

    pdf.add(
      new Txt(
        "\nEl motivo de la presente constancia es para hacerle saber que el alumno " + this.paciente.nombre_completo +
        " con numero de cuenta " + this.paciente.numero_cuenta + " asistio a la cliníca medica de UNAH-TEC Danlí " +
        "por motivos ajenos a su salud.").alignment("justify").end
    );

    pdf.footer([

      new Canvas([
        new Line([10, 10], [200, 10]).end
      ]).alignment("center").end,
      new Txt("firma").alignment("center").end

    ]);

    pdf.create().open();

  }


  //AUTOCOMPLETADO
  // para que se le quite la cosa fea al text area
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;



  autocomplete(inp, arr, control): void {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            control.setValue(inp.value = this.getElementsByTagName("input")[0].value);

            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x: any = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });

    let addActive = (x) => {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }

    let removeActive = (x) => {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    let closeAllLists = (elmnt?: any) => {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }

    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }


  cargarPaciente() {
    this.mostrarcuentaycarreca = true;
    this.mostrarcuentaalumno = false;
    this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente) => {
      this.paciente = data;
      this.cargarInformacionDatosGenerales();
      this.obtenerDatosFormulario();

      //establesco el valor a los formcontrol para que se visualizen
      //en los respectivos inputs de los datos generales
      if (this.paciente.peso == null) {
        this.paciente.temperatura = "0";
        this.paciente.pulso = "0";
        this.paciente.presion = "0";
        this.paciente.imc = "0";
        this.paciente.talla = "0";
        this.paciente.peso = "0";
        this.paciente.prosene = "";
      }

      if (this.paciente.sexo != "Hombre") {
        this.mostrarAntecedenteGinecologico = true;
        this.mostrarAntecedenteObstetrico = true;
      } else {
        this.mostrarAntecedenteGinecologico = false;
        this.mostrarAntecedenteObstetrico = false;
      }



      //si el paciente no es alumno, cambiamos
      //el valor de la variable "esAlumno" a false
      //para mostrar diferente el contenido de los datos
      if (this.paciente.categoria == "Estudiante") {
        this.esAlumno = false;
      } else {
        this.esAlumno = true;
      }

      console.log('Es alumno: ' + this.esAlumno);
      this.formularioService.idActualizar = this.paciente.id_paciente;
      // valido si el paciente tiene imagen, la variable noImg por defecto esta en true
      //si el paciente tiene imagen entonces esta variable cambiara a false
      if (this.paciente.imagen != null) {
        this.noImg = false;
      }
      console.log(this.paciente);
    }, (error) => {
      console.log(error);
    });
  }





  cargarEmergenciaPersonaYa() {
    this.formularioService.obtenerEmergenciaPersona(this.id).subscribe((data: TelefonoEmergencia[]) => {
      this.tel_emergencia = data;
      //cargo los datos de la tabla antecedentes personales
      this.tablaTelefonosEmergencia = new MatTableDataSource(this.tel_emergencia);
      this.cargarTablaEmergenciaPersona();
      console.log(this.tel_emergencia);
    }, (error) => {
      console.log(error);
    });
  }
  loading1: boolean = false;

  cargarTelefono() {
    this.formularioService.obtenerTelefono(this.id).subscribe((data: TelefonoEmergencia[]) => {
      this.tel_persona = data;
      console.log(this.tel_persona);
      //cargo los datos de la tabla antecedentes personales
      this.tablaTelefonos = new MatTableDataSource(this.tel_persona);
      this.cargarTablaEmergenciaPersona();
      console.log(this.tel_persona);
    }, (error) => {
      console.log(error);
    });
  }
  actualizarfoto() {
    const tiempo = timer(4000);

    tiempo.subscribe((n) => {
      this.loading1 = false;
      console.log("foto actualizada");
      this.paciente.imagen = this.pacienteService.imagenactual;
      this.noImg = false;
    });

  }

  //timer para foto
  timeLeft: number = 60;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  //hasta aqui timer
  cargarAntecedentesFamiliares() {
    this.formularioService.obtenerAntecedenteFamiliar(this.id).subscribe((data: AntecedentesFamiliares) => {
      this.ante_familiar = data;
      for (let index = 0; index < this.ante_familiar.length; index++) {
        switch (this.ante_familiar[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaAntecedentesFamiliares();
      console.log(this.ante_familiar);
    }, (error) => {
      console.log(error);
    });
  }



  cargarAntecedentesPersonales() {
    this.formularioService.obtenerAntecedentePersonal(this.id).subscribe((data: AntecedentesPersonales) => {
      this.ante_personal = data;
      for (let index = 0; index < this.ante_personal.length; index++) {
        switch (this.ante_personal[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      //cargo los datos de la tabla antecedentes familiares y telefonos emergencia
      this.cargarTablaAntecedentesPersonales();
      //establesco el valor a los formcontrol para que se visualizen
      //en los respectivos inputs de los antecedentes familiares   
      console.log(this.ante_personal);
    }, (error) => {
      console.log(error);
    });
  }

  cargarDesnnutricionAF() {
    this.formularioService.obtenerDesnutricionesAF(this.id).subscribe((data: DesnutricionAF) => {
      this.ante_familiardesnutricionAF = data;
      for (let index = 0; index < this.ante_familiardesnutricionAF.length; index++) {
        switch (this.ante_familiardesnutricionAF[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaDesnutricionAF();
      console.log(this.ante_familiardesnutricionAF);
    }, (error) => {
      console.log(error);
    });
  }

  cargarMentalAF() {
    this.formularioService.obtenerMentalesAF(this.id).subscribe((data: MentalAF) => {
      this.ante_familiarmentalAF = data;
      for (let index = 0; index < this.ante_familiarmentalAF.length; index++) {
        switch (this.ante_familiarmentalAF[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaMentalAF();
      console.log(this.ante_familiarmentalAF);
    }, (error) => {
      console.log(error);
    });
  }

  cargarAlergiaAF() {
    this.formularioService.obtenerAlergiasAF(this.id).subscribe((data: AlergiaAF) => {
      this.ante_familiaralergiaAF = data;
      for (let index = 0; index < this.ante_familiaralergiaAF.length; index++) {
        switch (this.ante_familiaralergiaAF[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaAlergiaAF();
      console.log(this.ante_familiaralergiaAF);
    }, (error) => {
      console.log(error);
    });
  }

  cargarCancerAF() {
    this.formularioService.obtenerCanceresAF(this.id).subscribe((data: CancerAF) => {
      this.ante_familiarcancerAF = data;
      for (let index = 0; index < this.ante_familiarcancerAF.length; index++) {
        switch (this.ante_familiarcancerAF[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaCancerAF();
      console.log(this.ante_familiarcancerAF);
    }, (error) => {
      console.log(error);
    });
  }

  cargarOtrosAF() {
    this.formularioService.obtenerOtrosAF(this.id).subscribe((data: OtroAF) => {
      this.ante_familiarotroAF = data;
      for (let index = 0; index < this.ante_familiarotroAF.length; index++) {
        switch (this.ante_familiarotroAF[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaOtroAF();
      console.log(this.ante_familiarotroAF);
    }, (error) => {
      console.log(error);
    });
  }





  // estas son las cargas para los antecedentespersonales
  cargarDesnnutricionAP() {
    this.formularioService.obtenerDesnutricionesAP(this.id).subscribe((data: DesnutricionAP) => {
      this.ante_familiardesnutricionAP = data;
      for (let index = 0; index < this.ante_familiardesnutricionAP.length; index++) {
        switch (this.ante_familiardesnutricionAP[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaDesnutricionAP();
      console.log(this.ante_familiardesnutricionAP);
    }, (error) => {
      console.log(error);
    });
  }

  cargarMentalAP() {
    this.formularioService.obtenerMentalesAP(this.id).subscribe((data: MentalAP) => {
      this.ante_familiarmentalAP = data;
      for (let index = 0; index < this.ante_familiarmentalAP.length; index++) {
        switch (this.ante_familiarmentalAP[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaMentalAP();
      console.log(this.ante_familiarmentalAP);
    }, (error) => {
      console.log(error);
    });
  }

  cargarAlergiaAP() {
    this.formularioService.obtenerAlergiasAP(this.id).subscribe((data: AlergiaAP) => {
      this.ante_familiaralergiaAP = data;
      for (let index = 0; index < this.ante_familiaralergiaAP.length; index++) {
        switch (this.ante_familiaralergiaAP[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaAlergiaAP();
      console.log(this.ante_familiaralergiaAP);
    }, (error) => {
      console.log(error);
    });
  }

  cargarCancerAP() {
    this.formularioService.obtenerCanceresAP(this.id).subscribe((data: CancerAP) => {
      this.ante_familiarcancerAP = data;
      for (let index = 0; index < this.ante_familiarcancerAP.length; index++) {
        switch (this.ante_familiarcancerAP[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaCancerAP();
      console.log(this.ante_familiarcancerAP);
    }, (error) => {
      console.log(error);
    });
  }

  cargarOtrosAP() {
    this.formularioService.obtenerOtrosAP(this.id).subscribe((data: OtroAP) => {
      this.ante_familiarotroAP = data;
      for (let index = 0; index < this.ante_familiarotroAP.length; index++) {
        switch (this.ante_familiarotroAP[index].antecedente) {
          case "Convulsiones":
            break;
          default:
            break;
        }
      }
      this.cargarTablaOtroAP();
      console.log(this.ante_familiarotroAP);
    }, (error) => {
      console.log(error);
    });
  }

  cargarHabitoToxicologico() {
    this.formularioService.obtenerHabitoToxicologico(this.id).subscribe((data: HabitosToxicologicosPersonales) => {
      this.habito_toxicologico_personal = data;

      this.habito_toxi = data;
      //cargo los datos de la tabla antecedentes personales
      this.cargarTablaHabitosToxicologicos();
      console.log(this.tablaHabitosToxicologicos);
      //establesco el valor a los formcontrol para que se visualizen
      //en los respectivos inputs de los habitos toxicologicos
      console.log(this.habito_toxi);
      console.log('este es el habito_toxicologico_personal ' + this.habito_toxi);
    }, (error) => {
      console.log(error);
    });
  }

  cargarAntecedentesGinecologicos() {
    this.formularioService.obtenerAntecedenteGinecologico(this.id).subscribe((data) => {
      this.antecedente_ginecologico = data;
      console.log('los datos ginecologicos     :' + this.antecedente_ginecologico);
      //verifico si el paciente tiene antecedentes ginecologicos para mostrarlos

      if (this.antecedente_ginecologico.citologia == 'No') {
        this.vercitologia = false;
      } else if (this.antecedente_ginecologico.citologia == 'Si') {
        this.vercitologia = true;
      }

      this.cargarInformacionAntecedentesGinecologicos();

    }, (error) => {
      console.log(error);
    });
  }

  cargarAntecedentesObstetricos() {
    this.formularioService.obtenerAntecedenteObstetrico(this.id).subscribe((data: AntecedentesObstetricos) => {
      this.antecedente_obstetrico = data;
      this.cargarInformacionAntecedentesObstetricos();
      console.log(this.antecedente_obstetrico);
      console.log('mostrarAntecedenteObstetrico: ' + this.mostrarAntecedenteObstetrico);
    }, (error) => {
      console.log(error);
    });
  }

  cargarAntecedentesObstetricosActualizar() {
    this.formularioService.obtenerAntecedenteObstetrico(this.id).subscribe((data: AntecedentesObstetricos) => {
      this.antecedente_obstetrico = data;
    }, (error) => {
      console.log(error);
    });
  }



  cargarPlanificacionFamiliar() {
    this.formularioService.obtenerPlanificacionFamiliar(this.id).subscribe((data: PlanificacionesFamiliares) => {
      this.planificacion_familiardata = data;

      this.cargarInformacionPlanificacionfamiliar();

      if (this.planificacion_familiardata) {
        if (this.planificacion_familiardata.planificacion_familiar == 'No') {
          this.verplanificacion = false;
        } else if (this.planificacion_familiardata.planificacion_familiar == 'Si') {
          this.verplanificacion = true;
        }
      }

    }, (error) => {
      console.log(error);
    });
  }

  cargarPlanificacionFamiliarActualizar() {
    this.formularioService.obtenerPlanificacionFamiliar(this.id).subscribe((data: PlanificacionesFamiliares) => {
      this.planificacion_familiardata = data;

      if (this.planificacion_familiardata.planificacion_familiar == 'No') {
        this.verplanificacion = false;
      } else if (this.planificacion_familiardata.planificacion_familiar == 'Si') {
        this.verplanificacion = true;
      }

    }, (error) => {
      console.log(error);
    });
  }


  cargarActividadSexual() {
    this.formularioService.obtenerActividadSexual(this.id).subscribe((data: ActividadSexual) => {
      this.actividad_sexual = data;
      this.cargarInformacionActividadSexual();
      console.log('los datos de actividad sexual' + this.actividad_sexual);
      this.act_sex = data;
      if (this.act_sex == null) {
        this.mostrarmensajeactividadsexual = null;
      }
    }, (error) => {
      console.log(error);
    });
  }
  cargarActSexParaAct() {
    this.formularioService.obtenerActividadSexual(this.id).subscribe((data: ActividadSexual) => {
      this.actividad_sexual = data;
    }, (error) => {
      console.log(error);
    });
  }




  cargarHospitalarias() {
    this.formularioService.obtenerhospitalarias_quirurgicas(this.id).subscribe((data: PacienteHospitalariaQuirurgica) => {
      this.hospitalaria_qui = data;
      if (!this.hospitalaria_qui.length) {
        this.tablahospitalarias = null;
      }
      //establesco el valor a los formcontrol para que se visualizen
      //en los respectivos inputs de la actividad sexual
      this.cargarTablaHospitalaria();
    }, (error) => {
      console.log(error);
    });
  }












  perron() {
    console.log('dio perron');
  }

  actualizarDatosGenerales() {

    this.cargarTablaEmergenciaPersona();
    this.readonlyDatosGenerales = !this.readonlyDatosGenerales;
    this.disabledDatosGenerales = !this.disabledDatosGenerales;
    this.datosRepetido = !this.datosRepetido;

    if (this.formulario_datos_generales.valid) {
      if (this.readonlyDatosGenerales === true) {
        this.actualizarDG();
      }
    } else {
      this.showError('Ingrese correctamente los datos');
      this.readonlyDatosGenerales = !this.readonlyDatosGenerales;
      this.disabledDatosGenerales = !this.disabledDatosGenerales;
      this.datosRepetido = !this.datosRepetido;
    }
  }

  actualizarDG() {

    if (this.formulario_datos_generales.dirty) {
      this.paciente.nombre_completo = this.nombre_completo.value;
      this.paciente.numero_cuenta = this.numero_cuenta.value;
      this.paciente.numero_identidad = this.numero_identidad.value;
      this.paciente.lugar_procedencia = this.lugar_procedencia.value;
      this.paciente.direccion = this.direccion.value;
      this.paciente.carrera = this.carrera.value;
      this.paciente.fecha_nacimiento = this.fecha_nacimiento.value;
      this.paciente.sexo = this.sexo.value;
      this.paciente.estado_civil = this.estado_civil.value;
      this.paciente.seguro_medico = this.seguro_medico.value;
      this.paciente.categoria = this.categoria.value;
      this.paciente.peso = this.peso.value;
      this.paciente.presion = this.presion.value;
      this.paciente.talla = this.talla.value;
      this.paciente.temperatura = this.temperatura.value;
      this.paciente.pulso = this.pulso.value;
      this.paciente.prosene = this.prosene.value;

      this.formularioService.actualizarPaciente(this.paciente).subscribe((data) => {
        console.log(data);
        this.cargarPaciente();
        this.agregarTelefonosEmergencia();
        this.agregarTelefonos();
        this.showError('Datos generales actualizado correctamente');
      }, (error) => {
        console.log(error);
        this.showError('Error al actualizar los datos generales');
      });

    }
  }





  agregarTelefonosEmergencia() {
    if (this.emergencia_persona.dirty && this.emergencia_telefono.dirty) {
      this.telefono_Emergencias.id_paciente = this.paciente.id_paciente;
      this.telefono_Emergencias.emergencia_persona = this.emergencia_persona.value;
      this.telefono_Emergencias.telefono_emergencia = this.emergencia_telefono.value;
      this.formularioService.enviarTelefonoEmergencia(this.telefono_Emergencias).subscribe((data) => {
        console.log(data);
        this.cargarEmergenciaPersonaYa();
      }, (error) => {
      });
      this.emergencia_persona.setValue('');
      this.emergencia_telefono.setValue('');
    }
  }


  agregarTelefonos() {
    if (this.numero_telefono_agregar.dirty) {
      this.telefono.id_paciente = this.paciente.id_paciente;
      this.telefono.telefono = this.numero_telefono_agregar.value;
      this.formularioService.enviarTelefonoPaciente(this.telefono).subscribe((data) => {
        console.log(data);
        this.cargarTelefono();
      }, (error) => {
      });
      this.numero_telefono_agregar.setValue('');
    }
  }



  //LAEXPLICACION DE ESTO ESTA EN EL FORMULARIO
  //AGREGAR DESNUTRICIONES
  agregarDesnutricionesAF() {
    if (this.tipo_desnutricion.value && this.tipo_desnutricion.valid && this.parentesco_desnutricion.value) {
      var stringParentesco: string = "";

      if (this.parentesco_desnutricion.value.length == 1) {
        stringParentesco = this.parentescos[this.parentesco_desnutricion.value[0] - 1].viewValue;
      } else {
        this.parentesco_desnutricion.value.forEach(element => {
          element = this.parentescos[element - 1].viewValue;
          stringParentesco += element + " ";
        });
        stringParentesco = stringParentesco.trim();
      }

      this.tablaDesnutricionesAF.push(
        {
          numero: this.tablaDesnutricionesAF.length + 1,
          enfermedad: this.tipo_desnutricion.value,
          parentesco: stringParentesco,
        }
      );

      this.tipo_desnutricion.setValue('');
      this.parentesco_desnutricion.setValue('');
    }
    this.guardarDesnutricionesAF();
  }// fin del boton agregardesnutricionAF

  guardarDesnutricionesAF() {
    this.antecedentesF = [
      {
        antecedente: 9,
        parentesco: this.parentesco_desnutricion.value
      },
    ];

    if (this.formulario_antecedentes_familiares.valid) {
      var parentescos: any;
      var stringParentesco: string[];
      var NumeroParentesco: number;
      const element = this.antecedentesF[0];
      // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
      if (element.antecedente != 0) {
        this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;

        if (element.antecedente == 9) {

          if (this.tablaDesnutricionesAF.length) {
            for (let index = 0; index < this.tablaDesnutricionesAF.length; index++) {
              const element = this.tablaDesnutricionesAF[index];
              // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
              // de la interfaz de enfermedad.
              this.enfermedad.enfermedad = element.enfermedad;
              this.enfermedad.id_grupo_enfermedad = 1;
              this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
                // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_tipo_enfermedad
                // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_familiares.
                this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;
                this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;
                console.log("ultimo antecedente: " + data[0].id_enfermedad);
                // separo el string de parentesco que se guarda en la tabla
                // y lo convierto en un arreglo.
                stringParentesco = element.parentesco.split(' ');
                console.log(stringParentesco);
                // comparo cada string del arreglo de parentesco que se recupera de la tabla
                // y le asigno su valor correspondiente en numero para ser guardado en la base de datos.
                stringParentesco.forEach(element => {
                  switch (element) {
                    case 'Padre':
                      NumeroParentesco = 1;
                      break;
                    case 'Madre':
                      NumeroParentesco = 2;
                      break;
                    case 'Tios':
                      NumeroParentesco = 3;
                      break;
                    case 'Abuelos':
                      NumeroParentesco = 4;
                      break;
                    default:
                      NumeroParentesco = 5;
                      break;
                  }

                  // establezco el valor en numero al atributo id_parentesco de la interfaz paciente_antecedente_familiar
                  // para ser enviado a la base de datos.
                  this.paciente_antecedente_familiar.id_parentesco = NumeroParentesco;
                  console.log(this.paciente_antecedente_familiar);
                  //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                  this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                    this.cargarDesnnutricionAF();
                    this.cargarAntecedentesFamiliares();
                    console.log('se enviaron perron los nuevos antecedentes');
                  }, (error) => {
                    console.log(error);
                  });

                });

              });
            }
          }

        }
        //vacio la tabla para que al agregar otro se vaya sin los datos anteriores
        this.tablaDesnutricionesAF.pop();
      }
    }
  }





  // AGREGANDO LAS ENFERMEDADES MENTALES FAMILIARES
  agregarEnfermedadesMentales() {
    if (this.tipo_enfermedad_mental.value && this.tipo_enfermedad_mental.valid && this.parentesco_enfermedades_mentales.value) {
      var stringParentesco: string = "";

      if (this.parentesco_enfermedades_mentales.value.length == 1) {
        stringParentesco = this.parentescos[this.parentesco_enfermedades_mentales.value[0] - 1].viewValue;
      } else {
        this.parentesco_enfermedades_mentales.value.forEach(element => {
          element = this.parentescos[element - 1].viewValue;
          stringParentesco += element + " ";
        });
        stringParentesco = stringParentesco.trim();
      }

      this.tablaEnfermedadesMentalesAF.push(
        {
          numero: this.tablaEnfermedadesMentalesAF.length + 1,
          enfermedad: this.tipo_enfermedad_mental.value,
          parentesco: stringParentesco,
        }
      );

      this.tipo_enfermedad_mental.setValue('');
      this.parentesco_enfermedades_mentales.setValue('');
    }
    this.guardarEnfermedadesMentales();
  }// fin del boton agregardesnutricionAF

  guardarEnfermedadesMentales() {
    this.antecedentesF = [
      {
        antecedente: 10,
        parentesco: this.parentesco_enfermedades_mentales.value
      },
    ];

    if (this.formulario_antecedentes_familiares.valid) {
      var parentescos: any;
      var stringParentesco: string[];
      var NumeroParentesco: number;
      const element = this.antecedentesF[0];
      // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
      if (element.antecedente != 0) {
        this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;

        if (element.antecedente == 10) {

          if (this.tablaEnfermedadesMentalesAF.length) {
            for (let index = 0; index < this.tablaEnfermedadesMentalesAF.length; index++) {
              const element = this.tablaEnfermedadesMentalesAF[index];
              // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
              // de la interfaz de enfermedad.
              this.enfermedad.enfermedad = element.enfermedad;
              this.enfermedad.id_grupo_enfermedad = 2;
              this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
                // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_tipo_enfermedad
                // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_familiares.
                this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;
                this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;
                console.log("ultimo antecedente: " + data[0].id_enfermedad);
                // separo el string de parentesco que se guarda en la tabla
                // y lo convierto en un arreglo.
                stringParentesco = element.parentesco.split(' ');
                console.log(stringParentesco);
                // comparo cada string del arreglo de parentesco que se recupera de la tabla
                // y le asigno su valor correspondiente en numero para ser guardado en la base de datos.
                stringParentesco.forEach(element => {
                  switch (element) {
                    case 'Padre':
                      NumeroParentesco = 1;
                      break;
                    case 'Madre':
                      NumeroParentesco = 2;
                      break;
                    case 'Tios':
                      NumeroParentesco = 3;
                      break;
                    case 'Abuelos':
                      NumeroParentesco = 4;
                      break;
                    default:
                      NumeroParentesco = 5;
                      break;
                  }

                  // establezco el valor en numero al atributo id_parentesco de la interfaz paciente_antecedente_familiar
                  // para ser enviado a la base de datos.
                  this.paciente_antecedente_familiar.id_parentesco = NumeroParentesco;
                  console.log(this.paciente_antecedente_familiar);
                  //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                  this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                    this.cargarMentalAF();
                    this.cargarAntecedentesFamiliares();
                    console.log('se enviaron perron los nuevos antecedentes');
                  }, (error) => {
                    console.log(error);
                  });

                });

              });
            }
          }

        }
        //vacio la tabla para que al agregar otro se vaya sin los datos anteriores
        this.tablaEnfermedadesMentalesAF.pop();
      }
    }
  }






  // AGREGANDO LAS ENFERMEDADES ALERGICAS FAMILIARES
  agregarAlergias() {
    if (this.tipo_alergia.value && this.tipo_alergia.valid && this.parentesco_alergias.value) {
      var stringParentesco: string = "";

      if (this.parentesco_alergias.value.length == 1) {
        stringParentesco = this.parentescos[this.parentesco_alergias.value[0] - 1].viewValue;
      } else {
        this.parentesco_alergias.value.forEach(element => {
          element = this.parentescos[element - 1].viewValue;
          stringParentesco += element + " ";
        });
        stringParentesco = stringParentesco.trim();
      }

      this.tablaAlergiasAF.push(
        {
          numero: this.tablaAlergiasAF.length + 1,
          enfermedad: this.tipo_alergia.value,
          parentesco: stringParentesco,
        }
      );

      this.tipo_alergia.setValue('');
      this.parentesco_alergias.setValue('');
    }
    this.guardarAlergias();
  }// fin del boton agregardesnutricionAF

  guardarAlergias() {
    this.antecedentesF = [
      {
        antecedente: 11,
        parentesco: this.parentesco_alergias.value
      },
    ];

    if (this.formulario_antecedentes_familiares.valid) {
      var parentescos: any;
      var stringParentesco: string[];
      var NumeroParentesco: number;
      const element = this.antecedentesF[0];
      // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
      if (element.antecedente != 0) {
        this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;

        if (element.antecedente == 11) {

          if (this.tablaAlergiasAF.length) {
            for (let index = 0; index < this.tablaAlergiasAF.length; index++) {
              const element = this.tablaAlergiasAF[index];
              // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
              // de la interfaz de enfermedad.
              this.enfermedad.enfermedad = element.enfermedad;
              this.enfermedad.id_grupo_enfermedad = 3;
              this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
                // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_tipo_enfermedad
                // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_familiares.
                this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;
                this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;
                console.log("ultimo antecedente: " + data[0].id_enfermedad);
                // separo el string de parentesco que se guarda en la tabla
                // y lo convierto en un arreglo.
                stringParentesco = element.parentesco.split(' ');
                console.log(stringParentesco);
                // comparo cada string del arreglo de parentesco que se recupera de la tabla
                // y le asigno su valor correspondiente en numero para ser guardado en la base de datos.
                stringParentesco.forEach(element => {
                  switch (element) {
                    case 'Padre':
                      NumeroParentesco = 1;
                      break;
                    case 'Madre':
                      NumeroParentesco = 2;
                      break;
                    case 'Tios':
                      NumeroParentesco = 3;
                      break;
                    case 'Abuelos':
                      NumeroParentesco = 4;
                      break;
                    default:
                      NumeroParentesco = 5;
                      break;
                  }

                  // establezco el valor en numero al atributo id_parentesco de la interfaz paciente_antecedente_familiar
                  // para ser enviado a la base de datos.
                  this.paciente_antecedente_familiar.id_parentesco = NumeroParentesco;
                  console.log(this.paciente_antecedente_familiar);
                  //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                  this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                    this.cargarAlergiaAF();
                    this.cargarAntecedentesFamiliares();
                    console.log('se enviaron perron los nuevos antecedentes');
                  }, (error) => {
                    console.log(error);
                  });

                });

              });
            }
          }

        }
        //vacio la tabla para que al agregar otro se vaya sin los datos anteriores
        this.tablaAlergiasAF.pop();
      }
    }
  }





  // AGREGANDO LAS ENFERMEDADES CANCERES FAMILIARES
  agregarCanceresAF() {
    if (this.tipo_cancer.value && this.tipo_cancer.valid && this.parentesco_cancer.value) {
      var stringParentesco: string = "";

      if (this.parentesco_cancer.value.length == 1) {
        stringParentesco = this.parentescos[this.parentesco_cancer.value[0] - 1].viewValue;
      } else {
        this.parentesco_cancer.value.forEach(element => {
          element = this.parentescos[element - 1].viewValue;
          stringParentesco += element + " ";
        });
        stringParentesco = stringParentesco.trim();
      }

      this.tablaCanceresAF.push(
        {
          numero: this.tablaCanceresAF.length + 1,
          enfermedad: this.tipo_cancer.value,
          parentesco: stringParentesco,
        }
      );

      this.tipo_cancer.setValue('');
      this.parentesco_cancer.setValue('');
    }
    this.guardarCanceresAF();
  }// fin del boton agregardesnutricionAF

  guardarCanceresAF() {
    this.antecedentesF = [
      {
        antecedente: 12,
        parentesco: this.parentesco_cancer.value
      },
    ];

    if (this.formulario_antecedentes_familiares.valid) {
      var parentescos: any;
      var stringParentesco: string[];
      var NumeroParentesco: number;
      const element = this.antecedentesF[0];
      // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
      if (element.antecedente != 0) {
        this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;

        if (element.antecedente == 12) {

          if (this.tablaCanceresAF.length) {
            for (let index = 0; index < this.tablaCanceresAF.length; index++) {
              const element = this.tablaCanceresAF[index];

              this.enfermedad.enfermedad = element.enfermedad;
              this.enfermedad.id_grupo_enfermedad = 4;
              this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {

                this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;
                this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;
                console.log("ultimo antecedente: " + data[0].id_enfermedad);

                stringParentesco = element.parentesco.split(' ');
                console.log(stringParentesco);

                stringParentesco.forEach(element => {
                  switch (element) {
                    case 'Padre':
                      NumeroParentesco = 1;
                      break;
                    case 'Madre':
                      NumeroParentesco = 2;
                      break;
                    case 'Tios':
                      NumeroParentesco = 3;
                      break;
                    case 'Abuelos':
                      NumeroParentesco = 4;
                      break;
                    default:
                      NumeroParentesco = 5;
                      break;
                  }

                  this.paciente_antecedente_familiar.id_parentesco = NumeroParentesco;
                  console.log(this.paciente_antecedente_familiar);

                  this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                    this.cargarCancerAF();
                    this.cargarAntecedentesFamiliares();
                    console.log('se enviaron perron los nuevos antecedentes');
                  }, (error) => {
                    console.log(error);
                  });

                });

              });
            }
          }

        }
        this.tablaCanceresAF.pop();
      }
    }
  }







  // AGREGANDO LOS OTROS FAMILIARES
  agregarOtrosAF() {
    if (this.otros.value && this.otros.valid && this.parentesco_otros.value) {
      var stringParentesco: string = "";

      if (this.parentesco_otros.value.length == 1) {
        stringParentesco = this.parentescos[this.parentesco_otros.value[0] - 1].viewValue;
      } else {
        this.parentesco_otros.value.forEach(element => {
          element = this.parentescos[element - 1].viewValue;
          stringParentesco += element + " ";
        });
        stringParentesco = stringParentesco.trim();
      }

      this.tablaOtrosAF.push(
        {
          numero: this.tablaCanceresAF.length + 1,
          enfermedad: this.otros.value,
          parentesco: stringParentesco,
        }
      );

      this.otros.setValue('');
      this.parentesco_otros.setValue('');
    }
    this.guardarOtrosAF();
  }// fin del boton agregardesnutricionAF

  guardarOtrosAF() {
    this.antecedentesF = [
      {
        antecedente: 13,
        parentesco: this.parentesco_otros.value
      },
    ];

    if (this.formulario_antecedentes_familiares.valid) {
      var parentescos: any;
      var stringParentesco: string[];
      var NumeroParentesco: number;
      const element = this.antecedentesF[0];
      // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
      if (element.antecedente != 0) {
        this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;

        if (element.antecedente == 13) {

          if (this.tablaOtrosAF.length) {
            for (let index = 0; index < this.tablaOtrosAF.length; index++) {
              const element = this.tablaOtrosAF[index];

              this.enfermedad.enfermedad = element.enfermedad;
              this.enfermedad.id_grupo_enfermedad = 5;
              this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {

                this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;
                this.paciente_antecedente_familiar.id_paciente = this.paciente.id_paciente;
                console.log("ultimo antecedente: " + data[0].id_enfermedad);

                stringParentesco = element.parentesco.split(' ');
                console.log(stringParentesco);

                stringParentesco.forEach(element => {
                  switch (element) {
                    case 'Padre':
                      NumeroParentesco = 1;
                      break;
                    case 'Madre':
                      NumeroParentesco = 2;
                      break;
                    case 'Tios':
                      NumeroParentesco = 3;
                      break;
                    case 'Abuelos':
                      NumeroParentesco = 4;
                      break;
                    default:
                      NumeroParentesco = 5;
                      break;
                  }

                  this.paciente_antecedente_familiar.id_parentesco = NumeroParentesco;
                  console.log(this.paciente_antecedente_familiar);

                  this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                    this.cargarOtrosAF();
                    this.cargarAntecedentesFamiliares();
                    console.log('se enviaron perron los nuevos antecedentes');
                  }, (error) => {
                    console.log(error);
                  });

                });

              });
            }
          }

        }
        this.tablaOtrosAF.pop();
      }
    }
  }


  editarDesnutricionAP(idhtml) {
    this.ideditarAP = idhtml;
    if (this.ideditarAP) {
      this.editandoDesAP = true;

      this.formularioService.obtenerUnaDesnutricionAP(this.ideditarAP).subscribe((data) => {
        this.VarActualizar = data;
        this.tipo_desnutricion_ap.setValue(this.VarActualizar[0].enfermedad);
        this.observacion_desnutricion_ap.setValue(this.VarActualizar[0].observacion);
        console.log(this.VarActualizar);
      }, (error) => {
        console.log(error);
      });
    }
  }
  agregarDesnutricionesAP() {
    if (this.formulario_antecedentes_personales.valid) {
      if (this.editandoDesAP == true) {
        this.editandoDesAP = false;

        this.enfermedadeditar.id_grupo_enfermedad = 1;
        this.enfermedadeditar.enfermedad = this.tipo_desnutricion_ap.value;
        this.enfermedadeditar.id_enfermedadeditar = this.VarActualizar[0].id_enfermedad;

        this.paciente_antecedente_personal.id_enfermedad = this.VarActualizar[0].id_enfermedad;
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_desnutricion_ap.value;

        this.formularioService.actualizarEnfermedad(this.enfermedadeditar).subscribe((data) => {

          this.formularioService.actualizarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            console.log('se enviaron perron los nuevos antecedentes personales');
            this.cargarDesnnutricionAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
          this.tipo_desnutricion_ap.setValue('');
          this.observacion_desnutricion_ap.setValue('');
        });
      } else {
        //agregar uno nuevo
        this.enfermedad.id_grupo_enfermedad = 1;
        this.enfermedad.enfermedad = this.tipo_desnutricion_ap.value;
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_desnutricion_ap.value;

        this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
          this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;
          console.log(data);

          this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            console.log('se enviaron perron los nuevos antecedentes personales');
            this.tipo_desnutricion_ap.setValue('');
            this.observacion_desnutricion_ap.setValue('');
            this.cargarDesnnutricionAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
        });
      }
    }

  }







  editarMentalAP(idhtml) {
    this.ideditarAP = idhtml;
    if (this.ideditarAP) {
      this.editandoMenAP = true;

      this.formularioService.obtenerUnaMentalAP(this.ideditarAP).subscribe((data) => {
        this.VarActualizar = data;
        this.tipo_enfermedad_mental_ap.setValue(this.VarActualizar[0].enfermedad);
        this.observacion_enfermedades_mentales_ap.setValue(this.VarActualizar[0].observacion);
        console.log(this.VarActualizar);
      }, (error) => {
        console.log(error);
      });
    }
  }
  agregarEnfermedadesMentalesAP() {
    if (this.formulario_antecedentes_personales.valid) {
      if (this.editandoMenAP == true) {
        this.editandoMenAP = false;

        this.enfermedadeditar.id_grupo_enfermedad = 2;
        this.enfermedadeditar.enfermedad = this.tipo_enfermedad_mental_ap.value;
        this.enfermedadeditar.id_enfermedadeditar = this.VarActualizar[0].id_enfermedad;

        this.paciente_antecedente_personal.id_enfermedad = this.VarActualizar[0].id_enfermedad;
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_enfermedades_mentales_ap.value;

        this.formularioService.actualizarEnfermedad(this.enfermedadeditar).subscribe((data) => {

          this.formularioService.actualizarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.cargarMentalAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
          this.tipo_enfermedad_mental_ap.setValue('');
          this.observacion_enfermedades_mentales_ap.setValue('');
        });
      } else {
        //agregar uno nuevo
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_enfermedades_mentales_ap.value;
        this.enfermedad.id_grupo_enfermedad = 2;
        this.enfermedad.enfermedad = this.tipo_enfermedad_mental_ap.value;

        this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
          this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

          this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.observacion_enfermedades_mentales_ap.setValue('');
            this.tipo_enfermedad_mental_ap.setValue('');
            this.cargarMentalAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
        });
      }
    }
  }






  editarAlergiaAP(idhtml) {
    this.ideditarAP = idhtml;
    if (this.ideditarAP) {
      this.editandoAleAP = true;

      this.formularioService.obtenerUnaAlergiaAP(this.ideditarAP).subscribe((data) => {
        this.VarActualizar = data;
        this.tipo_alergia_ap.setValue(this.VarActualizar[0].enfermedad);
        this.observacion_alergias_ap.setValue(this.VarActualizar[0].observacion);
        console.log(this.VarActualizar);
      }, (error) => {
        console.log(error);
      });
    }
  }
  agregarAlergiasAP() {
    if (this.formulario_antecedentes_personales.valid) {
      if (this.editandoAleAP == true) {
        this.editandoAleAP = false;

        this.enfermedadeditar.id_grupo_enfermedad = 3;
        this.enfermedadeditar.enfermedad = this.tipo_alergia_ap.value;
        this.enfermedadeditar.id_enfermedadeditar = this.VarActualizar[0].id_enfermedad;

        this.paciente_antecedente_personal.id_enfermedad = this.VarActualizar[0].id_enfermedad;
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_alergias_ap.value;

        this.formularioService.actualizarEnfermedad(this.enfermedadeditar).subscribe((data) => {

          this.formularioService.actualizarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.cargarAlergiaAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
          this.tipo_alergia_ap.setValue('');
          this.observacion_alergias_ap.setValue('');
        });

      } else {
        //agrega uno nuevo
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_alergias_ap.value;
        this.enfermedad.id_grupo_enfermedad = 3;
        this.enfermedad.enfermedad = this.tipo_alergia_ap.value;

        this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
          this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

          this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.observacion_alergias_ap.setValue('');
            this.tipo_alergia_ap.setValue('');
            this.cargarAlergiaAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
        });
      }
    }
  }



  editarCancerAP(idhtml) {
    this.ideditarAP = idhtml;
    if (this.ideditarAP) {
      this.editandoCanAP = true;

      this.formularioService.obtenerUnCancerAP(this.ideditarAP).subscribe((data) => {
        this.VarActualizar = data;
        this.tipo_cancer_ap.setValue(this.VarActualizar[0].enfermedad);
        this.observacion_cancer_ap.setValue(this.VarActualizar[0].observacion);
        console.log(this.VarActualizar);
      }, (error) => {
        console.log(error);
      });
    }
  }
  agregarCanceresAP() {
    if (this.formulario_antecedentes_personales.valid) {
      if (this.editandoCanAP == true) {
        this.editandoCanAP = false;

        this.enfermedadeditar.id_grupo_enfermedad = 4;
        this.enfermedadeditar.enfermedad = this.tipo_cancer_ap.value;
        this.enfermedadeditar.id_enfermedadeditar = this.VarActualizar[0].id_enfermedad;

        this.paciente_antecedente_personal.id_enfermedad = this.VarActualizar[0].id_enfermedad;
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_cancer_ap.value;

        this.formularioService.actualizarEnfermedad(this.enfermedadeditar).subscribe((data) => {

          this.formularioService.actualizarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.cargarCancerAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
          this.tipo_cancer_ap.setValue('');
          this.observacion_cancer_ap.setValue('');
        });

      } else {
        //agrega uno nuevo
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_cancer_ap.value;
        this.enfermedad.id_grupo_enfermedad = 4;
        this.enfermedad.enfermedad = this.tipo_cancer_ap.value;

        this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
          this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

          this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.observacion_cancer_ap.setValue('');
            this.tipo_cancer_ap.setValue('');
            this.cargarCancerAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
        });
      }
    }
  }





  editarOtroAP(idhtml) {
    this.ideditarAP = idhtml;
    if (this.ideditarAP) {
      this.editandoOtroAP = true;

      this.formularioService.obtenerUnOtroAP(this.ideditarAP).subscribe((data) => {
        this.VarActualizar = data;
        this.otros_ap.setValue(this.VarActualizar[0].enfermedad);
        this.observacion_otros_ap.setValue(this.VarActualizar[0].observacion);
        console.log(this.VarActualizar);
      }, (error) => {
        console.log(error);
      });
    }
  }

  agregarOtroAP() {
    if (this.formulario_antecedentes_personales.valid) {
      if (this.editandoOtroAP == true) {
        this.editandoOtroAP = false;


        this.enfermedadeditar.id_grupo_enfermedad = 5;
        this.enfermedadeditar.enfermedad = this.otros_ap.value;
        this.enfermedadeditar.id_enfermedadeditar = this.VarActualizar[0].id_enfermedad;

        this.paciente_antecedente_personal.id_enfermedad = this.VarActualizar[0].id_enfermedad;
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_otros_ap.value;

        this.formularioService.actualizarEnfermedad(this.enfermedadeditar).subscribe((data) => {

          this.formularioService.actualizarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.cargarOtrosAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
          this.otros_ap.setValue('');
          this.observacion_otros_ap.setValue('');
          this.cargarOtrosAP();
        });

      } else {
        //agrega uno nuevo 
        this.paciente_antecedente_personal.id_paciente = this.paciente.id_paciente;
        this.paciente_antecedente_personal.observacion = this.observacion_otros_ap.value;
        this.enfermedad.id_grupo_enfermedad = 5;
        this.enfermedad.enfermedad = this.otros_ap.value;

        this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {
          this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

          this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
            this.observacion_otros_ap.setValue('');
            this.otros_ap.setValue('');
            this.cargarOtrosAP();
            this.cargarAntecedentesPersonales();
          }, (error) => {
            console.log(error);
          });
        });
      }
    }

  }

  editarHospitalariaAP(idhtml) {
    this.ideditarAP = idhtml;
    if (this.ideditarAP) {
      this.editandoHospitalariaAP = true;

      this.formularioService.obtenerUnahospitalaria_quirurgica(this.ideditarAP).subscribe((data) => {
        this.VarActualizar = data;
        this.fecha_antecedente_hospitalario.setValue(this.VarActualizar[0].fecha);
        this.tiempo_hospitalizacion.setValue(this.VarActualizar[0].tiempo_hospitalizacion);
        this.tratamiento.setValue(this.VarActualizar[0].tratamiento);
        this.diagnostico.setValue(this.VarActualizar[0].diagnostico);
        console.log(this.VarActualizar);
      }, (error) => {
        console.log(error);
      });
    }
  }
  agregarHospitalariasQuirurgicas() {
    if (this.formulario_antecedentes_personales.valid) {
      if (this.editandoHospitalariaAP == true) {
        this.editandoHospitalariaAP = false;


        this.paciente_hospitalaria_quirurgica.id_paciente = this.paciente.id_paciente;
        this.paciente_hospitalaria_quirurgica.fecha = this.fecha_antecedente_hospitalario.value;
        this.paciente_hospitalaria_quirurgica.tiempo_hospitalizacion = this.tiempo_hospitalizacion.value;
        this.paciente_hospitalaria_quirurgica.diagnostico = this.diagnostico.value;
        this.paciente_hospitalaria_quirurgica.tratamiento = this.tratamiento.value;
        this.paciente_hospitalaria_quirurgica.id_hospitalaria_quirurgica = this.VarActualizar[0].id_hospitalaria_quirurgica;

        console.log('la hospitalaria:  ' + this.paciente_hospitalaria_quirurgica);
        this.formularioService.actualizarPacienteHospitalariaQuirurgica(this.paciente_hospitalaria_quirurgica).subscribe(
          (data) => {
            this.fecha_antecedente_hospitalario.setValue('');
            this.tiempo_hospitalizacion.setValue('');
            this.diagnostico.setValue('');
            this.tratamiento.setValue('');
            this.cargarHospitalarias();
          }
        );

      } else {
        //agrega uno nuevo 
        this.paciente_hospitalaria_quirurgica.id_paciente = this.paciente.id_paciente;
        this.paciente_hospitalaria_quirurgica.fecha = this.fecha_antecedente_hospitalario.value;
        this.paciente_hospitalaria_quirurgica.tiempo_hospitalizacion = this.tiempo_hospitalizacion.value;
        this.paciente_hospitalaria_quirurgica.diagnostico = this.diagnostico.value;
        this.paciente_hospitalaria_quirurgica.tratamiento = this.tratamiento.value;


        console.log('la hospitalaria:  ' + this.paciente_hospitalaria_quirurgica);
        this.formularioService.enviarPacienteHospitalariaQuirurgica(this.paciente_hospitalaria_quirurgica).subscribe(
          (data) => {
            this.fecha_antecedente_hospitalario.setValue('');
            this.tiempo_hospitalizacion.setValue('');
            this.diagnostico.setValue('');
            this.tratamiento.setValue('');
            this.cargarHospitalarias();
          }
        );

      }
    }

  }


  actualizarHabitosToxicologicos(idhtml) {
    this.ideditarTX = idhtml;
    if (this.ideditarTX) {
      this.editandoToxi = true;

      this.formularioService.obtenerUnhabito(this.ideditarTX).subscribe((data: HabitosToxicologicosPersonales) => {
        this.VarActualizar = data;
        this.otros_ht.setValue(this.VarActualizar[0].habito_toxicologico);
        this.observacion_otros_ht.setValue(this.VarActualizar[0].observacion);
        console.log(this.VarActualizar);
      }, (error) => {
        console.log(error);
      });
    }
  }

  agregarHabitoToxicologico() {
    if (this.editandoToxi == true) {

      if (this.formulario_habito_toxicologico_personal.valid) {
        this.habito_toxicologico.habito_toxicologico = this.otros_ht.value;
        this.habito_toxicologico.idhabitotoxicologico = this.VarActualizar[0].id_habito_toxicologico;
        this.paciente_habito_toxicologico.id_paciente = this.paciente.id_paciente;
        this.paciente_habito_toxicologico.observacion = this.observacion_otros_ht.value;
        this.paciente_habito_toxicologico.id_habito_toxicologico = this.VarActualizar[0].id_paciente_habito_toxicologico;
        console.log("id actulizar: " + this.VarActualizar[0].id_paciente_habito_toxicologico);


        this.formularioService.actualizarHabitoToxicologico(this.habito_toxicologico).subscribe((data) => {

          this.formularioService.actualizarPacienteHabitoToxicologico(this.paciente_habito_toxicologico).subscribe((data) => {
            console.log('se actualizaron los habitos toxicologicos' + data);
            this.cargarHabitoToxicologico();
          }, (error) => {
            console.log(error);
          });
          this.observacion_otros_ht.setValue('');
          this.otros_ht.setValue('');

        }, (error) => {
          console.log(error);
        });
      }

    } else {

      if (this.formulario_habito_toxicologico_personal.valid) {
        this.habito_toxicologico.habito_toxicologico = this.otros_ht.value;
        this.paciente_habito_toxicologico.id_paciente = this.paciente.id_paciente;
        this.paciente_habito_toxicologico.observacion = this.observacion_otros_ht.value;

        this.formularioService.enviarHabitoToxicologico(this.habito_toxicologico).subscribe((data) => {

          // consulta sql
          this.paciente_habito_toxicologico.id_habito_toxicologico = data[0].id_habito_toxicologico;
          console.log("ultimo habito: " + data[0].id_habito_toxicologico);

          this.formularioService.enviarPacienteHabitoToxicologico(this.paciente_habito_toxicologico).subscribe((data) => {
            console.log('se enviaron perron los nuevos habitos toxicologicos');
            this.cargarHabitoToxicologico();
          }, (error) => {
            console.log(error);
          });
        });
        this.observacion_otros_ht.setValue('');
        this.otros_ht.setValue('');
      }
    }
  }


  eliminarTelefonosEmergencia(id) {
    if (this.tel_emergencia.length > 1) {
      const dialogRef = this.dialog.open(Borrartelefonoemergencia, {
        disableClose: true,
        panelClass: 'borrar',
        data: id
      });
      dialogRef.beforeClosed().subscribe(result => {
        this.cargarEmergenciaPersonaYa();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarEmergenciaPersonaYa();
      });
    } else {
      this.showError('Debe tener al menos un registro');
    }

  }

  eliminarTelefono(id) {
    if (this.tel_persona.length > 1) {
      const dialogRef = this.dialog.open(Borrartelefono, {
        disableClose: true,
        panelClass: 'borrar',
        data: id
      });
      dialogRef.beforeClosed().subscribe(result => {
        this.cargarTelefono();
      });
      dialogRef.afterClosed().subscribe(result => {
        this.cargarTelefono();
      });
    } else {
      this.showError('Debe tener al menos un registro');
    }

  }


  eliminarDesnutricionAF(id) {
    const dialogRef = this.dialog.open(BorrarDesnutricionAF, {
      disableClose: true,
      panelClass: 'borrar',
      data: id
    });
    dialogRef.beforeClosed().subscribe(result => {
      this.cargarDesnnutricionAF();
      this.cargarMentalAF();
      this.cargarAlergiaAF();
      this.cargarCancerAF();
      this.cargarOtrosAF();
      this.cargarAntecedentesFamiliares();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarDesnnutricionAF();
      this.cargarMentalAF();
      this.cargarAlergiaAF();
      this.cargarCancerAF();
      this.cargarOtrosAF();
      this.cargarAntecedentesFamiliares();
    });
  }


  eliminarDesnutricionAP(id) {
    this.tipo_desnutricion_ap.setValue('');
    this.observacion_desnutricion_ap.setValue('');
    this.tipo_enfermedad_mental_ap.setValue('');
    this.observacion_enfermedades_mentales_ap.setValue('');
    this.tipo_alergia_ap.setValue('');
    this.observacion_alergias_ap.setValue('');
    this.tipo_cancer_ap.setValue('');
    this.observacion_cancer_ap.setValue('');
    this.otros_ap.setValue('');
    this.observacion_otros_ap.setValue('');

    const dialogRef = this.dialog.open(BorrarDesnutricionAP, {
      disableClose: true,
      panelClass: 'borrar',
      data: id
    });

    dialogRef.beforeClosed().subscribe(result => {
      this.cargarDesnnutricionAP();
      this.cargarMentalAP();
      this.cargarAlergiaAP();
      this.cargarCancerAP();
      this.cargarOtrosAP();
      this.cargarAntecedentesPersonales();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarDesnnutricionAP();
      this.cargarMentalAP();
      this.cargarAlergiaAP();
      this.cargarCancerAP();
      this.cargarOtrosAP();
      this.cargarAntecedentesPersonales();
    });
  }

  eliminarHospitalaria(id) {
    const dialogRef = this.dialog.open(BorrarHospitalarias, {
      disableClose: true,
      panelClass: 'borrar',
      data: id
    });
    dialogRef.beforeClosed().subscribe(result => {
      this.cargarHospitalarias();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarHospitalarias();
    });
  }

  eliminarHabitoToxicologico(id) {
    const dialogRef = this.dialog.open(BorrarHabitoToxicologico, {
      disableClose: true,
      panelClass: 'borrar',
      data: id
    });
    dialogRef.beforeClosed().subscribe(result => {
      this.cargarHabitoToxicologico();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarHabitoToxicologico();
    });
  }









  actualizarActividadSexual() {
    if (this.readonlyActividadSexual == true) {
      if (this.formulario_actividad_sexual.valid) {
        // guardar datos del formulario en actividad_sexual y enviarlo a la api

        if (this.actividad_sexual != null) {
          this.actividad_sexual.actividad_sexual = this.actividad_sexuall.value;
          this.actividad_sexual.edad_inicio_sexual = this.edad_inicio_sexual.value;
          this.actividad_sexual.numero_parejas_sexuales = this.numero_parejas_sexuales.value;
          this.actividad_sexual.practicas_sexuales_riesgo = this.practicas_sexuales_riesgo.value;

          this.formularioService.actualizarActividadSexual(this.actividad_sexual).subscribe((data) => {
            this.showError('Actividad sexual actualizado correctamente');
          }, (error) => {
            console.log(error);
            this.showError('Error al actualizar los Actividad sexual');
          });
        } else {
          this.actividad_sexual_add.actividad_sexual = this.actividad_sexuall.value;
          this.actividad_sexual_add.edad_inicio_sexual = this.edad_inicio_sexual.value;
          this.actividad_sexual_add.numero_parejas_sexuales = this.numero_parejas_sexuales.value;
          this.actividad_sexual_add.practicas_sexuales_riesgo = this.practicas_sexuales_riesgo.value;
          this.actividad_sexual_add.id_paciente = this.paciente.id_paciente;
          console.log(this.actividad_sexual_add);

          this.formularioService.eliminarActividadSexual(this.id).subscribe((data) => {
            console.log(data);
            this.formularioService.guardarActividadSexual(this.actividad_sexual_add).subscribe((data) => {
              this.showError('Agrego');
              console.log(data);
            }, (error) => {
              console.log(error);
              this.showError('Error al agregar los Actividad sexual');
            });

          });
        }

      }
    }
  }



  actualizarAntecedentesGinecologicos() {
    if (this.readonlyAntecedentesGinecologicos == true) {
      if (this.formulario_antecedente_ginecologico.dirty) {
        if (this.formulario_antecedente_ginecologico.valid) {

          if (this.antecedente_ginecologico == null) {
            this.antecedente_ginecologico_add.edad_inicio_menstruacion = this.edad_inicio_menstruacion.value;
            this.antecedente_ginecologico_add.fum = this.fum.value;
            this.antecedente_ginecologico_add.citologia = this.citologia.value;
            this.antecedente_ginecologico_add.fecha_citologia = this.fecha_citologia.value;
            this.antecedente_ginecologico_add.resultado_citologia = this.resultado_citologia.value;
            this.antecedente_ginecologico_add.duracion_ciclo_menstrual = this.duracion_ciclo_menstrual.value;
            this.antecedente_ginecologico_add.periocidad_ciclo_menstrual = this.periocidad_ciclo_menstrual.value;
            this.antecedente_ginecologico_add.caracteristicas_ciclo_menstrual = this.caracteristicas_ciclo_menstrual.value;
            this.antecedente_ginecologico_add.id_paciente = this.paciente.id_paciente;
            console.log(this.antecedente_ginecologico_add);
            this.formularioService.guardarAntecedentesGinecologicos(this.antecedente_ginecologico_add).subscribe((data) => {
              console.log(data);
              this.showError('GUARDO');
            }, (error) => {
              console.log(error);
              this.showError('Error al actualizar los antecedentes ginecologicos');
            });

          } else {
            this.antecedente_ginecologico.edad_inicio_menstruacion = this.edad_inicio_menstruacion.value;
            this.antecedente_ginecologico.fum = this.fum.value;
            this.antecedente_ginecologico.citologia = this.citologia.value;
            this.antecedente_ginecologico.fecha_citologia = this.fecha_citologia.value;
            this.antecedente_ginecologico.resultado_citologia = this.resultado_citologia.value;
            this.antecedente_ginecologico.duracion_ciclo_menstrual = this.duracion_ciclo_menstrual.value;
            this.antecedente_ginecologico.periocidad_ciclo_menstrual = this.periocidad_ciclo_menstrual.value;
            this.antecedente_ginecologico.caracteristicas_ciclo_menstrual = this.caracteristicas_ciclo_menstrual.value;
            this.formularioService.actualizarAntecedenteGinecologico(this.antecedente_ginecologico).subscribe((data) => {
              console.log(data);
              this.showError('Antecedentes ginecologicos actualizado correctamente');
            }, (error) => {
              console.log(error);
              this.showError('Error al actualizar los antecedentes ginecologicos');
            });
          }
        }
      }
    }
  }


  actualizarPlanificacionFamiliar() {

    if (this.readonlyPlanificacionFamiliar) {
      if (this.formulario_planificacion_familiar.dirty) {
        if (this.formulario_planificacion_familiar.valid) {

          if (this.planificacion_familiardata == null) {

            this.planificacion_familiardata_add.planificacion_familiar = this.planificacion_familiarr.value;
            this.planificacion_familiardata_add.metodo_planificacion = this.metodo_planificacion.value;
            this.planificacion_familiardata_add.observacion_planificacion = this.observacion_planificacion.value;
            this.planificacion_familiardata_add.id_paciente = this.paciente.id_paciente;
            this.formularioService.eliminarPlanificacionFam(this.id).subscribe((data) => {
              console.log(data);

              this.formularioService.guardarPlanificacionesFamiliares(this.planificacion_familiardata_add).subscribe((data) => {
                this.showError('GUARDO');
              }, (error) => {
                console.log(error);
                this.showError('Error al actualizar los Planificacion Familiar');
              });
            });
          } else {
            this.planificacion_familiardata.planificacion_familiar = this.planificacion_familiarr.value;
            this.planificacion_familiardata.metodo_planificacion = this.metodo_planificacion.value;
            this.planificacion_familiardata.observacion_planificacion = this.observacion_planificacion.value;
            this.formularioService.actualizarPlanificacionFamiliar(this.planificacion_familiardata).subscribe((data) => {
              this.showError('Planificacion Familiar actualizado correctamente');
            }, (error) => {
              console.log(error);
              this.showError('Error al actualizar los Planificacion Familiar');
            });
          }



        }
      }
    }
  }


  actualizarAntecedentesObstetricos() {
    if (this.readonlyAntecedentesObstetricos == true) {
      if (this.formulario_antecedente_obstetrico.dirty) {
        if (this.formulario_antecedente_obstetrico.valid) {
          // guardar datos del formulario en antecedente_obstetrico y enviarlo a la api
          if (this.antecedente_obstetrico == null) {
            this.antecedente_obstetrico_add.partos = this.partos.value;
            this.antecedente_obstetrico_add.abortos = this.abortos.value;
            this.antecedente_obstetrico_add.cesarias = this.cesarias.value;
            this.antecedente_obstetrico_add.hijos_vivos = this.hijos_vivos.value;
            this.antecedente_obstetrico_add.hijos_muertos = this.hijos_muertos.value;
            this.antecedente_obstetrico_add.fecha_termino_ult_embarazo = this.fecha_termino_ult_embarazo.value;
            this.antecedente_obstetrico_add.descripcion_termino_ult_embarazo = this.descripcion_termino_ult_embarazo.value;
            this.antecedente_obstetrico_add.observaciones = this.observaciones.value;
            this.antecedente_obstetrico_add.id_paciente = this.paciente.id_paciente;

            this.formularioService.guardarAntecedentesObstetricos(this.antecedente_obstetrico_add).subscribe((data) => {
              this.showError('GUARDO');
            }, (error) => {
              console.log(error);
              this.showError('Error al actualizar los antecedentes obstetricos');
            });

          } else {
            this.antecedente_obstetrico.partos = this.partos.value;
            this.antecedente_obstetrico.abortos = this.abortos.value;
            this.antecedente_obstetrico.cesarias = this.cesarias.value;
            this.antecedente_obstetrico.hijos_vivos = this.hijos_vivos.value;
            this.antecedente_obstetrico.hijos_muertos = this.hijos_muertos.value;
            this.antecedente_obstetrico.fecha_termino_ult_embarazo = this.fecha_termino_ult_embarazo.value;
            this.antecedente_obstetrico.descripcion_termino_ult_embarazo = this.descripcion_termino_ult_embarazo.value;
            this.antecedente_obstetrico.observaciones = this.observaciones.value;

            this.formularioService.actualizarAntecedenteObstetrico(this.antecedente_obstetrico).subscribe((data) => {
              console.log(data);
              this.showError('Antecedentes obstetricos actualizado correctamente');
            }, (error) => {
              console.log(error);
              this.showError('Error al actualizar los antecedentes obstetricos');
            });
          }

        }
      }
    }
  }









  ngOnInit() {

  }
  mostrarcuenta(event) {
    console.log(event);
    if (event == 3) {
      this.mostrarcuentaycarreca = false;
      this.mostrarcuentaalumno = false;

    } else {
      this.mostrarcuentaycarreca = true;
      this.mostrarcuentaalumno = true;
    }

  }
  obtenerDatosFormulario() {

    this.formularioService.obtenerParentescos().subscribe((data: any[]) => {
      data.forEach(element => {
        this.parentescos.push({ value: element.id_parentesco, viewValue: element.parentesco });
      });
    });

    this.formularioService.obtenerEstadosCiviles().subscribe((data: any[]) => {
      data.forEach(element => {
        this.estados_civiles.push({ value: element.id_estado_civil, viewValue: element.estado_civil });
      });
    });

    this.formularioService.obtenerSegurosMedicos().subscribe((data: any[]) => {
      data.forEach(element => {
        this.seguros_medicos.push({ value: element.id_seguro_medico, viewValue: element.seguro_medico });
      });
    });

    this.formularioService.obtenerPracticasSexuales().subscribe((data: any[]) => {
      data.forEach(element => {
        this.practicas_sexuales.push({ value: element.id_practica_sexual, viewValue: element.practicas_sexuales_riesgo });
      });
    });

    this.formularioService.obtenerMetodosPlanificaciones().subscribe((data: any[]) => {
      data.forEach(element => {
        this.metodos.push({ value: element.id_metodo_planificacion, viewValue: element.metodo_planificacion });
      });
    });

    this.formularioService.obtenerColumnaEnfermedades(1).subscribe((data: any[]) => {
      data.forEach(element => {
        this.enfermedadesDesnutricion.push(element.enfermedad);
      });
    });

    this.formularioService.obtenerColumnaEnfermedades(2).subscribe((data: any[]) => {
      data.forEach(element => {
        this.enfermedadesMentales.push(element.enfermedad);
      });
    });

    this.formularioService.obtenerColumnaEnfermedades(3).subscribe((data: any[]) => {
      data.forEach(element => {
        this.enfermedadesAlergias.push(element.enfermedad);
      });
    });

    this.formularioService.obtenerColumnaEnfermedades(4).subscribe((data: any[]) => {
      data.forEach(element => {
        this.enfermedadesCancer.push(element.enfermedad);
      });
    });


    this.formularioService.obtenerColumnaHabitoToxicologico().subscribe((data: any[]) => {
      data.forEach(element => {
        this.habitosToxicologicos.push(element.habito_toxicologico);
      });
    });

  }



  @Input() cambios: string = this.otros.value;
  ngOnChanges(changes: SimpleChanges) {
    console.log('se ejecuto el onChanges')
    // if (changes['cambios']) {
    //   console.log(this.cambios);
    // }   
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////



  cargarTablaAntecedentesFamiliares() {
    // establesco los valores a el arreglo de interfaces "tablaAntecedentesFamiliares"    
    this.tablaAntecedentesFamiliares = new MatTableDataSource(this.ante_familiar);
    // verifico si otro tiene un valor para poder agregarlo a la tabla       
    if (!this.ante_familiar.length) {
      this.tablaAntecedentesFamiliares = null;
    }
  }

  cargarTablaAntecedentesPersonales() {
    this.tablaAntecedentesPersonales = new MatTableDataSource(this.ante_personal);
    if (!this.ante_personal.length) {
      this.tablaAntecedentesPersonales = null;
    }
  }

  cargarTablaDesnutricionAF() {
    this.tablaDesnutricionAF = new MatTableDataSource(this.ante_familiardesnutricionAF);
    if (!this.ante_familiardesnutricionAF.length) {
      this.tablaDesnutricionAF = null;
    }
  }
  cargarTablaMentalAF() {
    this.tablaMentalAF = new MatTableDataSource(this.ante_familiarmentalAF);
    if (!this.ante_familiarmentalAF.length) {
      this.tablaMentalAF = null;
    }
  }
  cargarTablaAlergiaAF() {
    this.tablaAlergiaAF = new MatTableDataSource(this.ante_familiaralergiaAF);
    if (!this.ante_familiaralergiaAF.length) {
      this.tablaAlergiaAF = null;
    }
  }
  cargarTablaCancerAF() {
    this.tablaCancerAF = new MatTableDataSource(this.ante_familiarcancerAF);
    if (!this.ante_familiarcancerAF.length) {
      this.tablaCancerAF = null;
    }
  }
  cargarTablaOtroAF() {
    this.tablaOtroAF = new MatTableDataSource(this.ante_familiarotroAF);
    if (!this.ante_familiarotroAF.length) {
      this.tablaOtroAF = null;
    }
  }
  cargarTablaDesnutricionAP() {
    this.tablaDesnutricionAP = new MatTableDataSource(this.ante_familiardesnutricionAP);
    if (!this.ante_familiardesnutricionAP.length) {
      this.tablaDesnutricionAP = null;
    }
  }
  cargarTablaMentalAP() {
    this.tablaMentalAP = new MatTableDataSource(this.ante_familiarmentalAP);
    if (!this.ante_familiarmentalAP.length) {
      this.tablaMentalAP = null;
    }
  }
  cargarTablaAlergiaAP() {
    this.tablaAlergiaAP = new MatTableDataSource(this.ante_familiaralergiaAP);
    if (!this.ante_familiaralergiaAP.length) {
      this.tablaAlergiaAP = null;
    }
  }
  cargarTablaCancerAP() {
    this.tablaCancerAP = new MatTableDataSource(this.ante_familiarcancerAP);
    if (!this.ante_familiarcancerAP.length) {
      this.tablaCancerAP = null;
    }
  }
  cargarTablaOtroAP() {
    this.tablaOtroAP = new MatTableDataSource(this.ante_familiarotroAP);
    if (!this.ante_familiarotroAP.length) {
      this.tablaOtroAP = null;
    }
  }

  cargarTablaHospitalaria() {
    this.tablahospitalarias = new MatTableDataSource(this.hospitalaria_qui);
    if (!this.hospitalaria_qui.length) {
      this.tablahospitalarias = null;
    }
  }







  cargarTablaHabitosToxicologicos() {
    this.tablaHabitosToxicologicos = new MatTableDataSource(this.habito_toxi);
    if (!this.habito_toxi.length) {
      this.tablaHabitosToxicologicos = null;
    }
  }

  cargarTablaEmergenciaPersona() {
    this.tablaTelefonosEmergencia = new MatTableDataSource(this.tel_emergencia);
  }


  cargarInformacionDatosGenerales() {
    //establesco el valor a los formControl de formulario_datos_generales
    //para que aparescan cargados en los inputs 
    this.nombre_completo.setValue(this.paciente.nombre_completo);
    this.numero_identidad.setValue(this.paciente.numero_identidad);
    this.numero_cuenta.setValue(this.paciente.numero_cuenta);
    this.carrera.setValue(this.paciente.carrera);
    this.sexo.setValue(this.paciente.sexo);
    this.lugar_procedencia.setValue(this.paciente.lugar_procedencia);
    this.direccion.setValue(this.paciente.direccion);
    this.fecha_nacimiento.setValue(this.paciente.fecha_nacimiento);

    // this.estado_civil.setValue(this.paciente.estado_civil);
    // this.categoria.setValue(this.paciente.categoria);
    // this.seguro_medico.setValue(this.paciente.seguro_medico);

    switch (this.paciente.estado_civil) {
      case "Soltero":
        this.estado_civil.setValue(1);
        break;
      case "Union Libre":
        this.estado_civil.setValue(2);
        break;
      case "Divorciado":
        this.estado_civil.setValue(3);
        break;
      case "Viudo":
        this.estado_civil.setValue(4);
        break;
      default:
        this.estado_civil.setValue(5);
        break;
    }

    switch (this.paciente.seguro_medico) {
      case "Privado":
        this.seguro_medico.setValue(1);
        break;
      case "IHSS":
        this.seguro_medico.setValue(2);
        break;
      default:
        this.seguro_medico.setValue(3);
        break;
    }

    switch (this.paciente.categoria) {
      case "Estudiante":
        this.categoria.setValue(3);
        break;
      case "Visitante":
        this.categoria.setValue(2);
        break;
      default:
        this.categoria.setValue(1);
        break;
    }

    this.numero_telefono.setValue(this.paciente.telefono);
    this.temperatura.setValue(this.paciente.temperatura);
    this.pulso.setValue(this.paciente.pulso);
    this.presion.setValue(this.paciente.presion);
    this.talla.setValue(this.paciente.talla);
    this.peso.setValue(this.paciente.peso);
    this.prosene.setValue(this.paciente.prosene);


  }




  cargarInformacionEmergenciaPersona() {
    this.emergencia_persona.setValue(this.telefono_Emergencias.emergencia_persona);
    this.emergencia_telefono.setValue(this.telefono_Emergencias.telefono_emergencia);

  }



  cambiarInformacionActividadSexual() {

    if (this.readonlyActividadSexual) {
      switch (this.practicas_sexuales_riesgo.value) {
        case 1:
          this.practicas_sexuales_riesgo.setValue("Anal");
          break;
        case 2:
          this.practicas_sexuales_riesgo.setValue("Vaginal");
          break;
        case 3:
          this.practicas_sexuales_riesgo.setValue("Oral");
          break;
        default:
          this.practicas_sexuales_riesgo.setValue("No especificado aún");
          break;


      }
    } else {

      switch (this.practicas_sexuales_riesgo.value) {
        case "Anal":
          this.practicas_sexuales_riesgo.setValue(1);
          break;
        case "Vaginal":
          this.practicas_sexuales_riesgo.setValue(2);
          break; case "Oral":
          this.practicas_sexuales_riesgo.setValue(3);
          break;
        default:

          break;


      }
    }
  }



  cargarInformacionActividadSexual() {
    if (this.actividad_sexual) {


      this.actividad_sexuall.setValue(this.actividad_sexual.actividad_sexual);
      this.edad_inicio_sexual.setValue(this.actividad_sexual.edad_inicio_sexual);
      this.numero_parejas_sexuales.setValue(this.actividad_sexual.numero_parejas_sexuales);

      switch (this.actividad_sexual.practicas_sexuales_riesgo) {
        case 1:
          this.actividad_sexual.practicas_sexuales_riesgo = "Anal";
          break;
        case 2:
          this.actividad_sexual.practicas_sexuales_riesgo = "Vaginal";
          break;
        case 3:
          this.actividad_sexual.practicas_sexuales_riesgo = "Oral";
          break;
        default:

          break;
      }

      this.practicas_sexuales_riesgo.setValue(this.actividad_sexual.practicas_sexuales_riesgo);

      if (this.actividad_sexuall.value == "No") {
        this.edad_inicio_sexual.disable({ onlySelf: true });
        this.numero_parejas_sexuales.disable({ onlySelf: true });
        this.practicas_sexuales_riesgo.disable({ onlySelf: true });
      } else {
        this.edad_inicio_sexual.setValidators([Validators.required]);
        this.numero_parejas_sexuales.setValidators([Validators.required]);
        // this.practicas_sexuales_riesgo.setValidators([Validators.required]);
      }
    }
  }



  cargarInformacionAntecedentesGinecologicos() {
    this.edad_inicio_menstruacion.setValue(this.antecedente_ginecologico.edad_inicio_menstruacion);
    this.fum.setValue(this.antecedente_ginecologico.fum);
    this.citologia.setValue(this.antecedente_ginecologico.citologia);
    this.fecha_citologia.setValue(this.antecedente_ginecologico.fecha_citologia);
    this.resultado_citologia.setValue(this.antecedente_ginecologico.resultado_citologia);

    if (this.citologia.value == "No") {
      this.fecha_citologia.disable({ onlySelf: true });
      this.resultado_citologia.disable({ onlySelf: true });
    }

    this.duracion_ciclo_menstrual.setValue(this.antecedente_ginecologico.duracion_ciclo_menstrual);
    this.periocidad_ciclo_menstrual.setValue(this.antecedente_ginecologico.periocidad_ciclo_menstrual);
    this.caracteristicas_ciclo_menstrual.setValue(this.antecedente_ginecologico.caracteristicas_ciclo_menstrual);
  }



  cargarInformacionAntecedentesObstetricos() {
    this.partos.setValue(this.antecedente_obstetrico.partos);
    this.abortos.setValue(this.antecedente_obstetrico.abortos);
    this.cesarias.setValue(this.antecedente_obstetrico.cesarias);
    this.hijos_vivos.setValue(this.antecedente_obstetrico.hijos_vivos);

    this.hijos_muertos.setValue(this.antecedente_obstetrico.hijos_muertos);
    this.fecha_termino_ult_embarazo.setValue(this.antecedente_obstetrico.fecha_termino_ult_embarazo);
    this.descripcion_termino_ult_embarazo.setValue(this.antecedente_obstetrico.descripcion_termino_ult_embarazo);
    this.observaciones.setValue(this.antecedente_obstetrico.observaciones);
  }


  cambiarInformacionPlanificacionFamiliar() {
    if (this.readonlyPlanificacionFamiliar) {
      switch (this.metodo_planificacion.value) {
        case 1:
          this.metodo_planificacion.setValue("DIU");
          break;
        case 2:
          this.metodo_planificacion.setValue("Condón");
          break;
        case 3:
          this.metodo_planificacion.setValue("Pastilla");
          break;
        case 4:
          this.metodo_planificacion.setValue("Implante");
          break;
        case 5:
          this.metodo_planificacion.setValue("Inyección trimestral");
          break;
        case 6:
          this.metodo_planificacion.setValue("Inyección trimestral");
          break;
        case 7:
          this.metodo_planificacion.setValue("Inyección mensual");
          break;
        case 8:
          this.metodo_planificacion.setValue("Ritmo");
          break;
        case 9:
          this.metodo_planificacion.setValue("Esterilización");
          break;
        default:
          this.metodo_planificacion.setValue("No especificado aún");
          break;


      }
    } else {
      switch (this.metodo_planificacion.value) {
        case "DIU":
          this.metodo_planificacion.setValue(1);
          break;
        case "Condón":
          this.metodo_planificacion.setValue(2);
          break;
        case "Pastilla":
          this.metodo_planificacion.setValue(3);
          break;
        case "Implante":
          this.metodo_planificacion.setValue(4);
          break;
        case "Inyección trimestral":
          this.metodo_planificacion.setValue(5);
          break;
        case "Inyección trimestral":
          this.metodo_planificacion.setValue(6);
          break;
        case "Inyección mensual":
          this.metodo_planificacion.setValue(7);
          break;
        case "Ritmo":
          this.metodo_planificacion.setValue(8);
          break;
        case "Esterilización":
          this.metodo_planificacion.setValue(9);
          break;
        default:

          break;


      }
    }
  }


  cargarInformacionPlanificacionfamiliar() {
    if (this.planificacion_familiardata) {
      this.planificacion_familiarr.setValue(this.planificacion_familiardata.planificacion_familiar);

      if (this.planificacion_familiarr.value == "No") {
        this.metodo_planificacion.disable({ onlySelf: true });
        this.observacion_planificacion.disable({ onlySelf: true });
      }


      switch (this.planificacion_familiardata.metodo_planificacion) {
        case 1:
          this.planificacion_familiardata.metodo_planificacion = "DIU";
          break;
        case 2:
          this.planificacion_familiardata.metodo_planificacion = "Condón";
          break;
        case 3:
          this.planificacion_familiardata.metodo_planificacion = "Pastilla";
          break;
        case 4:
          this.planificacion_familiardata.metodo_planificacion = "Implante";
          break;
        case 5:
          this.planificacion_familiardata.metodo_planificacion = "Inyección trimestral";
          break;
        case 6:
          this.planificacion_familiardata.metodo_planificacion = "Inyección trimestral";
          break;
        case 7:
          this.planificacion_familiardata.metodo_planificacion = "Inyección mensual";
          break;
        case 8:
          this.planificacion_familiardata.metodo_planificacion = "Ritmo";
          break;
        case 9:
          this.planificacion_familiardata.metodo_planificacion = "Esterilización";
          break;
        default:

          break;
      }


      this.metodo_planificacion.setValue(this.planificacion_familiardata.metodo_planificacion);
      this.observacion_planificacion.setValue(this.planificacion_familiardata.observacion_planificacion);

    }
  }


  anadirCita() {
    const Citasubsiguiente = this.subsiguiente.open(HistoriaSubsiguiente1, { disableClose: true, width: "70%", panelClass: 'historiasubsiguiente' });
    this.pacienteService.id_historia_subsiguiente = this.id;
  }
  public mostrarHistoriasSub() {
    this.mostrarHisorias = true;

    this.pacienteService.obtenerHistoriaSubsiguiente(this.id).subscribe((data: HistoriaSubsiguiente[]) => {
      this.historias_subsiguientes_paciente = data;
      console.log(this.historias_subsiguientes_paciente);
      this.dataSource1 = this.historias_subsiguientes_paciente;
    }, (error) => {

      console.log(error);
    });
  }
  cerrarHistorias() {
    this.mostrarHisorias = false;
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }


  cambiarfoto() {
    const dia = this.cambiarFoto.open(CambiarFoto, {
      panelClass: 'tomarfoto'
    });

    dia.afterClosed().subscribe(result => {

      this.actualizarfoto();
      this.loading1 = true;



    });
    this.pacienteService.id_historia_subsiguiente = this.id;
  }




  //obtener los campos del formGroup: formulario_datos_generales
  get nombre_completo() { return this.formulario_datos_generales.get('nombre_completo') };
  get numero_cuenta() { return this.formulario_datos_generales.get('numero_cuenta') };
  get numero_identidad() { return this.formulario_datos_generales.get('numero_identidad') };
  get lugar_procedencia() { return this.formulario_datos_generales.get('lugar_procedencia') };
  get direccion() { return this.formulario_datos_generales.get('direccion') };
  get carrera() { return this.formulario_datos_generales.get('carrera') };
  get fecha_nacimiento() { return this.formulario_datos_generales.get('fecha_nacimiento') };
  get sexo() { return this.formulario_datos_generales.get('sexo') };
  get estado_civil() { return this.formulario_datos_generales.get('estado_civil') };
  get seguro_medico() { return this.formulario_datos_generales.get('seguro_medico') };
  get numero_telefono() { return this.formulario_datos_generales.get('numero_telefono') };
  get numero_telefono_agregar() { return this.formulario_datos_generales.get('numero_telefono_agregar') };
  get emergencia_telefono() { return this.formulario_datos_generales.get('emergencia_telefono') };
  get emergencia_persona() { return this.formulario_datos_generales.get('emergencia_persona') };
  get categoria() { return this.formulario_datos_generales.get('categoria') };


  //obtener los campos del formGroup: formulario_antecedentes_familiares
  get parentesco_desnutricion() { return this.formulario_antecedentes_familiares.get('parentesco_desnutricion') };
  get tipo_desnutricion() { return this.formulario_antecedentes_familiares.get('tipo_desnutricion') };
  get parentesco_enfermedades_mentales() { return this.formulario_antecedentes_familiares.get('parentesco_enfermedades_mentales') };
  get tipo_enfermedad_mental() { return this.formulario_antecedentes_familiares.get('tipo_enfermedad_mental') };
  get parentesco_alergias() { return this.formulario_antecedentes_familiares.get('parentesco_alergias') };
  get tipo_alergia() { return this.formulario_antecedentes_familiares.get('tipo_alergia') };
  get parentesco_cancer() { return this.formulario_antecedentes_familiares.get('parentesco_cancer') };
  get tipo_cancer() { return this.formulario_antecedentes_familiares.get('tipo_cancer') };
  get otros() { return this.formulario_antecedentes_familiares.get('otros') };
  get parentesco_otros() { return this.formulario_antecedentes_familiares.get('parentesco_otros') };

  //obtener los campos del formGroup: formulario_antecedentes_personales
  get observacion_desnutricion_ap() { return this.formulario_antecedentes_personales.get('observacion_desnutricion') };
  get tipo_desnutricion_ap() { return this.formulario_antecedentes_personales.get('tipo_desnutricion') };
  get observacion_enfermedades_mentales_ap() { return this.formulario_antecedentes_personales.get('observacion_enfermedades_mentales') };
  get tipo_enfermedad_mental_ap() { return this.formulario_antecedentes_personales.get('tipo_enfermedad_mental') };
  get observacion_alergias_ap() { return this.formulario_antecedentes_personales.get('observacion_alergias') };
  get tipo_alergia_ap() { return this.formulario_antecedentes_personales.get('tipo_alergia') };
  get observacion_cancer_ap() { return this.formulario_antecedentes_personales.get('observacion_cancer') };
  get tipo_cancer_ap() { return this.formulario_antecedentes_personales.get('tipo_cancer') };
  get fecha_antecedente_hospitalario() { return this.formulario_antecedentes_personales.get('fecha_antecedente_hospitalario') };
  get tratamiento() { return this.formulario_antecedentes_personales.get('tratamiento') };
  get diagnostico() { return this.formulario_antecedentes_personales.get('diagnostico') };
  get tiempo_hospitalizacion() { return this.formulario_antecedentes_personales.get('tiempo_hospitalizacion') };
  get otros_ap() { return this.formulario_antecedentes_personales.get('otros') };
  get observacion_otros_ap() { return this.formulario_antecedentes_personales.get('observacion_otros') };

  //obtener los campos del formGroup: formulario_habito_toxicologico_personal
  get otros_ht() { return this.formulario_habito_toxicologico_personal.get('otros') };
  get observacion_otros_ht() { return this.formulario_habito_toxicologico_personal.get('observacion_otros') };


  //obtener los campos del formGroup: formulario_actividad_sexual
  get actividad_sexuall() { return this.formulario_actividad_sexual.get('actividad_sexual') };
  get edad_inicio_sexual() { return this.formulario_actividad_sexual.get('edad_inicio_sexual') };
  get numero_parejas_sexuales() { return this.formulario_actividad_sexual.get('numero_parejas_sexuales') };
  get practicas_sexuales_riesgo() { return this.formulario_actividad_sexual.get('practicas_sexuales_riesgo') };


  //obtener los campos del formGroup: formulario_antecedente_ginecologico
  get edad_inicio_menstruacion() { return this.formulario_antecedente_ginecologico.get('edad_inicio_menstruacion') };
  get fum() { return this.formulario_antecedente_ginecologico.get('fum') };
  get citologia() { return this.formulario_antecedente_ginecologico.get('citologia') };
  get fecha_citologia() { return this.formulario_antecedente_ginecologico.get('fecha_citologia') };
  get resultado_citologia() { return this.formulario_antecedente_ginecologico.get('resultado_citologia') };
  get duracion_ciclo_menstrual() { return this.formulario_antecedente_ginecologico.get('duracion_ciclo_menstrual') };
  get periocidad_ciclo_menstrual() { return this.formulario_antecedente_ginecologico.get('periocidad_ciclo_menstrual') };
  get caracteristicas_ciclo_menstrual() { return this.formulario_antecedente_ginecologico.get('caracteristicas_ciclo_menstrual') };


  //obtener los campos del formGroup: formulario_planifacion_familiar
  get planificacion_familiarr() { return this.formulario_planificacion_familiar.get('planificacion_familiar') };
  get metodo_planificacion() { return this.formulario_planificacion_familiar.get('metodo_planificacion') };
  get observacion_planificacion() { return this.formulario_planificacion_familiar.get('observacion_planificacion') };

  //obtener los campos del formGroup: formulario_antecedente_obstetrico
  get partos() { return this.formulario_antecedente_obstetrico.get('partos') };
  get abortos() { return this.formulario_antecedente_obstetrico.get('abortos') };
  get cesarias() { return this.formulario_antecedente_obstetrico.get('cesarias') };
  get hijos_vivos() { return this.formulario_antecedente_obstetrico.get('hijos_vivos') };
  get hijos_muertos() { return this.formulario_antecedente_obstetrico.get('hijos_muertos') };
  get fecha_termino_ult_embarazo() { return this.formulario_antecedente_obstetrico.get('fecha_termino_ult_embarazo') };
  get descripcion_termino_ult_embarazo() { return this.formulario_antecedente_obstetrico.get('descripcion_termino_ult_embarazo') };
  get observaciones() { return this.formulario_antecedente_obstetrico.get('observaciones') };



  // obtener los campos del formGroup formulario_datos_faltantes
  get peso() { return this.formulario_datos_generales.get('peso') };
  get talla() { return this.formulario_datos_generales.get('talla') };
  get temperatura() { return this.formulario_datos_generales.get('temperatura') };
  get presion() { return this.formulario_datos_generales.get('presion') };
  get pulso() { return this.formulario_datos_generales.get('pulso') };
  get prosene() { return this.formulario_datos_generales.get('prosene') };
}


export interface Inventario {

  id_inventario?: number,
  unidades?: number,
  medicamento?: string,

}
export interface selecto {
  value: number,
  viewValue: string
}

@Component({
  selector: 'historiaSubsiguiente1',
  templateUrl: 'HistoriaSubsiguiente1.html',
  styleUrls: ['HistoriaSubsiguiente1.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})









export class HistoriaSubsiguiente1 {
  seleccionado: boolean;
  seleccion = 0;
  maximoMedicamento: number = 2;
  minDate = new Date();

  formulario_historia_subsiguiente = new FormGroup({

    peso: new FormControl('', [Validators.required, Validators.max(500), Validators.min(2), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    talla: new FormControl('', [Validators.required, Validators.max(2.5), Validators.min(0.20), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    temperatura: new FormControl('', [Validators.required, Validators.max(60), Validators.min(20), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    presion: new FormControl('', [Validators.required, Validators.max(200), Validators.min(50), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    pulso: new FormControl('', [Validators.required, Validators.max(140), Validators.min(40), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),

    observaciones_examen: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    impresion_diagnostica: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),

    nombre: new FormControl(''),
    unidad: new FormControl('', [Validators.pattern(/^[0-9]+/), Validators.maxLength(3)]),
    indicaciones: new FormControl('', [Validators.maxLength(100), Validators.minLength(5)]),

    remitir: new FormControl(''),
    remitira: new FormControl(''),

    cita: new FormControl('', Validators.required),
    fecha_cita: new FormControl('', Validators.required),
    hora_cita: new FormControl(''),

  });






  constructor(private pacienteService: PacienteService,
    private inventarioService: InventariosService,
    private dialogRef: MatDialogRef<HistoriaSubsiguiente1>,//para cerrar el dialogo desde la misma interfaz
    private mensaje: MatSnackBar,
    private breakpointObserver: BreakpointObserver) {
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }


  historia_subsiguiente: HistoriaSubsiguiente = {
    id_paciente: null,
    peso: null,
    imc: null,
    presion: null,
    pulso: null,
    talla: null,
    temperatura: null,
    impresion: null,
    indicaciones: null,
    observaciones: null,
    remitido: null,
    siguiente_cita: null,
    hora_cita: null,
    nombre: null
  }

  medicamento: any = {
    id: null,
    cantidad: null
  }

  radioCita(valor, formControl: FormControl[]) {

    if (valor == 1) {

      console.log(valor);

      formControl.forEach(controlador => {
        controlador.enable({ onlySelf: true });
      });

      this.fecha_cita.setValidators(Validators.required);
      this.fecha_cita.updateValueAndValidity();



    } else {

      formControl.forEach(controlador => {
        controlador.setValue('');
        controlador.disable({ onlySelf: true });
      });

      this.fecha_cita.clearValidators();
      this.fecha_cita.updateValueAndValidity();

    }

  }

  selectMedicamento(valor, formControl: FormControl[]) {

    if (valor == 0) {

      console.log(valor);

      this.texto = "No hay producto en existencia";

      formControl.forEach(controlador => {
        controlador.setValue('');
        controlador.disable({ onlySelf: true });
      });

      this.unidad.clearValidators();
      this.unidad.updateValueAndValidity();



    } else {


      formControl.forEach(controlador => {
        controlador.enable({ onlySelf: true });
      });

      this.maximoMedicamento = this.inventario[valor - 1].unidades;

      if (this.maximoMedicamento == 0) {

        this.texto = "No hay producto en existencia";
        this.borrarInputs([<FormControl>this.unidad]);
        this.seleccionado = false;

      } else {

        this.texto = "El valor en existencia es: " + this.maximoMedicamento;
        this.seleccionado = true;
        this.habilitarInputs([<FormControl>this.unidad]);
      }

      this.unidad.setValidators([Validators.required,
      Validators.pattern(/^[0-9]+/), Validators.maxLength(3),
      Validators.max(this.maximoMedicamento)]);

      this.unidad.updateValueAndValidity();

    }


  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  ngOnInit() {

    this.obtenerMedicamentos();
  }

  obtenerMedicamentos() {

    this.inventarioService.obtenerMedicamento().subscribe((data: Inventario[]) => {
      this.datos = data;
      this.inventario = data;
      this.nombres.push({ value: 0, viewValue: 'Ninguno' });
      this.datos.forEach(element => {
        this.nombres.push({ value: element.id_inventario, viewValue: element.medicamento });
      });

      console.log(this.nombres);
      console.log(this.inventario);
      console.log(this.unidad.value);


    });

  }


  matcher = new MyErrorStateMatcher();

  datos: any;
  demas: boolean = true;
  inventario: Inventario[];
  texto: string = "Unidades";

  parentescos: Parentescos[] = [
    { value: 1, viewValue: 'Psicologia' },
    { value: 2, viewValue: 'Nutricion' },
    { value: 3, viewValue: 'Odontologia' },
    { value: 4, viewValue: 'Terapia Funcional' },
    { value: 5, viewValue: 'CATFA' },
    { value: 6, viewValue: 'Trabajo Social' }
  ];
  nombres: selecto[] = [];

  habilitarInputs(formControl: FormControl[]) {
    formControl.forEach(controlador => {
      controlador.enable({ onlySelf: true });
    });
  }

  borrarInputs(formControl: FormControl[]) {
    formControl.forEach(controlador => {
      controlador.setValue('');
      controlador.disable({ onlySelf: true });
    });
  }

  medicamentoUnidad(numero: number) {

    if (numero == 0) {
      this.borrarInputs([<FormControl>this.unidad]);
      this.seleccionado = false;
    }

    this.maximoMedicamento = this.inventario[numero - 1].unidades;
    this.unidad.setValidators(Validators.max(this.maximoMedicamento));
    if (this.maximoMedicamento == 0) {
      this.texto = "No hay producto en existencia";
      this.borrarInputs([<FormControl>this.unidad]);
      this.seleccionado = false;
    } else {
      this.texto = "El valor en existencia es: " + this.maximoMedicamento;
      this.seleccionado = true;
      this.habilitarInputs([<FormControl>this.unidad]);
    }

  }



  guardarCita() {

    if (this.formulario_historia_subsiguiente.valid) {

      this.historia_subsiguiente.id_paciente = this.pacienteService.id_historia_subsiguiente;
      this.historia_subsiguiente.peso = this.peso.value;
      this.historia_subsiguiente.imc = 1;
      this.historia_subsiguiente.presion = this.presion.value;
      this.historia_subsiguiente.pulso = this.pulso.value;
      this.historia_subsiguiente.talla = this.talla.value;
      this.historia_subsiguiente.temperatura = this.temperatura.value;
      this.historia_subsiguiente.impresion = this.impresion_diagnostica.value;
      this.historia_subsiguiente.indicaciones = this.indicaciones.value;
      this.historia_subsiguiente.observaciones = this.observaciones_examen.value;
      this.historia_subsiguiente.remitido = this.remitira.value;
      this.historia_subsiguiente.hora_cita = this.hora_cita.value;

      if (this.fecha_cita.value && this.hora_cita.value) {

        var fechaCita = moment(this.fecha_cita.value).format("YYYY-MM-DD");

        var cita: any = {
          'hora_cita': this.hora_cita.value,
          'fecha': fechaCita,
          'hora': this.hora_cita.value,
          'id_paciente': this.pacienteService.id_historia_subsiguiente
        }


        this.pacienteService.guardarCita(cita).subscribe((result: any) => {


        }, (error) => {

          console.log(error);
        });

      }

      this.historia_subsiguiente.nombre = this.nombre.value;


      if (this.historia_subsiguiente.remitido == null || this.historia_subsiguiente.remitido == "") {
        this.historia_subsiguiente.remitido = 7;
      }
      console.log(this.historia_subsiguiente);
      this.pacienteService.guardarHistoriaSubsiguiente(this.historia_subsiguiente).subscribe((data) => {
        console.log(data);
        this.dialogRef.close();
        this.showError('Cita guardada con exito');
      }, (error) => {
        console.log(error);
        this.showError('ocurrion un error');
      });


      if (this.seleccionado == true) {
        this.medicamento.id = this.nombre.value;
        this.medicamento.cantidad = this.unidad.value;
        console.log(this.medicamento);
        this.inventarioService.EgresoMedicamentos(this.medicamento).subscribe((data) => {
          console.log(data);
          this.showError('medicamento guardado con exito');
        }, (error) => {
          console.log(error);
          //alert('ocurrion un error en medicamento');
          this.showError('ocurrion un error en medicamento');

        });

      }

    } else {
      this.showError('LLenar todos los campos');

    }

  }




  get peso() { return this.formulario_historia_subsiguiente.get('peso') };
  get talla() { return this.formulario_historia_subsiguiente.get('talla') };
  get IMC() { return this.formulario_historia_subsiguiente.get('IMC') };
  get temperatura() { return this.formulario_historia_subsiguiente.get('temperatura') };
  get remitir() { return this.formulario_historia_subsiguiente.get('remitir') };
  get remitira() { return this.formulario_historia_subsiguiente.get('remitira') };
  get pulso() { return this.formulario_historia_subsiguiente.get('pulso') };
  get observaciones_examen() { return this.formulario_historia_subsiguiente.get('observaciones_examen') };
  get impresion_diagnostica() { return this.formulario_historia_subsiguiente.get('impresion_diagnostica') };
  get fecha_cita() { return this.formulario_historia_subsiguiente.get('fecha_cita') };
  get hora_cita() { return this.formulario_historia_subsiguiente.get('hora_cita') };
  get indicaciones() { return this.formulario_historia_subsiguiente.get('indicaciones') };
  get presion() { return this.formulario_historia_subsiguiente.get('presion') };
  get nombre() { return this.formulario_historia_subsiguiente.get('nombre') };
  get unidad() { return this.formulario_historia_subsiguiente.get('unidad') };
  get cita() { return this.formulario_historia_subsiguiente.get('cita') };

}




@Component({
  selector: 'borrarregistro',
  templateUrl: 'dialog-borrar-registro.html',
})

export class Borrartelefonoemergencia {
  constructor(public dialogRef: MatDialogRef<Borrartelefonoemergencia>,
    private formularioService: FormularioService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  BorrarRegistro() {
    if (this.data != 0) {
      this.formularioService.eliminarEmergenciaPersona(this.data).subscribe((data) => {
        this.showError('Registro eliminado correctamente');
        this.dialogRef.close();
      });
    } else {
      this.showError('El Registro no puede ser eliminado');
    }
  }
  salir(): void {
    this.dialogRef.close();
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
}





@Component({
  selector: 'borrarregistro',
  templateUrl: 'dialog-borrar-registro.html',
})

export class Borrartelefono {
  constructor(public dialogRef: MatDialogRef<Borrartelefono>,
    private formularioService: FormularioService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  BorrarRegistro() {
    if (this.data != 0) {
      this.formularioService.eliminarTelefono(this.data).subscribe((data) => {
        this.showError('Registro eliminado correctamente');
        this.dialogRef.close();
      });
    } else {
      this.showError('El Registro no puede ser eliminado');
    }
  }
  salir(): void {
    this.dialogRef.close();
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
}






@Component({
  selector: 'borrarregistro',
  templateUrl: 'dialog-borrar-registro.html',
})

export class BorrarDesnutricionAF {
  constructor(public dialogRef: MatDialogRef<BorrarDesnutricionAF>,
    private formularioService: FormularioService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  BorrarRegistro() {
    if (this.data != 0) {
      this.formularioService.eliminarCualquierEnfermedadAF(this.data).subscribe((data) => {
        this.showError('Registro eliminado correctamente');
        this.dialogRef.close();
      });
    } else {
      this.showError('El Registro no puede ser eliminado');
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
}






@Component({
  selector: 'borrarregistro',
  templateUrl: 'dialog-borrar-registro.html',
})

export class BorrarDesnutricionAP {
  constructor(public dialogRef: MatDialogRef<BorrarDesnutricionAP>,
    private formularioService: FormularioService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  BorrarRegistro() {
    if (this.data != 0) {
      this.formularioService.eliminarCualquierEnfermedadAP(this.data).subscribe((data) => {
        this.showError('Registro eliminado correctamente');
        this.dialogRef.close();
      });
    } else {
      this.showError('El Registro no puede ser eliminado');
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
}



@Component({
  selector: 'borrarregistro',
  templateUrl: 'dialog-borrar-registro.html',
})

export class BorrarHospitalarias {
  constructor(public dialogRef: MatDialogRef<BorrarHospitalarias>,
    private formularioService: FormularioService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  BorrarRegistro() {
    if (this.data != 0) {
      this.formularioService.eliminarHospitalaria(this.data).subscribe((data) => {
        this.showError('Registro eliminado correctamente');
        this.dialogRef.close();
      });
    } else {
      this.showError('El Registro no puede ser eliminado');
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
}



@Component({
  selector: 'borrarregistro',
  templateUrl: 'dialog-borrar-registro.html',
})

export class BorrarHabitoToxicologico {
  constructor(public dialogRef: MatDialogRef<BorrarHabitoToxicologico>,
    private formularioService: FormularioService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  BorrarRegistro() {
    if (this.data != 0) {
      this.formularioService.eliminarHabitoTox(this.data).subscribe((data) => {
        this.showError('Registro eliminado correctamente');
        this.dialogRef.close();
      });
    } else {
      this.showError('El Registro no puede ser eliminado');
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
}




export interface imagenNueva {
  id: number,
  imagen: string
}
/////// MATDIALOG cambiar foto
@Component({
  selector: 'CambiarFoto',
  templateUrl: 'CambiarFoto.html',
  styleUrls: ['CambiarFoto.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})


@Injectable()

export class CambiarFoto {


  constructor(private dialogo: MatDialogRef<CambiarFoto>, private pacienteService: PacienteService, private activatedRoute: ActivatedRoute,
    private formulario: FormularioService) {

  }
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public facingMode: string = 'environment';
  public errors: WebcamInitError[] = [];
  public mirrorImage: 'never';
  paciente: Paciente;
  NuevaImagen: any = { id_paciente: null, imagen: null };
  // latest snapshot
  public webcamImage: WebcamImage = null;
  opcion: boolean = true;
  id: any;
  imagen: any;
  imagenAlter: boolean = false;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.opcion = false;
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  public otrafoto() {
    this.opcion = true;

  }
  public guardar() {


    this.id = this.pacienteService.id_historia_subsiguiente;

    if (this.imagenAlter == true) {
      this.imagenAlter = false;

    } else {
      this.imagen = this.webcamImage.imageAsDataUrl;
    }




    this.NuevaImagen.id_paciente = this.id;
    this.NuevaImagen.imagen = this.imagen;
    const intervalo = interval(1000);


    console.log(this.imagen);
    console.log(this.NuevaImagen.imagen);

    this.pacienteService.ActualizarImagen(this.NuevaImagen).subscribe((data) => {
      console.log('imagen guardado con exito');
      this.pacienteService.sihayimagen = true;
      this.pacienteService.imagenactual = this.imagen;
      //this.verPaciente.actualizarfoto();
    }, (error) => {
      console.log(error);
    });
    this.dialogo.close();
  }
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.imagen = "data:image/jpeg;base64," + btoa(binaryString);
    console.log(this.imagen);
    this.imagenAlter = true;
    this.guardar();
    this.dialogo.close;


  }


  seleccionarArchivo(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);


      reader.readAsBinaryString(file);

    }


  }


  ///////////////////////codigo 



  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== "") {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }
}