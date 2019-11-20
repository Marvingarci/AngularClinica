import { Component, OnInit, Input, ViewChild, NgZone, ElementRef } from '@angular/core';
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
import { AppComponent } from "../app.component";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Login } from '../interfaces/login';
import { DialogContentExampleDialog, DatoPacienteComponent } from "../dato-paciente/dato-paciente.component";
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from "../services/login.service";
import { NgStyle } from '@angular/common';
import { stringify } from 'querystring';
import { Subscription, Observable } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { PacienteAntecedenteFamiliar } from '../interfaces/paciente-antecedente-familiar';
import { MatChipInputEvent, MatAutocomplete, MatTableDataSource } from '@angular/material';

export interface Loginadmin {
 // contrasenia_admin: any;
  value: string;
  viewValue: string;

}

export interface Element{

  numero: number;
  antecedente: string;
  parentesco: string;
  
}


export interface select {
  value: string;
  viewValue: string;
}


// todas estas interfaces hay que borrarlas despues y solo dejar una
// por mientras son de prueba

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
export interface Parentescos {
  value: number;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
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
  loading: boolean=false;


  datosGenerales: string = 'Datos Generales';
  antecedentesFamiliares: string = '';
  antecedentesPersonales: string = '';
  habitosToxicologicosPersonales: string = '';
  actividadSexualYReproductiva: string = '';
  antecedentesGinecologicos: string = '';
  antecedentesObstetricos: string = '';
  planificacionFamiliar: string = '';

  

  datosScraping: Login = {
    cuenta: null,
    clave : null,
    nombre: null,
    carrera : null,
    centro : null,
    numero_identidad : null,     
  }
  

  formulario_datos_generales = new FormGroup({     
      nombre_completo: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-z\s]{0,100}$/)]),
      // segundo_apellido: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
      // primer_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
      // segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
      numero_cuenta: new FormControl('', [Validators.required, Validators.pattern(/^[2][0-9]{10}$/)]), 
      // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
      // "/ /" indica el inicio y el final de la expresion regular
      // "{10}" indica le numero de digitos de lo que lo antecede
      numero_identidad: new FormControl('', [Validators.required,Validators.pattern(/^\d{4}\d{4}\d{5}$/)]),
       // "\d" es lo mismo "[0-9]"
      lugar_procedencia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{5,30}$/)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(20)]),
      carrera: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      categoria: new FormControl('',[Validators.required]),
      estado_civil: new FormControl('', Validators.required),
      seguro_medico: new FormControl('', Validators.required),
      numero_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
      emergencia_persona: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{3,30}$/)]),
      emergencia_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]) 
  });


  formulario_antecedentes_familiares = new FormGroup({    
    diabetes : new FormControl('',[Validators.required]),
    parentesco_diabetes : new FormControl('',[],),
    tb_pulmonar : new FormControl('',[Validators.required]),
    parentesco_tb_pulmonar : new FormControl({value:'', disabled: true},[]),
    desnutricion : new FormControl('',[Validators.required]),
    parentesco_desnutricion : new FormControl({value:'', disabled: true},[]),
    tipo_desnutricion: new FormControl({value:'', disabled: true},[]),
    enfermedades_mentales : new FormControl('',[Validators.required]),
    parentesco_enfermedades_mentales : new FormControl({value:'', disabled: true},[]),
    tipo_enfermedad_mental: new FormControl({value:'', disabled: true},[]),
    convulsiones : new FormControl('',[Validators.required]),
    parentesco_convulsiones : new FormControl({value:'', disabled: true},[]),
    alcoholismo_sustancias_psicoactivas : new FormControl('',[Validators.required]),
    parentesco_alcoholismo_sustancias_psicoactivas: new FormControl({value:'', disabled: true},[]),    
    alergias : new FormControl('',[Validators.required]),
    parentesco_alergias: new FormControl({value:'', disabled: true},[]),
    tipo_alergia: new FormControl({value:'', disabled: true},[]),
    cancer : new FormControl('',[Validators.required]),
    parentesco_cancer: new FormControl({value:'', disabled: true},[]),
    tipo_cancer: new FormControl({value:'', disabled: true},[]),
    hipertension_arterial: new FormControl('',[Validators.required]),
    parentesco_hipertension_arterial: new FormControl({value:'', disabled: true},[]),
    otros : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]), 
    parentesco_otros : new FormControl('',[]),      
  });


  formulario_antecedentes_personales = new FormGroup({  
    diabetes : new FormControl('',[Validators.required]),
    observacion_diabetes : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),  
    tb_pulmonar : new FormControl('',[Validators.required]),
    observacion_tb_pulmonar : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    its : new FormControl('',[Validators.required]),
    observacion_its : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    desnutricion : new FormControl('',[Validators.required]),
    observacion_desnutricion : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    tipo_desnutricion: new FormControl('',[]),
    enfermedades_mentales : new FormControl('',[Validators.required]),
    observacion_enfermedades_mentales : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    tipo_enfermedad_mental: new FormControl('',[]),
    convulsiones : new FormControl('',[Validators.required]),
    observacion_convulsiones : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    alergias : new FormControl('',[Validators.required]),
    observacion_alergias : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    tipo_alergia: new FormControl('',[]),
    cancer : new FormControl('',[Validators.required]),
    observacion_cancer : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    tipo_cancer: new FormControl('',[]),
    hospitalarias_quirurgicas : new FormControl('',[Validators.required]),
    fecha_antecedente_hospitalario: new FormControl('',[]),
    tratamiento: new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    diagnostico: new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    tiempo_hospitalizacion: new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    traumaticos : new FormControl('',[Validators.required]),
    observacion_traumaticos : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    otros : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    observacion_otros : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
  });


  formulario_habito_toxicologico_personal = new FormGroup({
    alcohol : new FormControl('',[Validators.required]),
    observacion_alcohol : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    tabaquismo : new FormControl('',[Validators.required]),
    observacion_tabaquismo : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    marihuana : new FormControl('',[Validators.required]),
    observacion_marihuana : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    cocaina : new FormControl('',[Validators.required]),
    observacion_cocaina : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    otros : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    observacion_otros : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
  });


  formulario_actividad_sexual = new FormGroup({
    actividad_sexual : new FormControl('', Validators.required),
    edad_inicio_sexual : new FormControl('', [ Validators.max(50)]),
    numero_parejas_sexuales : new FormControl('', [ Validators.max(99)]),
    practicas_sexuales_riesgo : new FormControl(''),  
  });


  formulario_antecedente_ginecologico = new FormGroup ({
    edad_inicio_menstruacion : new FormControl('',[Validators.required,Validators.max(15),Validators.min(7)]),
    fum : new FormControl('',[Validators.required]),
    citologia : new FormControl('',[Validators.required]),
    fecha_citologia : new FormControl(''),
    resultado_citologia : new FormControl('', [ Validators.maxLength(60),Validators.minLength(3)]),
    duracion_ciclo_menstrual : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),
    periocidad_ciclo_menstrual : new FormControl('',[Validators.required]),
    caracteristicas_ciclo_menstrual : new FormControl('',[Validators.required])
  });


  formulario_planificacion_familiar = new FormGroup({
    planificacion_familiar : new FormControl('',Validators.required),
    metodo_planificacion : new FormControl(''),
    observacion_planificacion : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),    
  });


  formulario_antecedente_obstetrico = new FormGroup({
    partos: new FormControl('',[Validators.required,Validators.max(10),Validators.min(0)]),
    abortos: new FormControl('',[Validators.required,Validators.max(10),Validators.min(0)]),
    cesarias: new FormControl('',[Validators.required,Validators.max(10),Validators.min(0)]),
    hijos_vivos: new FormControl('',[Validators.required,Validators.max(10),Validators.min(0)]),
    hijos_muertos: new FormControl('',[Validators.required,Validators.max(10),Validators.min(0)]),
    fecha_termino_ult_embarazo : new FormControl(''),
    descripcion_termino_ult_embarazo : new FormControl(''),
    observaciones : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),  
  });
  

  matcher = new MyErrorStateMatcher();

  habilitarInputs(formControl : FormControl[]){  
    formControl.forEach(controlador => {
      controlador.enable({onlySelf: true});    
    });
  }

  borrarInputs(formControl : FormControl[]){
    formControl.forEach(controlador => {
      controlador.setValue('');
      controlador.disable({onlySelf: true});
    });
  }

  ya(){
    alert('macizo');
  }



