import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSidenav, MatDialog, MatDialogRef } from '@angular/material';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { AntecedentesPersonales } from '../interfaces/antecedentes-personales';
import { MatMonthView } from '@angular/material/datepicker';
import { AppComponent } from '../app.component';
import { select, Parentescos } from '../formulario/formulario.component';
import { AntecedentesFamiliares } from '../interfaces/antecedentes-familiares';
import { MatTableDataSource } from '@angular/material';
import { ThrowStmt } from '@angular/compiler';
import { HabitosToxicologicosPersonales } from '../interfaces/habitos-toxicologicos-personales';
import { ActividadSexual } from '../interfaces/actividad-sexual';
import { AntecedentesGinecologicos } from '../interfaces/antecedentes-ginecologicos';
import { PlanificacionesFamiliares } from '../interfaces/planificaciones-familiares';
import { AntecedentesObstetricos } from '../interfaces/antecedentes-obstetricos';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { InventariosService } from '../services/inventarios.service';
import { Cita } from '../interfaces/Cita';
import {animate, state, style, transition, trigger} from '@angular/animations';


export interface Select {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}


export interface Element{
  antecedente: string;
  valor: string;
  tipo?: string;
  parentesco?: string;
  observacion?: string;


}

export class MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-listado-estudiantes',
  templateUrl: './listado-estudiantes.component.html',
  styleUrls: ['./listado-estudiantes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})




export class ListadoEstudiantesComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  dataSource1:any;
  columnsToDisplay = ['fechayHora', 'observaciones', 'impresion', 'indicaciones'];
  expandedElement: Cita | null;


  
  events: string[] = [];
  opened: boolean;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  titulo= 'Ingreso de datos restantes';
  

  formulario_datos_faltantes = new FormGroup({  
    peso : new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{1,3}$/)]),
    talla: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]), 
    // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
    // "/ /" indica el inicio y el final de la expresion regular
    // "{10}" indica le numero de digitos de lo que lo antecede
    imc: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{1,3}$/)]),
     // "\d" es lo mismo "[0-9]"
    temperatura: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]),
    presion: new FormControl('', [Validators.required]),
    pulso: new FormControl('', [Validators.required]),
    
});
matcher = new MyErrorStateMatcher();

formulario_datos_generales = new FormGroup({
    
      
  nombre_completo: new FormControl('', [Validators.required]),
  // segundo_apellido: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
  // primer_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
  // segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
  numero_cuenta: new FormControl('', [ Validators.pattern(/^[2][0-9]{10}$/)]), 
  // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
  // "/ /" indica el inicio y el final de la expresion regular
  // "{10}" indica le numero de digitos de lo que lo antecede
  numero_identidad: new FormControl('', [Validators.required,Validators.pattern(/^\d{4}\d{4}\d{5}$/)]),
   // "\d" es lo mismo "[0-9]"
  lugar_procedencia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{5,30}$/)]),
  direccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  carrera: new FormControl('', []),
  fecha_nacimiento: new FormControl('', Validators.required),
  sexo: new FormControl('', Validators.required),
  categoria: new FormControl('',[]),
  estado_civil: new FormControl('', Validators.required),
  seguro_medico: new FormControl('', Validators.required),
  numero_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
  emergencia_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)])

});

