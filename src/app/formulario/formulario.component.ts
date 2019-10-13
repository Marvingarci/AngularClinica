import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../interfaces/paciente';
import { FormularioService } from '../services/formulario.service';
import { AntecedentesFamiliares } from '../interfaces/antecedentes-familiares';
import { AntecedentesPersonales } from '../interfaces/antecedentes-personales';
import { HabitosToxicologicosPersonales } from '../interfaces/habitos-toxicologicos-personales';
import { ActividadSexual } from '../interfaces/actividad-sexual';
import { AntecedentesGinecologicos } from '../interfaces/antecedentes-ginecologicos';
import { PlanificacionesFamiliares } from '../interfaces/planificaciones-familiares';
import { AntecedentesObstetricos } from '../interfaces/antecedentes-obstetricos';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

export interface Sexo {
  value: string;
  viewValue: string;
}

export interface seguro_medico {
  value: string;
  viewValue: string;
}

export interface estado_civil {
  value: string;
  viewValue: string;
}

export interface Parentesco {
  value: string;
  viewValue: string;
}

export interface Desnutricion {
  value: string;
  viewValue: string;
}

export interface enfermedad_mental {
  value: string;
  viewValue: string;
}

export interface Alergia {
  value: string;
  viewValue: string;
}

export interface Cancer {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class FormularioComponent implements OnInit {

  paciente: Paciente = {
    primer_apellido: null,
    segundo_apellido: null,
    primer_nombre: null,
    segundo_nombre: null,
    numero_cuenta: null,
    numero_identidad: null,
    lugar_procedencia: null,
    direccion: null,
    carrera: null,
    fecha_nacimiento: null,
    sexo: null,
    estado_civil: null,
    seguro_medico: null,
    numero_telefono: null,
    emergencia_telefono: null

  };

  antecedente_familiar: AntecedentesFamiliares ={

    diabetes : null,
    observacion_diabetes : null,
    tb_pulmonar : null,
    observacion_tb_pulmonar : null,
    desnutricion : null,
    observacion_desnutricion : null,
    tipo_desnutricion: null,
    enfermedades_mentales : null,
    observacion_enfermedades_mentales : null,
    tipo_enfermedad_mental: null,
    convulciones : null,
    observacion_convulciones : null,
    alcoholismo_sustancias_psicoactivas : null,
    observacion_alcoholismo_sustancias_psicoactivas: null,
    alergias : null,
    observacion_alergias: null,
    tipo_alergia: null,
    cancer : null,
    observacion_cancer: null,
    tipo_cancer: null,
    hipertension_arterial: null,
    observacion_hipertension_arterial: null,
    otros : null,
    observacion_otros : null,
    id_paciente : null
    

  };

  antecedente_personal: AntecedentesPersonales = {
    diabetes : null,
    observacion_diabetes : null,
    tb_pulmonar : null,
    observacion_tb_pulmonar : null,
    its : null,
    observacion_its : null,
    desnutricion : null,
    observacion_desnutricion : null,
    enfermedades_mentales : null,
    observacion_enfermedades_mentales : null,
    convulciones : null,
    observacion_convulciones : null,
    alergias : null,
    observacion_alergias : null,
    cancer : null,
    observacion_cancer : null,
    hospitalarias_quirurgicas : null,
    observacion_hospitalarias_quirurgicas : null,
    traumaticos : null,
    observacion_traumaticos : null,
    otros : null,
    observacion_otros : null,
    id_paciente : null
  };

  habito_toxicologico_personal: HabitosToxicologicosPersonales = {
    alcohol : null,
    observacion_alcohol : null,
    tabaquismo : null,
    observacion_tabaquismo : null,
    marihuana : null,
    observacion_marihuana : null,
    cocaina : null,
    observacion_cocaina : null,
    otros : null,
    observacion_otros : null,
    id_paciente : null,

  }

  actividad_sexual: ActividadSexual = {
    actividad_sexual : null,
    edad_inicio_sexual : null,
    numero_parejas_sexuales : null,
    practicas_sexuales_riesgo : null,
    id_paciente : null
  };

  antecedente_ginecologico: AntecedentesGinecologicos = {
    menarquia_a : null,
    fum : null,
    citologia : null,
    fecha_citologia : null,
    resultado_citologia : null,
    duracion_ciclo_menstrual : null,
    periocidad_ciclo_menstrual : null,
    caracteristicas_ciclo_menstrual : null,
    id_paciente : null
  };

  planificacion_familiar: PlanificacionesFamiliares = {
    planificacion_familiar : null,
    metodo_planificacion : null,
    observacion_planificacion : null,
    id_paciente : null
    
  };

  antecedente_obstetrico: AntecedentesObstetricos = {
    fecha_termino_ult_embarazo : null,
    descripcion_termino_ult_embarazo : null,
    observaciones : null,
    id_paciente : null
  
  };

  error: boolean = false;

  //date picker
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);


  