readonly=true;
read15 = true;
isDisabledB25 = true;
input15 : string = '';

ocultar: boolean = true;
ocultar1: boolean = true;

mostrarS(){
  this.ocultar=false;
}
mostrarN(){
this.ocultar=true;
}

csi15(formControl : FormControl[]) { 
formControl.forEach(controlador => {
   controlador.enable({onlySelf: true});    
  });
  console.log(this.formulario_datos_generales.get('sexo').value);
  if(this.formulario_datos_generales.get('sexo').value == "Hombre"){
    this.ocultar1=false;
  }else{   
    this.ocultar1=false;
  }  
}

cno15(formControl : FormControl[]) {  
  formControl.forEach(controlador => {
    controlador.setValue('');
    controlador.disable({onlySelf: true});
  });
  console.log(this.formulario_datos_generales.get('sexo').value);
  if(this.formulario_datos_generales.get('sexo').value == "Hombre"){
    this.ocultar1=true;   
    
  }else{
    this.ocultar1=true;
  } 
}

public onControlChange(event: any): void
{
  console.log(event.value);

}

public onStepChange(event: any): void {
  console.log(event.selectedIndex);

    if (event.selectedIndex == 0) {   
      this.datosGenerales = "Datos Generales"
    this.antecedentesFamiliares = '';
    this.antecedentesPersonales = '';
    this.habitosToxicologicosPersonales = '';
    this.actividadSexualYReproductiva = '';
    this.antecedentesGinecologicos= '';
    this.antecedentesObstetricos= '';
    this.planificacionFamiliar = '';
    }

    if(event.selectedIndex ==1){
      this.datosGenerales = '';
      this.antecedentesFamiliares = 'Antecedentes Familiares';
      this.antecedentesPersonales = '';
      this.habitosToxicologicosPersonales = '';
      this.actividadSexualYReproductiva = '';
      this.antecedentesGinecologicos= '';
      this.antecedentesObstetricos= '';
      this.planificacionFamiliar = '';
    }

    if(event.selectedIndex ==2){
      this.datosGenerales = '';
      this.antecedentesFamiliares = '';
      this.antecedentesPersonales = 'Antecedentes Personales';
      this.habitosToxicologicosPersonales = '';
      this.actividadSexualYReproductiva = '';
      this.antecedentesGinecologicos= '';
      this.antecedentesObstetricos= '';
      this.planificacionFamiliar = '';
    }
    if(event.selectedIndex ==3){
      this.datosGenerales = '';
      this.antecedentesFamiliares = '';
      this.antecedentesPersonales = '';
      this.habitosToxicologicosPersonales = '';
      this.actividadSexualYReproductiva = 'Actividad Sexual Y Reproductiva';
      this.antecedentesGinecologicos= '';
      this.antecedentesObstetricos= '';
      this.planificacionFamiliar = '';
    }

    if(event.selectedIndex ==4){
      if(this.formulario_datos_generales.get('sexo').value == "Hombre" && this.formulario_actividad_sexual.get('actividad_sexual').value == "No"){
        this.datosGenerales = '';
      this.antecedentesFamiliares = '';
      this.antecedentesPersonales = '';
      this.habitosToxicologicosPersonales = 'habitos Toxicologicos Personales';
      this.actividadSexualYReproductiva = '';
      this.antecedentesGinecologicos= '';
      this.antecedentesObstetricos= '';
      this.planificacionFamiliar = '';

      }if(this.formulario_datos_generales.get('sexo').value == "Mujer" && this.formulario_actividad_sexual.get('actividad_sexual').value == "No"){
        this.datosGenerales = '';
        this.antecedentesFamiliares = '';
        this.antecedentesPersonales = '';
        this.habitosToxicologicosPersonales = '';
        this.actividadSexualYReproductiva = '';
        this.antecedentesGinecologicos= 'antecedentes Ginecologicos';
        this.antecedentesObstetricos= '';
        this.planificacionFamiliar = '';
      } 

      if(this.formulario_datos_generales.get('sexo').value == "Hombre" && this.formulario_actividad_sexual.get('actividad_sexual').value == "Si"){
        this.datosGenerales = '';
      this.antecedentesFamiliares = '';
      this.antecedentesPersonales = '';
      this.habitosToxicologicosPersonales = '';
      this.actividadSexualYReproductiva = '';
      this.antecedentesGinecologicos= '';
      this.antecedentesObstetricos= '';
      this.planificacionFamiliar = 'Planificacion Familiar';
      }
      
      if(this.formulario_datos_generales.get('sexo').value == "Mujer" && this.formulario_actividad_sexual.get('actividad_sexual').value == "Si"){
        this.datosGenerales = '';
        this.antecedentesFamiliares = '';
        this.antecedentesPersonales = '';
        this.habitosToxicologicosPersonales = '';
        this.actividadSexualYReproductiva = '';
        this.antecedentesGinecologicos= '';
        this.antecedentesObstetricos= 'antecedentes Obstetricos';
        this.planificacionFamiliar = '';
      } 
    }

    if(event.selectedIndex ==5){
    if(this.formulario_datos_generales.get('sexo').value == "Mujer" && this.formulario_actividad_sexual.get('actividad_sexual').value == "No"){
        this.datosGenerales = '';
        this.antecedentesFamiliares = '';
        this.antecedentesPersonales = '';
        this.habitosToxicologicosPersonales = 'habitos Toxicologicos Personales';
        this.actividadSexualYReproductiva = '';
        this.antecedentesGinecologicos= '';
        this.antecedentesObstetricos= '';
        this.planificacionFamiliar = '';
      } 
      if(this.formulario_datos_generales.get('sexo').value == "Hombre" && this.formulario_actividad_sexual.get('actividad_sexual').value == "Si"){
        this.datosGenerales = '';
      this.antecedentesFamiliares = '';
      this.antecedentesPersonales = '';
      this.habitosToxicologicosPersonales = 'habitos Toxicologicos Personales';
      this.actividadSexualYReproductiva = '';
      this.antecedentesGinecologicos= '';
      this.antecedentesObstetricos= '';
      this.planificacionFamiliar = '';
      }
      if(this.formulario_datos_generales.get('sexo').value == "Mujer" && this.formulario_actividad_sexual.get('actividad_sexual').value == "Si"){
        this.datosGenerales = '';
        this.antecedentesFamiliares = '';
        this.antecedentesPersonales = '';
        this.habitosToxicologicosPersonales = '';
        this.actividadSexualYReproductiva = '';
        this.antecedentesGinecologicos= '';
        this.antecedentesObstetricos= '';
        this.planificacionFamiliar = 'planificacion Familiar';
      } 
    }

    if(event.selectedIndex ==6){
        if(this.formulario_datos_generales.get('sexo').value == "Mujer" && this.formulario_actividad_sexual.get('actividad_sexual').value == "Si"){
        this.datosGenerales = '';
        this.antecedentesFamiliares = '';
        this.antecedentesPersonales = '';
        this.habitosToxicologicosPersonales = '';
        this.actividadSexualYReproductiva = '';
        this.antecedentesGinecologicos= 'antecedentesGinecologicos';
        this.antecedentesObstetricos= '';
        this.planificacionFamiliar = '';
      } 
    }
    
    if(event.selectedIndex ==7){
      if(this.formulario_datos_generales.get('sexo').value == "Mujer" && this.formulario_actividad_sexual.get('actividad_sexual').value == "Si"){
      this.datosGenerales = '';
      this.antecedentesFamiliares = '';
      this.antecedentesPersonales = '';
      this.habitosToxicologicosPersonales = 'Habitos Toxicologicos Personales';
      this.actividadSexualYReproductiva = '';
      this.antecedentesGinecologicos= '';
      this.antecedentesObstetricos= '';
      this.planificacionFamiliar = '';
    } 
  }
}