formulario_antecedentes_familiares = new FormGroup({
    
  diabetes : new FormControl('',[Validators.required]),
  parentesco_diabetes : new FormControl({value:'', disabled: true},[]),
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




// variable que hace cambien los acordiones
step;
//variable que esconde el acorden para mostrar la tabla de historias
mostrarHisorias: boolean = false;
citasPaciente: Cita[];

setStep(index: number) {
  this.step = index;
}

nextStep() {
  this.step++;
}

prevStep() {
  this.step--;
}

read1 = true;
input1 : string = '';
csi1() { this.read1 = false;}
cno1() {this.read1 = true;
      this.input1= null;}

read2 = true;
input2 : string = '';
csi2() { this.read2 = false;}
cno2() {this.read2 = true;this.input2= null;  }

read3 = true;
input3 : string = '';
csi3() { this.read3 = false;}
cno3() {this.read3 = true; this.input3= null; }

read4 = true;
input4 : string = '';
isDisabled4 = true;
csi4() { this.read4 = false;
this.isDisabled4 = false; }
cno4() {this.read4 = true; 
this.isDisabled4 = true; this.input4= null; }

read5 = true;
isDisabled5 = true;
input5 : string = '';
csi5() { this.read5 = false;
this.isDisabled5 = false; }
cno5() {this.read5 = true; 
this.isDisabled5 = true; this.input5= null; }

read6 = true;
input6 : string = '';
csi6() { this.read6 = false;}
cno6() {this.read6 = true;  this.input6= null;}


read7 = true;
isDisabled7 = true;
input7 : string = '';
csi7() { this.read7 = false;
this.isDisabled7 = false; }
cno7() {this.read7 = true;
this.isDisabled7 = true;this.input7= null; }

read8 = true;
isDisabled8 = true;
input8 : string = '';
csi8() { this.read8 = false;
this.isDisabled8 = false;  }
cno8() {this.read8 = true; 
this.isDisabled8 = true;this.input8= null; }

read9 = true;
input9 : string = '';
csi9() { this.read9 = false;}
cno9() {this.read9 = true;this.input9= null;  }

read10 = true;
input10 : string = '';
csi10() { this.read10 = false;}
cno10() {this.read10 = true; this.input10= null; }

read11 = true;
input11 : string = '';
csi11() { this.read11 = false;}
cno11() {this.read11 = true; this.input11= null; }

read12 = true;
input12 : string = '';
csi12() { this.read12 = false;}
cno12() {this.read12 = true; this.input12= null; }

read13 = true;
input13 : string = '';
csi13() { this.read13 = false;}
cno13() {this.read13 = true; this.input13= null; }

read14 = true;
input14 : string = '';
csi14() { this.read14 = false;}
cno14() {this.read14 = true; this.input14= null; }



read16 = true;
isDisabledB26 = true;
csi16() { this.read16 = false;
        this.isDisabledB26 = false;}
cno16() {this.read16 = true;  
this.isDisabledB26 = true;}

read17 = true;
input17 : string = '';
csi17() { this.read17 = false;}
cno17() {this.read17 = true; this.input17= null;  }

ya(){
alert('macizo');
}














isDisabledB1 = true;
triggerSomeEventSiB1() {      
  this.isDisabledB1 = false;
}
triggerSomeEventNoB1() {  
this.isDisabledB1 = true; 
}

isDisabledB2 = true;
triggerSomeEventSiB2() {      
   this.isDisabledB2 = false;
}
triggerSomeEventNoB2() {  
 this.isDisabledB2 = true; 
}
 isDisabledB3 = true;
triggerSomeEventSiB3() {      
  this.isDisabledB3 = false;
}
triggerSomeEventNoB3() {  
this.isDisabledB3 = true; 
}

isDisabledB4 = true;
triggerSomeEventSiB4() {      
  this.isDisabledB4 = false;
}
triggerSomeEventNoB4() {  
this.isDisabledB4 = true; 
}

isDisabledB5 = true;
triggerSomeEventSiB5() {      
  this.isDisabledB5 = false;
}
triggerSomeEventNoB5() {  
this.isDisabledB5 = true; 
}

isDisabledB6 = true;
triggerSomeEventSiB6() {      
  this.isDisabledB6 = false;
}
triggerSomeEventNoB6() {  
this.isDisabledB6 = true; 
}


isDisabledB77 = true;
triggerSomeEventSiB77() {      
  this.isDisabledB77 = false;
}
triggerSomeEventNoB77() {  
this.isDisabledB77 = true; 
}



isDisabledB8 = true;
triggerSomeEventSiB8() {      
  this.isDisabledB8 = false;
}
triggerSomeEventNoB8() {  
this.isDisabledB8 = true; 
}

isDisabledB9 = true;
triggerSomeEventSiB9() {      
  this.isDisabledB9 = false;
}
triggerSomeEventNoB9() {  
this.isDisabledB9 = true; 
}




read15 = true;
isDisabledB25 = true;
input15 : string = '';

csi15() { 
console.log(this.formulario_datos_generales.get('sexo').value);

if(this.formulario_datos_generales.get('sexo').value == "Hombre"){
  this.read15 = false;
        this.isDisabledB25 = false;
}else{
  this.read15 = false;
        this.isDisabledB25 = false;
  this.ocultar=false;
}


}
cno15() {  
 this.input15= null;
console.log(this.formulario_datos_generales.get('sexo').value);

if(this.formulario_datos_generales.get('sexo').value == "Hombre"){
  this.read15 = true;  
this.isDisabledB25 = true; 
}else{
  this.read15 = true;  
this.isDisabledB25 = true;
  this.ocultar=true;
}

}

isDisabledB11 = true;
inputB11 : string ;
triggerSomeEventSiB11() {    
this.isDisabledB11 = false;
}
triggerSomeEventNoB11() {  
this.inputB11  =null ;
this.isDisabledB11 = true; 
}

isDisabledB12 = true;
inputB12 : string ;
triggerSomeEventSiB12() {      
  this.isDisabledB12 = false;
}
triggerSomeEventNoB12() {             
this.inputB12  =null ;
this.isDisabledB12 = true; 
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


mostrarS(){
this.ocultar=false;
}
mostrarN(){
this.ocultar=true;
}

ocultar: boolean = true;


paciente: Paciente={
  id_paciente: null,
  numero_paciente: null,
  contrasenia: null,
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
  categoria: null,
  peso: null,
  presion: null,
  imc:null,
  temperatura:null,
  pulso:null,
  talla: null

 

}
paciente1: Paciente={
  id_paciente: null,
  numero_paciente: null,
  contrasenia: null,
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
  categoria: null,
 

}
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

//creo un arreglo de la interfaz en donde voy a mostrar los datos de la tabla
tablaAntecedentesFamiliares: Element[];
tablaAntecedentesPersonales: Element[];
tablaHabitosToxicologicos: Element[];

//creo un arreglo en el cual se añaden las columnas que se van a mostrar en la tabla
columnasTablaAntecedentesFamiliares: string[] = ['antecedente', 'valor', 'tipo', 'parentesco', 'observacion'];
columnasTablaAntecedentesPersonales: string[] = ['antecedente', 'valor', 'tipo', 'observacion'];
columnastablaHabitosToxicologicos: string[] = ['habito_toxicologico', 'valor', 'observacion'];







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

seguros_medicos: select[] = [
  {value: 'Privado', viewValue: 'Privado'},
  {value: 'IHSS', viewValue: 'IHSS'},
  {value: 'No', viewValue: 'No'}
];

estados_civiles: select[] = [
  {value: 'Soltero', viewValue: 'Soltero'},
  {value: 'Union Libre', viewValue: 'Union Libre'},
  {value: 'Divorciado', viewValue: 'Divorciado'},
  {value: 'Viudo', viewValue: 'Viudo'},
  {value: 'Casado', viewValue: 'Casado'},
 
];

parentescos: select[] = [
  {value: 'Padre' , viewValue: 'Padre'},
  {value: 'Madre' , viewValue: 'Madre'},
  {value: 'Abuelos' , viewValue: 'Abuelos'},
  {value: 'Tios' , viewValue: 'Tios'},

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

];

practicas_sexuales: select[] = [
  {value: 'Anal' , viewValue: 'Anal'},
  {value: 'Vaginal' , viewValue: 'Vaginal'},
  {value: 'Oral' , viewValue: 'Oral'},
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

metodos: select[] = [
  {value: 'DIU' , viewValue: 'DIU'},
  {value: 'Condón' , viewValue: 'Condón'},
  {value: 'Pastilla' , viewValue: 'Pastilla'},
  {value: 'Implante' , viewValue: 'Implante'},
  {value: 'Inyección trimestral' , viewValue: 'Inyección trimestral'},
  {value: 'Inyección trimestral' , viewValue: 'Inyección trimestral'},
  {value: 'Inyección mensual' , viewValue: 'Inyección mensual'},
  {value: 'Ritmo' , viewValue: 'Ritmo'},
  {value: 'Esterilización' , viewValue: 'Esterilización'},

];

resultados_embarazos: select[] = [
  {value: 'Sin complicaciones' , viewValue: 'Sin complicaciones'},
  {value: 'Con complicaciones' , viewValue: 'Con complicaciones'},
  
];


//id que se recupera del paciente mandado a traer
id: any;

// variable que identifica si el paciente tiene imagen de perfil
noImg: boolean = true;

// arreglos de cada tipo de interfaz en los que se guardan los datos que se mandan  
// a traer todos los datos respectivos desde la api
pacientes: Paciente[]; 
antecedentes_familiares: AntecedentesFamiliares[];
antecedentes_personales: AntecedentesPersonales[];
habitos_toxicologicos: HabitosToxicologicosPersonales[];
actividades_sexuales: ActividadSexual[];

//variable que identifica si un input es editable
readonly: boolean = true;

esAlumno: boolean = true;


dataSource: any;
  constructor(private formularioService: FormularioService, private router: Router, private mensaje: MatSnackBar, private activatedRoute: ActivatedRoute, activar: AppComponent, private subsiguiente: MatDialog,private inven: InventariosService) { 
    activar.mostrar();
    this.id = this.activatedRoute.snapshot.params['id'];
    
    if(this.id){
      this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente) =>{
        this.paciente = data;
        //this.paciente = this.pacientes.find((m)=>{return m.id_paciente == this.id});

        if(this.paciente.peso == null){
          console.log('faltan datos');
          this.sidenav.toggle();
        }

        //establesco el valor a los formcontrol para que se visualizen
        //en los respectivos inputs de los datos generales
        this.cargarInformacionDatosGenerales();


        //si el paciente no es alumno, cambiamos
        //el valor de la variable "esAlumno" a false
        //para mostrar diferente el contenido de los datos
        if(this.paciente.categoria != "E"){
          this.esAlumno = false;
        }
        console.log(this.esAlumno);

        console.log(this.paciente.contrasenia);
        this.formularioService.idActualizar=this.paciente.id_paciente;

        // valido si el paciente tiene imagen, la variable noImg por defecto esta en true
        //si el paciente tiene imagen entonces esta variable cambiara a false
        if(this.paciente.imagen != null){
          this.noImg = false;
        }
        
        
        console.log(this.paciente);
      
      },(error)=>{
        console.log(error);
      });


      // if(this.step === 2){
        this.formularioService.obtenerAntecedentesFamiliares().subscribe((data: AntecedentesFamiliares[])=>{
          this.antecedentes_familiares = data;
          this.antecedente_familiar = this.antecedentes_familiares.find((m)=>{return m.id_paciente == this.id});
          
  
          //cargo los datos de la tabla antecedentes familiares
          this.cargarTablaAntecedentesFamiliares();
          
  
          //establesco el valor a los formcontrol para que se visualizen
          //en los respectivos inputs de los antecedentes familiares
          this.cargarInformacionAntecedentesFamiliares();
  
          
          console.log(this.antecedente_familiar);
        }, (error)=>{
          console.log(error);
        });
  
      // }
      
      // if(this.step === 3){
        this.formularioService.obtenerAntecedentesPersonales().subscribe((data: AntecedentesPersonales[])=>{
          this.antecedentes_personales = data;
          this.antecedente_personal = this.antecedentes_personales.find((m)=>{return m.id_paciente == this.id});
  
          //cargo los datos de la tabla antecedentes personales
          this.cargarTablaAntecedentesPersonales();
          
  
          //establesco el valor a los formcontrol para que se visualizen
          //en los respectivos inputs de los antecedentes personales
          this.cargarInformacionAntecedentesPersonales();
  
          console.log(this.antecedente_personal);
        },(error)=>{
          console.log(error);
        });
      // }

      this.formularioService.obtenerHabitosToxicologicos().subscribe((data: HabitosToxicologicosPersonales[])=>{
        this.habitos_toxicologicos = data;
        this.habito_toxicologico_personal = this.habitos_toxicologicos.find((m)=>{return m.id_paciente == this.id});


        //cargo los datos de la tabla antecedentes personales
        this.cargarTablaHabitosToxicologicos();
        console.log(this.tablaHabitosToxicologicos);

        //establesco el valor a los formcontrol para que se visualizen
          //en los respectivos inputs de los habitos toxicologicos
          this.cargarInformacionHabitosToxicologicos();


      console.log(this.habito_toxicologico_personal);
          
      }, (error)=>{
        console.log(error);
      });


      this.formularioService.obtenerActividadesSexuales().subscribe((data : ActividadSexual[])=>{
        this.actividades_sexuales = data;
        this.actividad_sexual = this.actividades_sexuales.find((m)=>{return m.id_paciente == this.id});


        //establesco el valor a los formcontrol para que se visualizen
          //en los respectivos inputs de los habitos toxicologicos
          this.cargarInformacionActividadSexual();
      },(error)=>{

      });
  

    }
  }


  ngOnInit() {
  }

  

  cargarTablaAntecedentesFamiliares(){

    // establesco los valores a el arreglo de interfaces "tablaAntecedentesFamiliares"
    this.tablaAntecedentesFamiliares = 
    [
      {antecedente: 'Diabetes',
      valor: this.antecedente_familiar.diabetes,
      parentesco: this.antecedente_familiar.parentesco_diabetes
      },
    
      {
      antecedente: 'Tuberculosis Pulmonar',
      valor: this.antecedente_familiar.tb_pulmonar,
      parentesco: this.antecedente_familiar.parentesco_tb_pulmonar
      },
  
      {
      antecedente: 'Desnutrición',
      valor: this.antecedente_familiar.desnutricion,
      tipo: this.antecedente_familiar.tipo_desnutricion,
      parentesco: this.antecedente_familiar.parentesco_desnutricion
      },
  
      {
      antecedente: 'Enfermedades Mentales',
      valor: this.antecedente_familiar.enfermedades_mentales,
      tipo: this.antecedente_familiar.tipo_enfermedad_mental,
      parentesco: this.antecedente_familiar.parentesco_enfermedades_mentales
      },
  
      {
      antecedente: 'Convulsiones',
      valor: this.antecedente_familiar.convulsiones,
      parentesco: this.antecedente_familiar.parentesco_convulsiones
      }, 
  
      {
      antecedente: 'Alcoholismo o Sustancias Psicoactivas',
      valor: this.antecedente_familiar.alcoholismo_sustancias_psicoactivas,
      parentesco: this.antecedente_familiar.parentesco_alcoholismo_sustancias_psicoactivas
      }, 
  
      { 
      antecedente: 'Alergias',
      valor: this.antecedente_familiar.alergias,
      tipo: this.antecedente_familiar.tipo_alergia,
      parentesco: this.antecedente_familiar.parentesco_alergias
      }, 
  
      { 
      antecedente: 'Cáncer',
      valor: this.antecedente_familiar.cancer,
      tipo: this.antecedente_familiar.tipo_cancer,
      parentesco: this.antecedente_familiar.parentesco_cancer
      },

      {
      antecedente: 'Hipertensión arterial',
      valor: this.antecedente_familiar.hipertension_arterial,
      parentesco: this.antecedente_familiar.parentesco_hipertension_arterial
      },

  
    ];


    // verifico si otro tiene un valor para poder agregarlo a la tabla
    if(this.antecedente_familiar.otros != null){
      this.tablaAntecedentesFamiliares.push(
        {
          antecedente: this.antecedente_familiar.otros,
          valor: 'Si',
          parentesco: this.antecedente_familiar.parentesco_otros
      });
    }
  }

  cargarTablaAntecedentesPersonales(){

    // establesco los valores a el arreglo de interfaces "tablaAntecedentesPersonales"
    this.tablaAntecedentesPersonales = 
    [
      {antecedente: 'Diabetes',
      valor: this.antecedente_personal.diabetes,
      observacion: this.antecedente_personal.observacion_diabetes
      },
    
      {
      antecedente: 'Tuberculosis Pulmonar',
      valor: this.antecedente_personal.tb_pulmonar,
      observacion: this.antecedente_personal.observacion_tb_pulmonar
      },
  
      {
      antecedente: 'ITSs',
      valor: this.antecedente_personal.its,
      observacion: this.antecedente_personal.observacion_its
      },
      
      {
      antecedente: 'Desnutrición',
      valor: this.antecedente_personal.desnutricion,
      tipo: this.antecedente_personal.tipo_desnutricion,
      observacion: this.antecedente_personal.observacion_desnutricion
      },
  
      {
      antecedente: 'Enfermedades Mentales',
      valor: this.antecedente_personal.enfermedades_mentales,
      tipo: this.antecedente_personal.tipo_enfermedad_mental,
      observacion: this.antecedente_personal.observacion_enfermedades_mentales
      },
  
      {
      antecedente: 'Convulsiones',
      valor: this.antecedente_personal.convulsiones,
      observacion: this.antecedente_personal.observacion_convulsiones
      }, 
  
      { 
      antecedente: 'Alergias',
      valor: this.antecedente_personal.alergias,
      tipo:this.antecedente_personal.tipo_alergia,
      observacion: this.antecedente_personal.observacion_alergias
      }, 
  
      { 
      antecedente: 'Cáncer',
      valor:this.antecedente_personal.cancer,
      tipo: this.antecedente_personal.tipo_cancer,
      observacion: this.antecedente_personal.observacion_cancer
      },

      {
      antecedente: 'Hospitalarios y Quirurgicos',
      valor: this.antecedente_personal.hospitalarias_quirurgicas,
      },

      {
        antecedente: 'Traumáticos',
        valor: this.antecedente_personal.traumaticos,
        observacion: this.antecedente_personal.observacion_traumaticos

      }, 
  
  
    ];


    // verifico si otro tiene un valor para poder agregarlo a la tabla
    if(this.antecedente_personal.otros != null){
      this.tablaAntecedentesPersonales.push(
        {
          antecedente: this.antecedente_personal.otros,
          valor: "Si",
          observacion: this.antecedente_personal.observacion_otros
      });
    }

  }

  cargarTablaHabitosToxicologicos(){

    // establesco los valores a el arreglo de interfaces "tablaHabitosToxicologicos"
    this.tablaHabitosToxicologicos = 
    [
      {antecedente: 'Alcohol',
      valor: this.habito_toxicologico_personal.alcohol,
      observacion: this.habito_toxicologico_personal.observacion_alcohol
      },
    
      {
      antecedente: 'Tabaquismo',
      valor: this.habito_toxicologico_personal.tabaquismo,
      observacion: this.habito_toxicologico_personal.observacion_tabaquismo
      },
  
      {
      antecedente: 'Marihuana',
      valor: this.habito_toxicologico_personal.marihuana,
      observacion: this.habito_toxicologico_personal.observacion_marihuana
      },

      {
      antecedente: 'Cocaina',
      valor: this.habito_toxicologico_personal.cocaina,
      observacion: this.habito_toxicologico_personal.observacion_cocaina
      },
      

    ];

    // verifico si otro tiene un valor para poder agregarlo a la tabla
    if(this.habito_toxicologico_personal.otros != null){
      this.tablaHabitosToxicologicos.push(
        {
          antecedente: this.habito_toxicologico_personal.otros,
          valor: "Si",
          observacion: this.habito_toxicologico_personal.observacion_otros
      });
    }
  }



  cargarInformacionDatosGenerales(){

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
    this.estado_civil.setValue(this.paciente.estado_civil);
    this.seguro_medico.setValue(this.paciente.seguro_medico);
    this.numero_telefono.setValue(this.paciente.numero_telefono);
    this.emergencia_telefono.setValue(this.paciente.emergencia_telefono);
    this.categoria.setValue(this.paciente.categoria);
  }


  cargarInformacionAntecedentesFamiliares(){

    //establesco el valor a los formControl de formulario_antecedentes_familiares
    //para que aparescan cargados en los inputs 
    this.diabetes.setValue(this.antecedente_familiar.diabetes);
    this.parentesco_diabetes.setValue(this.antecedente_familiar.parentesco_diabetes); 
    this.tb_pulmonar.setValue(this.antecedente_familiar.tb_pulmonar);
    this.parentesco_tb_pulmonar.setValue(this.antecedente_familiar.parentesco_tb_pulmonar);
    this.desnutricion.setValue(this.antecedente_familiar.desnutricion); 
    this.parentesco_desnutricion.setValue(this.antecedente_familiar.parentesco_desnutricion);
    this.tipo_desnutricion.setValue(this.antecedente_familiar.tipo_desnutricion);
    this.enfermedades_mentales.setValue(this.antecedente_familiar.enfermedades_mentales);
    this.parentesco_enfermedades_mentales.setValue(this.antecedente_familiar.parentesco_enfermedades_mentales);
    this.tipo_enfermedad_mental.setValue(this.antecedente_familiar.tipo_enfermedad_mental);
    this.convulsiones.setValue(this.antecedente_familiar.convulsiones);
    this.parentesco_convulsiones.setValue(this.antecedente_familiar.parentesco_convulsiones);
    this.alcoholismo_sustancias_psicoactivas.setValue(this.antecedente_familiar.alcoholismo_sustancias_psicoactivas);
    this.parentesco_alcoholismo_sustancias_psicoactivas.setValue(this.antecedente_familiar.parentesco_alcoholismo_sustancias_psicoactivas);
    this.alergias.setValue(this.antecedente_familiar.alergias);
    this.parentesco_alergias.setValue(this.antecedente_familiar.parentesco_alergias);
    this.tipo_alergia.setValue(this.antecedente_familiar.tipo_alergia);
    this.cancer.setValue(this.antecedente_familiar.cancer);
    this.parentesco_cancer.setValue(this.antecedente_familiar.parentesco_cancer);
    this.tipo_cancer.setValue(this.antecedente_familiar.tipo_cancer);
    this.hipertension_arterial.setValue(this.antecedente_familiar.hipertension_arterial);
    this.parentesco_hipertension_arterial.setValue(this.antecedente_familiar.parentesco_hipertension_arterial);
    this.otros.setValue(this.antecedente_familiar.otros);
    this.parentesco_otros.setValue(this.antecedente_familiar.parentesco_otros);

    

  }

  cargarInformacionAntecedentesPersonales(){

    //establesco el valor a los formControl de formulario_antecedentes_personales
    //para que aparescan cargados en los inputs 
    this.diabetes_ap.setValue(this.antecedente_personal.diabetes);
    this.observacion_diabetes.setValue(this.antecedente_personal.observacion_diabetes); 
    this.tb_pulmonar_ap.setValue(this.antecedente_personal.tb_pulmonar);
    this.observacion_tb_pulmonar_ap.setValue(this.antecedente_personal.observacion_tb_pulmonar);
    this.its.setValue(this.antecedente_personal.its);
    this.observacion_its.setValue(this.antecedente_personal.observacion_its); 
    this.desnutricion_ap.setValue(this.antecedente_personal.desnutricion);
    this.observacion_desnutricion_ap.setValue(this.antecedente_personal.observacion_desnutricion);
    this.tipo_desnutricion_ap.setValue(this.antecedente_personal.tipo_desnutricion);
    this.enfermedades_mentales_ap.setValue(this.antecedente_personal.enfermedades_mentales);
    this.observacion_enfermedades_mentales_ap.setValue(this.antecedente_personal.observacion_enfermedades_mentales);
    this.tipo_enfermedad_mental_ap.setValue(this.antecedente_personal.tipo_enfermedad_mental);
    this.convulsiones_ap.setValue(this.antecedente_personal.convulsiones);
    this.observacion_convulsiones_ap.setValue(this.antecedente_personal.observacion_convulsiones);
    this.alergias_ap.setValue(this.antecedente_personal.alergias);
    this.observacion_alergias_ap.setValue(this.antecedente_personal.observacion_alergias);
    this.tipo_alergia_ap.setValue(this.antecedente_personal.tipo_alergia);
    this.cancer_ap.setValue(this.antecedente_personal.cancer);
    this.observacion_cancer_ap.setValue(this.antecedente_personal.observacion_cancer);
    this.tipo_cancer_ap.setValue(this.antecedente_personal.tipo_cancer);
    this.hospitalarias_quirurgicas.setValue(this.antecedente_personal.hospitalarias_quirurgicas);
    this.traumaticos.setValue(this.antecedente_personal.traumaticos);
    this.observacion_traumaticos.setValue(this.antecedente_personal.observacion_traumaticos);
    this.otros_ap.setValue(this.antecedente_personal.otros);
    this.observacion_otros_ap.setValue(this.antecedente_personal.observacion_otros);

  }


  cargarInformacionHabitosToxicologicos(){

    this.alcohol.setValue(this.habito_toxicologico_personal.alcohol);
    this.observacion_alcohol.setValue(this.habito_toxicologico_personal.observacion_alcohol);
    this.tabaquismo.setValue(this.habito_toxicologico_personal.tabaquismo);
    this.observacion_tabaquismo.setValue(this.habito_toxicologico_personal.observacion_tabaquismo);
    this.marihuana.setValue(this.habito_toxicologico_personal.marihuana);
    this.observacion_marihuana.setValue(this.habito_toxicologico_personal.observacion_marihuana);
    this.cocaina.setValue(this.habito_toxicologico_personal.cocaina);
    this.observacion_cocaina.setValue(this.habito_toxicologico_personal.observacion_cocaina);
    this.otros_ht.setValue(this.habito_toxicologico_personal.otros);
    this.observacion_otros_ht.setValue(this.habito_toxicologico_personal.observacion_otros);

  }

  cargarInformacionActividadSexual(){

    this.actividad_sexuall.setValue(this.actividad_sexual.actividad_sexual);
    this.edad_inicio_sexual.setValue(this.actividad_sexual.edad_inicio_sexual);
    this.numero_parejas_sexuales.setValue(this.actividad_sexual.numero_parejas_sexuales);
    this.practicas_sexuales_riesgo.setValue(this.actividad_sexual.practicas_sexuales_riesgo);
  }

  anadirCita(){
    const Citasubsiguiente = this.subsiguiente.open(HistoriaSubsiguiente, {disableClose:true, width:"70%"});
    this.inven.idCita=this.id;
  }

   //obtener los campos del formGroup: formulario_datos_generales
   get nombre_completo(){return this.formulario_datos_generales.get('nombre_completo')};
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
  get observacion_diabetes(){return this.formulario_antecedentes_personales.get('observacion_diabetes')};
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



  // obtener los campos del formGroup formulario_datos_faltantes
  get peso(){return this.formulario_datos_faltantes.get('peso')};
  get talla(){return this.formulario_datos_faltantes.get('talla')};
  get imc(){return this.formulario_datos_faltantes.get('imc')};
  get temperatura(){return this.formulario_datos_faltantes.get('temperatura')};
  get presion(){return this.formulario_datos_faltantes.get('presion')};
  get pulso(){return this.formulario_datos_faltantes.get('pulso')};

  mostrarHistoriasSub(){
    this.mostrarHisorias=true;

    this.inven.obtenerCita(this.id).subscribe((data: Cita[])=>{
      this.citasPaciente = data;
      console.log(this.citasPaciente);
      this.dataSource1= this.citasPaciente;
    }, (error)=>{
      
      console.log(error);
    });
  }
  cerrarHistorias(){
    this.mostrarHisorias=false;
  }


  guardarDatos(){

     if(this.formulario_datos_faltantes.valid){
      this.paciente.imc = this.formulario_datos_faltantes.get('imc').value;
      this.paciente.peso = this.formulario_datos_faltantes.get('peso').value;
      this.paciente.presion = this.formulario_datos_faltantes.get('presion').value;
      this.paciente.talla = this.formulario_datos_faltantes.get('talla').value;
      this.paciente.temperatura = this.formulario_datos_faltantes.get('temperatura').value;
      this.paciente.pulso = this.formulario_datos_faltantes.get('pulso').value;
      
      

       this.formularioService.actualizarPaciente(this.paciente).subscribe((data)=>{
         this.mensaje.open('Datos guardados', '', {duration:2000});
         this.sidenav.toggle();

       }, (error)=>{
         console.log(error);
         this.mensaje.open('there was an error!', '', {duration:2000});
    });


     }
  }

  // get segundo_apellido(){return this.formulario_datos_generales.get('segundo_apellido')};
  // get primer_nombre(){return this.formulario_datos_generales.get('primer_nombre')};
  // get segundo_nombre(){return this.formulario_datos_generales.get('segundo_nombre')};
  // get numero_cuenta(){return this.formulario_datos_generales.get('numero_cuenta')};
  // get numero_identidad(){return this.formulario_datos_generales.get('numero_identidad')};
  // get lugar_procedencia(){return this.formulario_datos_generales.get('lugar_procedencia')};
  // get direccion(){return this.formulario_datos_generales.get('direccion')};
  // get carrera(){return this.formulario_datos_generales.get('carrera')};
  // get fecha_nacimiento(){return this.formulario_datos_generales.get('fecha_nacimiento')};
  // get sexo(){return this.formulario_datos_generales.get('sexo')};
  // get estado_civil(){return this.formulario_datos_generales.get('estado_civil')};
  // get seguro_medico(){return this.formulario_datos_generales.get('seguro_medico')};
  // get numero_telefono(){return this.formulario_datos_generales.get('numero_telefono')};
  // get emergencia_telefono(){return this.formulario_datos_generales.get('emergencia_telefono')};
  // get categoria(){return this.formulario_datos_generales.get('categoria')};

}

@Component({
  selector: 'historiaSubsiguiente',
  templateUrl: 'HistoriaSubsiguiente.html',
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})



export class HistoriaSubsiguiente{

  constructor(private form: InventariosService, private dialogRef:MatDialogRef<HistoriaSubsiguiente>){//para cerrar el dialogo desde la misma interfaz
    
  }

  
  citaGuardar: Cita={
    id_paciente: null,
    peso:null,
    imc:null,
    presion:null,
    pulso:null,
     talla:null,
     temperatura:null,
    impresion:null,
     indicaciones:null,
     observaciones:null,
     remitido:null,
     siguiente_cita:null
  }

  formulario_cita = new FormGroup({
    
      
    peso: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]),
    // segundo_apellido: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    // primer_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    // segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    talla: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]), 
    // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
    // "/ /" indica el inicio y el final de la expresion regular
    // "{10}" indica le numero de digitos de lo que lo antecede
    IMC: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]),
     // "\d" es lo mismo "[0-9]"
    temperatura: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]),
    observaciones_examen: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(5)]),
    impresion_diagnostica: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(5)]),
    indicaciones: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(5)]),
    presion: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]),
    fecha_nacimiento: new FormControl('', Validators.required),
    pulso: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]),
    remitir: new FormControl('', Validators.required),
    cita: new FormControl('', Validators.required),
    remitira: new FormControl('', Validators.required)
    
});
  matcher = new MyErrorStateMatcher();

  

  // parentescos: Parentescos[] = [
  //   {value: 1 , viewValue: 'Psicologia'},
  //   {value: 2 , viewValue: 'Nutricion'},
  //   {value: 3 , viewValue: 'Odontologia'},
  //   {value: 4 , viewValue: 'Terapia Funcional'},
  //   {value: 5 , viewValue: 'CATFA'},
  //   {value: 6 , viewValue: 'Trabajo Social'}
  // ];

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

  

  guardarCita(){
   if(this.formulario_cita.valid){
      this.citaGuardar.id_paciente = this.form.idCita;
      this.citaGuardar.peso= this.peso.value;
      this.citaGuardar.imc=this.presion.value;
      this.citaGuardar.presion=this.presion.value;
      this.citaGuardar.pulso=this.pulso.value;
      this.citaGuardar.talla= this.talla.value;
      this.citaGuardar.temperatura=this.temperatura.value;
      this.citaGuardar.impresion=this.impresion_diagnostica.value;
      this.citaGuardar.indicaciones=this.indicaciones.value;
      this.citaGuardar.observaciones=this.observaciones_examen.value;
      this.citaGuardar.remitido=this.remitira.value;
      this.citaGuardar.siguiente_cita= this.fecha_nacimiento.value;
      
      this.form.guardarCita(this.citaGuardar).subscribe( (data) =>{
        console.log(data);
        this.dialogRef.close();
      }, (error) => {
        console.log(error);
        alert('ocurrion un error');
      });
    }
  }


  get peso(){return this.formulario_cita.get('peso')};
  get talla(){return this.formulario_cita.get('talla')};
  get IMC(){return this.formulario_cita.get('IMC')};
  get temperatura(){return this.formulario_cita.get('temperatura')};
  get remitir(){return this.formulario_cita.get('remitir')};
  get remitira(){return this.formulario_cita.get('remitira')};
  get pulso(){return this.formulario_cita.get('pulso')};
  get observaciones_examen(){return this.formulario_cita.get('observaciones_examen')};
  get impresion_diagnostica(){return this.formulario_cita.get('impresion_diagnostica')};
  get fecha_nacimiento(){return this.formulario_cita.get('fecha_nacimiento')};
  get indicaciones(){return this.formulario_cita.get('indicaciones')};
  get presion(){return this.formulario_cita.get('presion')};
  get cita(){return this.formulario_cita.get('cita')};
}