  //select
  sexos: Sexo[] = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'mujer', viewValue: 'Mujer'},
    {value: 'otro', viewValue: 'Otro'}
  ];

  seguros_medicos: seguro_medico[] = [
    {value: 'Privado', viewValue: 'Privado'},
    {value: 'IHSS', viewValue: 'IHSS'},
    {value: 'No', viewValue: 'No'}
  ];

  estados_civiles: estado_civil[] = [
    {value: 'Soltero', viewValue: 'Soltero'},
    {value: 'Union Libre', viewValue: 'Union Libre'},
    {value: 'Divorciado', viewValue: 'Divorciado'},
    {value: 'Viudo', viewValue: 'Viudo'}
   
  ];

  parentescos: Parentesco[] = [
    {value: 'Padre' , viewValue: 'Padre'},
    {value: 'Madre' , viewValue: 'Madre'},
    {value: 'Abuelos' , viewValue: 'Abuelos'},
    {value: 'Tios' , viewValue: 'Tios'},

  ];

  desnutriciones: Desnutricion[] = [
    {value: 'Obecidad' , viewValue: 'Obecidad'},
    {value: 'Muy degaldo' , viewValue: 'Muy delgado'},

  ];

  enfermedades_mentales: enfermedad_mental[] = [
    {value: 'Alzheimer' , viewValue: 'Alzheimer'},
    {value: 'Parkinson' , viewValue: 'Parkinson'},
    {value: 'Esquizofrenia' , viewValue: 'Esquizofrenia'},
    {value: 'Ansiedad' , viewValue: 'Ansiedad'},
    {value: 'Trastorno de pánico' , viewValue: 'Trastorno de pánico'},
    {value: 'Estrés' , viewValue: 'Estrés'},
    {value: 'Bipolar' , viewValue: 'Bipolar'},

  ];
  
  alergias: Alergia[] = [
    {value: 'Medicamentos' , viewValue: 'Medicamentos'},
    {value: 'Alimentos' , viewValue: 'Alimentos'},
    {value: 'Cambios de clima' , viewValue: 'Cambios de clima'},
    {value: 'Tipo de tela' , viewValue: 'Tipos de tela'},
    {value: 'Animales' , viewValue: 'Animales'},
    {value: 'Otros' , viewValue: 'Otros'},

  ];

  canceres: Cancer[] = [
    {value: 'Mama' , viewValue: 'Mama'},
    {value: 'Tiroides' , viewValue: 'Tiroides'},
    {value: 'Estómago' , viewValue: 'Estómago'},
    {value: 'Páncreas' , viewValue: 'Páncreas'},
    {value: 'Testiculo' , viewValue: 'Testiculo'},
    {value: 'Pene' , viewValue: 'Pene'},
    {value: 'Leucemia' , viewValue: 'Leucemia'},

  ];



  //radio buttons
  opciones: string[] = ['Si', 'No'];

  

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(private formularioService: FormularioService, 
    private router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
  }

  enviarDatos(){
    
    this.formularioService.guardarDatosGenerales(this.paciente).subscribe( (data) =>{
      console.log(data);     
    }, (error) => {
      console.log(error);
      this.error = true;
      alert('ocurrion un error');
    });

    this.formularioService.guardarAntecedentesFamiliares(this.antecedente_familiar).subscribe( (data) =>{
      console.log(data);
    }, (error) => {
      console.log(error);
      this.error = true;
      alert('ocurrion un error');
    });

    this.formularioService.guardarAntecedentesPersonales(this.antecedente_personal).subscribe( (data) =>{
      console.log(data);
    }, (error) => {
      this.error = true;
      console.log(error);
      alert('ocurrion un error');
    });

    this.formularioService.guardarHabitosToxicologicosPersonales(this.habito_toxicologico_personal).subscribe( (data) =>{
      console.log(data);
    }, (error) => {
      this.error = true;
      console.log(error);
      alert('ocurrion un error');
    });

    this.formularioService.guardarActividadSexual(this.actividad_sexual).subscribe( (data) =>{
      console.log(data);
    }, (error) => {
      this.error = true;
      console.log(error);
      alert('ocurrion un error');
    });

    this.formularioService.guardarAntecedentesGinecologicos(this.antecedente_ginecologico).subscribe( (data) =>{
      console.log(data);
    }, (error) => {
      this.error = true;
      console.log(error);
      alert('ocurrion un error');
    });

    this.formularioService.guardarPlanificacionesFamiliares(this.planificacion_familiar).subscribe( (data) =>{
      console.log(data);
    }, (error) => {
      this.error = true;
      console.log(error);
      alert('ocurrion un error');
    });

    this.formularioService.guardarAntecedentesObstetricos(this.planificacion_familiar).subscribe( (data) =>{
      console.log(data);
    }, (error) => {
      this.error = true;
      console.log(error);
      alert('ocurrion un error');
    });

    if(!this.error){
      alert ('los datos se enviarion');
      this.router.navigate(['principal']);
    }

    
    
  };
}