des = true;
ingreso : string ;
des1 = true;
ingreso1: string ;
des2 = true;
ingreso2: string ;
des3 = true;
ingreso3: string ;
    
Mostrar() {      
  this.des = false;
}
Esconder() {
this.ingreso  =null ;
this.des = true;      
}

Mostrar1() {      
this.des1 = false;
}
Esconder1() {
this.ingreso1  =null ;
this.des1 = true;      
}

Mostrar2() {      
this.des2 = false;
}
Esconder2() {
this.ingreso2  =null ;
this.des2 = true;      
}

Mostrar3() {      
this.des3 = false;
}
Esconder3() {
this.ingreso3  =null ;
this.des3 = true;      
}


  paciente: Paciente = {
    id_paciente: null,
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
    numero_telefono: null,
    emergencia_persona: null,
    emergencia_telefono: null,
    categoria:null
  };

  antecedente_familiar: AntecedentesFamiliares ={
    diabetes : null,
    parentesco_diabetes : null,
    tb_pulmonar : null,
    parentesco_tb_pulmonar : null,
    desnutricion : null,
    parentesco_desnutricion : null,
    tipo_desnutricion: null,
    enfermedades_mentales : null,
    parentesco_enfermedades_mentales : null,
    tipo_enfermedad_mental: null,
    convulsiones : null,
    parentesco_convulsiones : null,
    alcoholismo_sustancias_psicoactivas : null,
    parentesco_alcoholismo_sustancias_psicoactivas: null,
    alergias : null,
    parentesco_alergias: null,
    tipo_alergia: null,
    cancer : null,
    parentesco_cancer: null,
    tipo_cancer: null,
    hipertension_arterial: null,
    parentesco_hipertension_arterial: null,
    otros : null,
    parentesco_otros : null,
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
    tipo_desnutricion: null,
    enfermedades_mentales : null,
    observacion_enfermedades_mentales : null,
    tipo_enfermedad_mental: null,
    convulsiones : null,
    observacion_convulsiones : null,
    alergias : null,
    observacion_alergias : null,
    tipo_alergia: null,
    cancer : null,
    observacion_cancer : null,
    tipo_cancer: null,
    hospitalarias_quirurgicas : null,
    fecha_antecedente_hospitalario: null,
    tratamiento: null,
    diagnostico: null,
    tiempo_hospitalizacion: null,
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
    edad_inicio_menstruacion : null,
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
    partos: null,
    abortos: null,
    cesarias: null,
    hijos_vivos: null,
    hijos_muertos: null,
    fecha_termino_ult_embarazo : null,
    descripcion_termino_ult_embarazo : null,
    observaciones : null,
    id_paciente : null  
  };

  paciente_antecedente_familiar: PacienteAntecedenteFamiliar ={
    id_paciente: null,
    id_antecedente: null,
    id_parentesco: null,
  };

  error: boolean = false;

  //date picker
  minDate = new Date(1950, 0, 1);
  maxDate = new Date(); 

  //select
  categorias: select[] = [
    {value: 'T', viewValue: 'Empleado'},
    {value: 'V', viewValue: 'Visitante'},
    {value: 'P', viewValue: 'Prosene'}
  ];
  sexos: select[] = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'mujer', viewValue: 'Mujer'},
    {value: 'otro', viewValue: 'Otro'}
  ];

  seguros_medicos: SegurosMedicos[] = [
    {value: 1, viewValue: 'Privado'},
    {value: 2, viewValue: 'IHSS'},
    {value: 3, viewValue: 'No'}
  ];

  estados_civiles: EstadosCiviles[] = [
    {value: 1, viewValue: 'Soltero'},
    {value: 2, viewValue: 'Union Libre'},
    {value: 3, viewValue: 'Divorciado'},
    {value: 4, viewValue: 'Viudo'},
    {value: 5, viewValue: 'Casado'},
  ];

  parentescos: Parentescos[] = [
    {value: 1 , viewValue: 'Padre'},
    {value: 2 , viewValue: 'Madre'},
    {value: 4 , viewValue: 'Abuelos'},
    {value: 3 , viewValue: 'Tios'},
    {value: 5 , viewValue: 'Otros'},
  ];

  desnutriciones: select[] = [
    {value: 'Obecidad' , viewValue: 'Obecidad'},
    {value: 'Muy degaldo' , viewValue: 'Muy delgado'},
  ];

  enfermedades_mentaless: select[] = [
    {value: 'Alzheimer' , viewValue: 'Alzheimer'},
    {value: 'Parkinson' , viewValue: 'Parkinson'},
    {value: 'Esquizofrenia' , viewValue: 'Esquizofrenia'},
    {value: 'Ansiedad' , viewValue: 'Ansiedad'},
    {value: 'Trastorno de pánico' , viewValue: 'Trastorno de pánico'},
    {value: 'Estrés' , viewValue: 'Estrés'},
    {value: 'Bipolar' , viewValue: 'Bipolar'},
  ];
  
  tipos_alergias: select[] = [
    {value: 'Medicamentos' , viewValue: 'Medicamentos'},
    {value: 'Alimentos' , viewValue: 'Alimentos'},
    {value: 'Cambios de clima' , viewValue: 'Cambios de clima'},
    {value: 'Tipo de tela' , viewValue: 'Tipos de tela'},
    {value: 'Animales' , viewValue: 'Animales'},
    {value: 'Otros' , viewValue: 'Otros'},
  ];

  canceres: select[] = [
    {value: 'Mama' , viewValue: 'Mama'},
    {value: 'Tiroides' , viewValue: 'Tiroides'},
    {value: 'Estómago' , viewValue: 'Estómago'},
    {value: 'Páncreas' , viewValue: 'Páncreas'},
    {value: 'Testiculo' , viewValue: 'Testiculo'},
    {value: 'Pene' , viewValue: 'Pene'},
    {value: 'Leucemia' , viewValue: 'Leucemia'},
    {value: 'Cervicouterino' , viewValue: 'Cervicouterino'}
  ];

  practicas_sexuales: PracticasSexuales[] = [
    {value: 1 , viewValue: 'Anal'},
    {value: 2 , viewValue: 'Vaginal'},
    {value: 3 , viewValue: 'Oral'},
  ];

  periocidades: select[] = [
    {value: 'Regular' , viewValue: 'Regular'},
    {value: 'Irregular' , viewValue: 'Irregular'},
  ];
  
  caracteristicas: select[] = [
    {value: 'Abundante' , viewValue: 'Abundante'},
    {value: 'Normal' , viewValue: 'Normal'},
    {value: 'Escasa' , viewValue: 'Escasa'},
  ];

  // metodos: select[] = [
  //   {value: 'DIU' , viewValue: 'DIU'},
  //   {value: 'Condón' , viewValue: 'Condón'},
  //   {value: 'Pastilla' , viewValue: 'Pastilla'},
  //   {value: 'Implante' , viewValue: 'Implante'},
  //   {value: 'Inyección trimestral' , viewValue: 'Inyección trimestral'},
  //   {value: 'Inyección trimestral' , viewValue: 'Inyección trimestral'},
  //   {value: 'Inyección mensual' , viewValue: 'Inyección mensual'},
  //   {value: 'Ritmo' , viewValue: 'Ritmo'},
  //   {value: 'Esterilización' , viewValue: 'Esterilización'}];

  metodos: MetodoPlanificacion[] = [
    {value: 1 , viewValue: 'DIU'},
    {value: 2 , viewValue: 'Condón'},
    {value: 3 , viewValue: 'Pastilla'},
    {value: 4 , viewValue: 'Implante'},
    {value: 5 , viewValue: 'Inyección trimestral'},
    {value: 6 , viewValue: 'Inyección trimestral'},
    {value: 7 , viewValue: 'Inyección mensual'},
    {value: 8 , viewValue: 'Ritmo'},
    {value: 9 , viewValue: 'Esterilización'},

  ];

  resultados_embarazos: select[] = [
    {value: 'Sin complicaciones' , viewValue: 'Sin complicaciones'},
    {value: 'Con complicaciones' , viewValue: 'Con complicaciones'},    
  ];

  resultado:any;
  id:any;
  esAlumno: boolean = true;

  tablaOtros: Element[] = [];

  dataSource : any;
  columnasTabla: string[] = ['numero','antecedente','parentesco'];


  // creo estos arreglos de los cuales extraigo el valor de cada elemento y lo mando a la tabla de pacientes_antecedentes_familiares
  // estos arreglos son de los controladores del formulario antecedentes familiares
  formControlsAntecedentes: any[] = [this.diabetes, this.tb_pulmonar, this.desnutricion, this.enfermedades_mentales, this.convulsiones,
    this.alcoholismo_sustancias_psicoactivas, this.alergias, this.cancer, this.hipertension_arterial
  ];

  formControlsParentescos: any[] = [this.parentesco_diabetes, this.parentesco_tb_pulmonar, this.parentesco_desnutricion,
    this.parentesco_enfermedades_mentales, this.parentesco_convulsiones, this.parentesco_alcoholismo_sustancias_psicoactivas,
    this.parentesco_alergias, this.parentesco_cancer, this.parentesco_hipertension_arterial
  ];

  



  constructor(private formularioService: FormularioService, 
    private router: Router, activar: AppComponent,public dialog: MatDialog, 
    public login: LoginService, private formulario: FormularioService) {

      
      
      // if(this.esAlumno == true){
        this.getDatosScraping();
      // }      
    }
    
    // para que se le quite la cosa fea al text area
    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    
 

  
     
  ngOnInit() {
    this.getDatosScraping();
    this.esAlumno = this.formulario.esAlumno; 
  
  }
  



  modificaciones(){
    if (this.esAlumno==false) {
      this.numero_cuenta.valid;
      this.numero_identidad.valid;
      
    }
  }

  getDatosScraping(){

    // if(this.esAlumno === true){
      this.formularioService.getScrap().subscribe((data: Login) =>{
        this.datosScraping = data;
  
  
        if(this.esAlumno === true){

          // si el paciente es un alumno 
          //establesco el valor a los formcontrol recuperados del scrapping
          // para que se visualizen en los respectivos inputs
          this.nombre_completo.setValue(this.datosScraping.nombre);
          this.numero_cuenta.setValue(this.datosScraping.cuenta);
          this.numero_identidad.setValue(this.datosScraping.numero_identidad);
          this.carrera.setValue(this.datosScraping.carrera);
          this.categoria.setValue('E');

        }else{
          //si el paciente no es un alumno
          //establesco el valor por defecto a los formcontrol que no pertenecen a un
          //paciente normal y les establesco un valor por defecto

          var numAleatorio: string;
          numAleatorio = '2'+ Math.floor(Math.random()*10000000000);
          console.log(numAleatorio);
          this.carrera.setValue('no es estudiante');
          this.numero_cuenta.setValue(numAleatorio);
        }
       
        
        console.log(this.datosScraping);
  
        
            //Obtencion de Paciente ultimo paciente regitrado
            this.formularioService.getUltimoID().subscribe((data)=>{
             this.resultado = data;
             if(this.resultado[0].ultimoId==null){
              this.resultado[0].ultimoId=0;
              console.log(this.resultado[0].ultimoId);
             }
             
  
             if (this.esAlumno==false) {
              
                 this.datosScraping.clave = null;
                 this.datosScraping.nombre = null;
                 this.datosScraping.carrera = null;
                 this.datosScraping.numero_identidad = null;
                 this.datosScraping.imagen = null;
                
              }
                var numero=1;
                console.log(this.resultado[0].ultimoId);
                this.datosScraping.id_login= parseInt(this.resultado[0].ultimoId)+numero;
                console.log(this.datosScraping.id_login);
     
        
           }, (error)=>{
             console.log(error);
           }); 
  
          
  
       
        console.log(this.datosScraping);
      },
      (error) => {
        console.log(error),
        alert('ocurrio un error');  
      });    
    
    
  }

  agregar(){

    if(this.otros.value && this.otros.valid && this.parentesco_otros.value){
      
      this.tablaOtros.push(
        {
          numero:this.tablaOtros.length + 1,
          antecedente: this.otros.value,
          parentesco: this.parentesco_otros.value,
        }

      );

      this.dataSource =  new MatTableDataSource(this.tablaOtros);
  
      console.log(this.tablaOtros);
  
      this.otros.setValue('');
      this.parentesco_otros.setValue('');
    }
    

  }



  enviarDatos(){
    this.loading = true;


    if (this.esAlumno==true) {
     
      if(this.formulario_datos_generales.valid){

        // guardar datos del formulario en paciente y enviarlo a la api
        this.paciente.id_paciente = this.datosScraping.id_login;
        this.paciente.nombre_completo = this.nombre_completo.value;
        this.paciente.numero_cuenta = this.numero_cuenta.value;
        this.paciente.numero_identidad = this.numero_identidad.value;
        this.paciente.imagen = this.datosScraping.imagen;
        this.paciente.lugar_procedencia = this.lugar_procedencia.value;
        this.paciente.direccion = this.direccion.value;
        this.paciente.carrera = this.carrera.value;
        this.paciente.fecha_nacimiento = this.fecha_nacimiento.value;
        this.paciente.contrasenia=this.login.porMientras;
        console.log(this.login.porMientras);
        this.paciente.sexo = this.sexo.value;
        this.paciente.estado_civil = this.estado_civil.value;
        this.paciente.seguro_medico = this.seguro_medico.value;
        this.paciente.numero_telefono = this.numero_telefono.value;
        this.paciente.emergencia_persona = this.emergencia_persona.value;
        this.paciente.emergencia_telefono = this.emergencia_telefono.value;
        this.paciente.categoria = this.categoria.value;
        
        this.formularioService.guardarDatosGenerales(this.paciente).subscribe( (data) =>{
          this.obtener();
          console.log(data);     
        }, (error) => {
          console.log(error);
          this.error = true;
          alert('ocurrion un error');
        });
      }

    }else{
     
      if(this.formulario_datos_generales.valid){

        // guardar datos del formulario en paciente y enviarlo a la api
        this.paciente.id_paciente = this.datosScraping.id_login;
        this.paciente.nombre_completo = this.nombre_completo.value;
        this.paciente.numero_cuenta = this.numero_cuenta.value;
        this.paciente.numero_identidad = this.numero_identidad.value;
        // this.paciente.imagen = this.datosScraping.imagen;

        this.paciente.lugar_procedencia = this.lugar_procedencia.value;
        this.paciente.direccion = this.direccion.value;
        this.paciente.carrera = this.carrera.value;
        this.paciente.fecha_nacimiento =  this.fecha_nacimiento.value;
        this.paciente.sexo = this.sexo.value;
        this.paciente.estado_civil = this.estado_civil.value;
        this.paciente.seguro_medico = this.seguro_medico.value;
        this.paciente.numero_telefono = this.numero_telefono.value;
        this.paciente.emergencia_persona = this.emergencia_persona.value;
        this.paciente.emergencia_telefono = this.emergencia_telefono.value;
        this.paciente.categoria= this.categoria.value;
      
      
        this.formularioService.guardarDatosGenerales(this.paciente).subscribe( (data) =>{
          console.log(data);  
          this.obtener();
      
        }, (error) => {
          console.log(error);
          this.error = true;
          alert('ocurrion un error');
        });

      }
    }
      

      if(this.formulario_antecedentes_familiares.valid){

        var parentescos : any;
        for (let index = 0; index < this.formControlsAntecedentes.length; index++) {
          const element = this.formControlsAntecedentes[index];

             // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
            if(element.value != 0){

              this.paciente_antecedente_familiar.id_paciente = this.datosScraping.id_login;
              this.paciente_antecedente_familiar.id_antecedente = element.value;


              //guardo el valor del controlador del parentesco y lo guardo en una variable de tipo any
              // ahora el select como es multiple me devuelve un arreglo
              parentescos = this.formControlsParentescos[index].value;

              // por cada vuelta que de el ciclo se hará un registro en la tabla pacientes_antecedentes_familiares,
              // siendo cada registro un antecedente de los antecedentes familiares y su parentesco
              // si el antecedente tiene mas de un 1 parentesco entonces se insertara varias veces el mismo antecedente
              // con los diferentes parentesco.
              parentescos.forEach(element => {
                this.paciente_antecedente_familiar.id_parentesco = element;

                this.formularioService.enviarPruebaPaciente(this.paciente_antecedente_familiar).subscribe((data)=>{
                  console.log('se envio perron la prueba');
                }, (error)=>{
                  console.log(error);
                });

              });
              
            }
          
        }

      }
      
      if(this.formulario_antecedentes_personales.valid){

        // guardar datos del formulario en antecedente_personal y enviarlo a la api
        this.antecedente_personal.diabetes = this.diabetes_ap.value;
        this.antecedente_personal.observacion_diabetes = this.observacion_diabetes_ap.value;
        this.antecedente_personal.tb_pulmonar = this.tb_pulmonar_ap.value;
        this.antecedente_personal.observacion_tb_pulmonar = this.observacion_tb_pulmonar_ap.value;
        this.antecedente_personal.its = this.its.value;
        this.antecedente_personal.observacion_its = this.observacion_its.value;
        this.antecedente_personal.desnutricion = this.desnutricion_ap.value;
        this.antecedente_personal.observacion_desnutricion = this.observacion_desnutricion_ap.value;
        this.antecedente_personal.tipo_desnutricion = this.tipo_desnutricion_ap.value;
        this.antecedente_personal.enfermedades_mentales = this.enfermedades_mentales_ap.value;
        this.antecedente_personal.observacion_enfermedades_mentales = this.observacion_enfermedades_mentales_ap.value;
        this.antecedente_personal.tipo_enfermedad_mental = this.tipo_enfermedad_mental_ap.value;
        this.antecedente_personal.convulsiones = this.convulsiones_ap.value;
        this.antecedente_personal.observacion_convulsiones = this.observacion_convulsiones_ap.value;
        this.antecedente_personal.alergias = this.alergias_ap.value;
        this.antecedente_personal.observacion_alergias = this.observacion_alergias_ap.value;
        this.antecedente_personal.tipo_alergia = this.tipo_alergia_ap.value;
        this.antecedente_personal.cancer = this.cancer_ap.value;
        this.antecedente_personal.observacion_cancer = this.observacion_cancer_ap.value;
        this.antecedente_personal.tipo_cancer = this.tipo_cancer_ap.value;
        this.antecedente_personal.hospitalarias_quirurgicas = this.hospitalarias_quirurgicas.value;
        this.antecedente_personal.fecha_antecedente_hospitalario = this.fecha_antecedente_hospitalario.value;
        this.antecedente_personal.tratamiento = this.tratamiento.value;
        this.antecedente_personal.diagnostico = this.diagnostico.value;
        this.antecedente_personal.tiempo_hospitalizacion = this.tiempo_hospitalizacion.value;
        this.antecedente_personal.traumaticos = this.traumaticos.value;
        this.antecedente_personal.observacion_traumaticos = this.observacion_traumaticos.value;
        this.antecedente_personal.otros = this.otros_ap.value;
        this.antecedente_personal.observacion_otros = this.observacion_otros_ap.value;
        this.antecedente_personal.id_paciente = this.datosScraping.id_login;
        
        this.formularioService.guardarAntecedentesPersonales(this.antecedente_personal).subscribe( (data) =>{
          console.log(data);
        }, (error) => {
          this.error = true;
          console.log(error);
          alert('ocurrion un error');
        });
    
      }

        
      if(this.formulario_habito_toxicologico_personal.valid){

        // guardar datos del formulario en habito_toxicologico y enviarlo a la api
        this.habito_toxicologico_personal.alcohol = this.alcohol.value;
        this.habito_toxicologico_personal.observacion_alcohol = this.observacion_alcohol.value;
        this.habito_toxicologico_personal.tabaquismo = this.tabaquismo.value;
        this.habito_toxicologico_personal.observacion_tabaquismo = this.observacion_tabaquismo.value;
        this.habito_toxicologico_personal.marihuana = this.marihuana.value;
        this.habito_toxicologico_personal.observacion_marihuana = this.observacion_marihuana.value;
        this.habito_toxicologico_personal.cocaina = this.cocaina.value;
        this.habito_toxicologico_personal.observacion_cocaina = this.observacion_cocaina.value;
        this.habito_toxicologico_personal.otros = this.otros_ht.value;
        this.habito_toxicologico_personal.observacion_otros = this.observacion_otros_ht.value;
        this.habito_toxicologico_personal.id_paciente = this.datosScraping.id_login;

        this.formularioService.guardarHabitosToxicologicosPersonales(this.habito_toxicologico_personal).subscribe( (data) =>{
          console.log(data);
        }, (error) => {
          this.error = true;
          console.log(error);
          alert('ocurrion un error');
        });

      }

      if(this.formulario_actividad_sexual.valid){
          // guardar datos del formulario en actividad_sexual y enviarlo a la api
        this.actividad_sexual.actividad_sexual = this.actividad_sexuall.value;
        this.actividad_sexual.edad_inicio_sexual = this.edad_inicio_sexual.value;
        this.actividad_sexual.numero_parejas_sexuales = this.numero_parejas_sexuales.value;
        this.actividad_sexual.practicas_sexuales_riesgo = this.practicas_sexuales_riesgo.value;
        this.actividad_sexual.id_paciente = this.datosScraping.id_login;

        this.formularioService.guardarActividadSexual(this.actividad_sexual).subscribe( (data) =>{
          console.log(data);
        }, (error) => {
          this.error = true;
          console.log(error);
          alert('ocurrion un error');
        });

      }


      if(this.ocultar1 == false){


        if(this.formulario_antecedente_obstetrico.valid){
          // guardar datos del formulario en antecedente_obstetrico y enviarlo a la api
          this.antecedente_obstetrico.partos = this.partos.value;
          this.antecedente_obstetrico.abortos = this.abortos.value;
          this.antecedente_obstetrico.cesarias = this.cesarias.value;
          this.antecedente_obstetrico.hijos_vivos = this.hijos_vivos.value;
          this.antecedente_obstetrico.hijos_muertos = this.hijos_muertos.value;
          this.antecedente_obstetrico.fecha_termino_ult_embarazo = this.fecha_termino_ult_embarazo.value;
          this.antecedente_obstetrico.descripcion_termino_ult_embarazo = this.descripcion_termino_ult_embarazo.value;
          this.antecedente_obstetrico.observaciones = this.observaciones.value;  
          this.antecedente_obstetrico.id_paciente = this.datosScraping.id_login;
  
          this.formularioService.guardarAntecedentesObstetricos(this.antecedente_obstetrico).subscribe( (data) =>{
            console.log(data);
          }, (error) => {
            this.error = true;
            console.log(error);
            alert('ocurrion un error');
          });
         } 


         if(this.formulario_planificacion_familiar.valid){
          // guardar datos del formulario en planificacion_familiar y enviarlo a la api
          this.planificacion_familiar.planificacion_familiar = this.planificacion_familiarr.value;
          this.planificacion_familiar.metodo_planificacion = this.metodo_planificacion.value;
          this.planificacion_familiar.observacion_planificacion = this.observacion_planificacion.value;
          this.planificacion_familiar.id_paciente = this.datosScraping.id_login;

          this.formularioService.guardarPlanificacionesFamiliares(this.planificacion_familiar).subscribe( (data) =>{
            console.log(data);
          }, (error) => {
            this.error = true;
            console.log(error);
            alert('ocurrion un error');
          });

          }else{
          this.error= true;
          }
      }

      
      if(this.formulario_antecedente_ginecologico.valid){

        // guardar datos del formulario en antecedente_genicologico y enviarlo a la api
        this.antecedente_ginecologico.edad_inicio_menstruacion = this.edad_inicio_menstruacion.value;
        this.antecedente_ginecologico.fum = this.fum.value;
        this.antecedente_ginecologico.citologia = this.citologia.value;
        this.antecedente_ginecologico.fecha_citologia = this.fecha_citologia.value;
        this.antecedente_ginecologico.resultado_citologia = this.resultado_citologia.value;
        this.antecedente_ginecologico.duracion_ciclo_menstrual = this.duracion_ciclo_menstrual.value;
        this.antecedente_ginecologico.periocidad_ciclo_menstrual = this.periocidad_ciclo_menstrual.value;
        this.antecedente_ginecologico.caracteristicas_ciclo_menstrual = this.caracteristicas_ciclo_menstrual.value;
        this.antecedente_ginecologico.id_paciente = this.datosScraping.id_login;

        this.formularioService.guardarAntecedentesGinecologicos(this.antecedente_ginecologico).subscribe( (data) =>{
          console.log(data);
        }, (error) => {
          this.error = true;
          console.log(error);
          alert('ocurrion un error');
        });
        
       }


     


    // alert ('los datos se enviarion');      
    // this.router.navigate(['datoPaciente/'+this.datosScraping.id_login]);
   

     

     //borro los datos que se habian recuperado del scraping 
     this.datosScraping.id_login=  null;
     this.datosScraping.cuenta = null;
     this.datosScraping.clave = null;
     this.datosScraping.nombre = null;
     this.datosScraping.carrera = null;
     this.datosScraping.numero_identidad = null;
     
     
    
  };

  obtener(){
     //Obtencion de Paciente recien registrado
     this.formularioService.getUltimoID().subscribe((data)=>{
      this.resultado = data;
      console.log(this.resultado);
      if(this.resultado!=null){
        if(this.resultado[0].ultimoId!=null){
          this.loading=false;
          this.login.idpaciente =this.resultado[0].ultimoId;
          this.openDialog();

      }
       }
    }, (error)=>{
      console.log(error);
    }); 

  }
  openDialog() {
    
    index: Number;
    const index = this.paciente.id_paciente;
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {disableClose:true});
    

    
    
  }
  



  //obtener los campos del formGroup: formulario_datos_generales
  get nombre_completo(){return this.formulario_datos_generales.get('nombre_completo')};
  get segundo_apellido(){return this.formulario_datos_generales.get('segundo_apellido')};
  get primer_nombre(){return this.formulario_datos_generales.get('primer_nombre')};
  get segundo_nombre(){return this.formulario_datos_generales.get('segundo_nombre')};
  get numero_cuenta(){return this.formulario_datos_generales.get('numero_cuenta')};
  get numero_identidad(){return this.formulario_datos_generales.get('numero_identidad')};
  get lugar_procedencia(){return this.formulario_datos_generales.get('lugar_procedencia')};
  get direccion(){return this.formulario_datos_generales.get('direccion')};
  get carrera(){return this.formulario_datos_generales.get('carrera')};
  get fecha_nacimiento(){return this.formulario_datos_generales.get('fecha_nacimiento')};
  get sexo(){return this.formulario_datos_generales.get('sexo')};
  get estado_civil(){return this.formulario_datos_generales.get('estado_civil')};
  get seguro_medico(){return this.formulario_datos_generales.get('seguro_medico')};
  get numero_telefono(){return this.formulario_datos_generales.get('numero_telefono')};
  get emergencia_telefono(){return this.formulario_datos_generales.get('emergencia_telefono')};
  get emergencia_persona(){return this.formulario_datos_generales.get('emergencia_persona')};
  get categoria(){return this.formulario_datos_generales.get('categoria')};

  
  //obtener los campos del formGroup: formulario_antecedentes_familiares
  get diabetes(){return this.formulario_antecedentes_familiares.get('diabetes')};
  get parentesco_diabetes(){return this.formulario_antecedentes_familiares.get('parentesco_diabetes')};
  get tb_pulmonar(){return this.formulario_antecedentes_familiares.get('tb_pulmonar')};
  get parentesco_tb_pulmonar(){return this.formulario_antecedentes_familiares.get('parentesco_tb_pulmonar')};
  get desnutricion(){return this.formulario_antecedentes_familiares.get('desnutricion')};
  get parentesco_desnutricion(){return this.formulario_antecedentes_familiares.get('parentesco_desnutricion')};
  get tipo_desnutricion(){return this.formulario_antecedentes_familiares.get('tipo_desnutricion')};
  get enfermedades_mentales(){return this.formulario_antecedentes_familiares.get('enfermedades_mentales')};
  get parentesco_enfermedades_mentales(){return this.formulario_antecedentes_familiares.get('parentesco_enfermedades_mentales')};
  get tipo_enfermedad_mental(){return this.formulario_antecedentes_familiares.get('tipo_enfermedad_mental')};
  get convulsiones(){return this.formulario_antecedentes_familiares.get('convulsiones')};
  get parentesco_convulsiones(){return this.formulario_antecedentes_familiares.get('parentesco_convulsiones')};
  get alcoholismo_sustancias_psicoactivas(){return this.formulario_antecedentes_familiares.get('alcoholismo_sustancias_psicoactivas')};
  get parentesco_alcoholismo_sustancias_psicoactivas(){return this.formulario_antecedentes_familiares.get('parentesco_alcoholismo_sustancias_psicoactivas')};
  get alergias(){return this.formulario_antecedentes_familiares.get('alergias')};
  get parentesco_alergias(){return this.formulario_antecedentes_familiares.get('parentesco_alergias')};
  get tipo_alergia(){return this.formulario_antecedentes_familiares.get('tipo_alergia')};
  get cancer(){return this.formulario_antecedentes_familiares.get('cancer')};
  get parentesco_cancer(){return this.formulario_antecedentes_familiares.get('parentesco_cancer')};
  get tipo_cancer(){return this.formulario_antecedentes_familiares.get('tipo_cancer')};
  get hipertension_arterial(){return this.formulario_antecedentes_familiares.get('hipertension_arterial')};
  get parentesco_hipertension_arterial(){return this.formulario_antecedentes_familiares.get('parentesco_hipertension_arterial')};
  get otros(){return this.formulario_antecedentes_familiares.get('otros')};
  get parentesco_otros(){return this.formulario_antecedentes_familiares.get('parentesco_otros')};


  //obtener los campos del formGroup: formulario_antecedentes_personales
  get diabetes_ap(){return this.formulario_antecedentes_personales.get('diabetes')};
  get observacion_diabetes_ap(){return this.formulario_antecedentes_personales.get('observacion_diabetes')};
  get tb_pulmonar_ap(){return this.formulario_antecedentes_personales.get('tb_pulmonar')};
  get observacion_tb_pulmonar_ap(){return this.formulario_antecedentes_personales.get('observacion_tb_pulmonar')};
  get its(){return this.formulario_antecedentes_personales.get('its')};
  get observacion_its(){return this.formulario_antecedentes_personales.get('observacion_its')};
  get desnutricion_ap(){return this.formulario_antecedentes_personales.get('desnutricion')};
  get observacion_desnutricion_ap(){return this.formulario_antecedentes_personales.get('observacion_desnutricion')};
  get tipo_desnutricion_ap(){return this.formulario_antecedentes_personales.get('tipo_desnutricion')};
  get enfermedades_mentales_ap(){return this.formulario_antecedentes_personales.get('enfermedades_mentales')};
  get observacion_enfermedades_mentales_ap(){return this.formulario_antecedentes_personales.get('observacion_enfermedades_mentales')};
  get tipo_enfermedad_mental_ap(){return this.formulario_antecedentes_personales.get('tipo_enfermedad_mental')};
  get convulsiones_ap(){return this.formulario_antecedentes_personales.get('convulsiones')};
  get observacion_convulsiones_ap(){return this.formulario_antecedentes_personales.get('observacion_convulsiones')};
  get alergias_ap(){return this.formulario_antecedentes_personales.get('alergias')};
  get observacion_alergias_ap(){return this.formulario_antecedentes_personales.get('observacion_alergias')};
  get tipo_alergia_ap(){return this.formulario_antecedentes_personales.get('tipo_alergia')};
  get cancer_ap(){return this.formulario_antecedentes_personales.get('cancer')};
  get observacion_cancer_ap(){return this.formulario_antecedentes_personales.get('observacion_cancer')};
  get tipo_cancer_ap(){return this.formulario_antecedentes_personales.get('tipo_cancer')};
  get hospitalarias_quirurgicas(){return this.formulario_antecedentes_personales.get('hospitalarias_quirurgicas')};
  get fecha_antecedente_hospitalario(){return this.formulario_antecedentes_personales.get('fecha_antecedente_hospitalario')};
  get tratamiento(){return this.formulario_antecedentes_personales.get('tratamiento')};
  get diagnostico(){return this.formulario_antecedentes_personales.get('diagnostico')};
  get tiempo_hospitalizacion(){return this.formulario_antecedentes_personales.get('tiempo_hospitalizacion')};
  get traumaticos(){return this.formulario_antecedentes_personales.get('traumaticos')};
  get observacion_traumaticos(){return this.formulario_antecedentes_personales.get('observacion_traumaticos')};
  get otros_ap(){return this.formulario_antecedentes_personales.get('otros')};
  get observacion_otros_ap(){return this.formulario_antecedentes_personales.get('observacion_otros')};

  //obtener los campos del formGroup: formulario_habito_toxicologico_personal
  get alcohol(){return this.formulario_habito_toxicologico_personal.get('alcohol')};
  get observacion_alcohol(){return this.formulario_habito_toxicologico_personal.get('observacion_alcohol')};
  get tabaquismo(){return this.formulario_habito_toxicologico_personal.get('tabaquismo')};
  get observacion_tabaquismo(){return this.formulario_habito_toxicologico_personal.get('observacion_tabaquismo')};
  get marihuana(){return this.formulario_habito_toxicologico_personal.get('marihuana')};
  get observacion_marihuana(){return this.formulario_habito_toxicologico_personal.get('observacion_marihuana')};
  get cocaina(){return this.formulario_habito_toxicologico_personal.get('cocaina')};
  get observacion_cocaina(){return this.formulario_habito_toxicologico_personal.get('observacion_cocaina')};
  get otros_ht(){return this.formulario_habito_toxicologico_personal.get('otros')};
  get observacion_otros_ht(){return this.formulario_habito_toxicologico_personal.get('observacion_otros')};


  //obtener los campos del formGroup: formulario_actividad_sexual
  get actividad_sexuall(){return this.formulario_actividad_sexual.get('actividad_sexual')};
  get edad_inicio_sexual(){return this.formulario_actividad_sexual.get('edad_inicio_sexual')};
  get numero_parejas_sexuales(){return this.formulario_actividad_sexual.get('numero_parejas_sexuales')};
  get practicas_sexuales_riesgo(){return this.formulario_actividad_sexual.get('practicas_sexuales_riesgo')};


  //obtener los campos del formGroup: formulario_antecedente_ginecologico
  get edad_inicio_menstruacion(){return this.formulario_antecedente_ginecologico.get('edad_inicio_menstruacion')};
  get fum(){return this.formulario_antecedente_ginecologico.get('fum')};
  get citologia(){return this.formulario_antecedente_ginecologico.get('citologia')};
  get fecha_citologia(){return this.formulario_antecedente_ginecologico.get('fecha_citologia')};
  get resultado_citologia(){return this.formulario_antecedente_ginecologico.get('resultado_citologia')};
  get duracion_ciclo_menstrual(){return this.formulario_antecedente_ginecologico.get('duracion_ciclo_menstrual')};
  get periocidad_ciclo_menstrual(){return this.formulario_antecedente_ginecologico.get('periocidad_ciclo_menstrual')};
  get caracteristicas_ciclo_menstrual(){return this.formulario_antecedente_ginecologico.get('caracteristicas_ciclo_menstrual')};


  //obtener los campos del formGroup: formulario_planifacion_familiar
  get planificacion_familiarr(){return this.formulario_planificacion_familiar.get('planificacion_familiar')};
  get metodo_planificacion(){return this.formulario_planificacion_familiar.get('metodo_planificacion')};
  get observacion_planificacion(){return this.formulario_planificacion_familiar.get('observacion_planificacion')};

  //obtener los campos del formGroup: formulario_antecedente_obstetrico
  get partos(){return this.formulario_antecedente_obstetrico.get('partos')};
  get abortos(){return this.formulario_antecedente_obstetrico.get('abortos')};
  get cesarias(){return this.formulario_antecedente_obstetrico.get('cesarias')};
  get hijos_vivos(){return this.formulario_antecedente_obstetrico.get('hijos_vivos')};
  get hijos_muertos(){return this.formulario_antecedente_obstetrico.get('hijos_muertos')};
  get fecha_termino_ult_embarazo(){return this.formulario_antecedente_obstetrico.get('fecha_termino_ult_embarazo')};
  get descripcion_termino_ult_embarazo(){return this.formulario_antecedente_obstetrico.get('descripcion_termino_ult_embarazo')};
  get observaciones(){return this.formulario_antecedente_obstetrico.get('observaciones')};

  

}


