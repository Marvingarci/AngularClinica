import { Component, OnInit, ViewChild, SimpleChange, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from "../services/formulario.service";
import { Paciente } from "../interfaces/paciente";
import { MatMonthView } from '@angular/material/datepicker';
import { AppComponent } from '../app.component';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { select, Parentescos, MyErrorStateMatcher } from '../formulario/formulario.component';
import { AntecedentesFamiliares } from '../interfaces/antecedentes-familiares';
import { MatTableDataSource, MatSidenav, MatDialog, MatSnackBar, MatDialogRef, MatSnackBarConfig, SimpleSnackBar } from '@angular/material';
import { AntecedentesPersonales } from '../interfaces/antecedentes-personales';
import { ThrowStmt, analyzeAndValidateNgModules } from '@angular/compiler';
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
import {animate, state, style, transition, trigger} from '@angular/animations';



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

export interface EstadosCiviles{
  value: number;
  viewValue: string;
}

export interface SegurosMedicos{
  value: number;
  viewValue: string;
}

export interface PracticasSexuales {
  value: number;
  viewValue: string;
}

export interface MetodoPlanificacion{
  value: number;
  viewValue: string;
}

export interface Element{
  antecedente: string;
  valor: string;
  tipo?: string;
  parentesco?: string;
  observacion?: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

export interface familiar{
  id_paciente?: number;
  id_antecedente?: string;
  id_parentesco?: string;
}

export interface cita1{
  id_paciente?: string,
  peso?: string,
  talla?: string,
  imc?: string,
  temperatura?: string,
  presion?:string,
  pulso?: string,
  siguiente_cita?: string,
  observaciones?: string,
  impresion?:string,
  indicaciones?:string,
  remitido?:any,
  fechayHora?:any
}



@Component({
  selector: 'app-ver-paciente',
  inputs:['cambios'],
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VerPacienteComponent implements OnInit {
  static mostrarHistoriasSub() {
    throw new Error("Method not implemented.");
  }
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  dataSource1:any;
  columnsToDisplay = ['fechayHora', 'observaciones', 'impresion', 'indicaciones'];
  expandedElement: Cita | null;

  events: string[] = [];
  opened: boolean;
  paciente1: Paciente;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  titulo= 'Ingreso de datos restantes';  

  // getTotalCost() {
  //   return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  // }

  

  
//   formulario_datos_faltantes = new FormGroup({  
//     peso : new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{1,3}$/)]),
//     talla: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]), 
//     // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
//     // "/ /" indica el inicio y el final de la expresion regular
//     // "{10}" indica le numero de digitos de lo que lo antecede
//     imc: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]{1,3}$/)]),
//      // "\d" es lo mismo "[0-9]"
//     temperatura: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]),
//     presion: new FormControl('', [Validators.required]),
//     pulso: new FormControl('', [Validators.required]),
    
// });
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
    emergencia_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
    emergencia_persona: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{3,30}$/)]),

    //datos restantes
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
    prosene: new FormControl('', []),    
  });

  formulario_antecedentes_familiares = new FormGroup({      
    diabetes : new FormControl('',[Validators.required]),
    parentesco_diabetes : new FormControl('',[]),
    tb_pulmonar : new FormControl('',[Validators.required]),
    parentesco_tb_pulmonar : new FormControl('',[]),
    desnutricion : new FormControl('',[Validators.required]),
    parentesco_desnutricion : new FormControl('',[]),
    tipo_desnutricion: new FormControl('',[]),
    enfermedades_mentales : new FormControl('',[Validators.required]),
    parentesco_enfermedades_mentales : new FormControl('',[]),
    tipo_enfermedad_mental: new FormControl('',[]),
    convulsiones : new FormControl('',[Validators.required]),
    parentesco_convulsiones : new FormControl('',[]),
    alcoholismo_sustancias_psicoactivas : new FormControl('',[Validators.required]),
    parentesco_alcoholismo_sustancias_psicoactivas: new FormControl('',[]),    
    alergias : new FormControl('',[Validators.required]),
    parentesco_alergias: new FormControl('',[]),
    tipo_alergia: new FormControl('',[]),
    cancer : new FormControl('',[Validators.required]),
    parentesco_cancer: new FormControl('',[]),
    tipo_cancer: new FormControl('',[]),
    hipertension_arterial: new FormControl('',[Validators.required]),
    parentesco_hipertension_arterial: new FormControl('',[]),
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
    // hay que validar que si actividad sexual es true que sean requeridos estos 3 campos
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
    partos: new FormControl('',[Validators.max(10),Validators.min(0)]),
    abortos: new FormControl('',[Validators.max(10),Validators.min(0)]),
    cesarias: new FormControl('',[Validators.max(10),Validators.min(0)]),
    hijos_vivos: new FormControl('',[Validators.max(10),Validators.min(0)]),
    hijos_muertos: new FormControl('',[Validators.max(10),Validators.min(0)]),
    fecha_termino_ult_embarazo : new FormControl(''),
    descripcion_termino_ult_embarazo : new FormControl(''),
    observaciones : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]),  
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

des = true;
ingreso : string ;
des1 = true;
ingreso1: string ;
des2 = true;
ingreso2: string ;
des3 = true;
ingreso3: string ;

///// Creacion de variables
mostrarHisorias: boolean = false;
citasPaciente: Cita[];
    
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

  ante_familiar: any;
  ante_familiar_filtrado:familiar[] ;

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
  tablaAntecedentesFamiliares: any;
  tablaAntecedentesPersonales: any;
  tablaHabitosToxicologicos: any;

  //creo un arreglo en el cual se añaden las columnas que se van a mostrar en la tabla
  columnasTablaAntecedentesFamiliares: string[] = ['antecedente', 'valor', 'parentesco'];
  columnasTablaAntecedentesPersonales: string[] = ['antecedente', 'valor', 'observacion'];
  columnastablaHabitosToxicologicos: string[] = ['habito_toxicologico', 'observacion'];

  //date picker
  minDate = new Date(1950, 0, 1);
  maxDate = new Date();

  //select
  categorias: Categorias[] = [
    {value: 1, viewValue: 'Empleado'},
    {value: 2, viewValue: 'Visitante'},
    {value: 3, viewValue: 'Prosene'}
  ];

  

  //sexos: Sexos[] = [
    //{value: 1, viewValue: 'Hombre'},
    //{value: 2, viewValue: 'Mujer'},
    //{value: 3, viewValue: 'Otro'}
  //];

  /*seguros_medicos: SegurosMedicos[] = [
    {value: 1, viewValue: 'Privado'},
    {value: 2, viewValue: 'IHSS'},
    {value: 3, viewValue: 'No'}
  ];*/

  seguros_medicos: SegurosMedicos[]=[];

  sexos: Sexos[] = [
    {value: 'Hombre', viewValue: 'Hombre'},
    {value: 'Mujer', viewValue: 'Mujer'},
  
  ];

  estados_civiles: EstadosCiviles[] = [];

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

  practicas_sexuales: PracticasSexuales[] = [];

  periocidades: select[] = [
    {value: 'Regular' , viewValue: 'Regular'},
    {value: 'Irregular' , viewValue: 'Irregular'},
  ];
  
  caracteristicas: select[] = [
    {value: 'Abundante' , viewValue: 'Abundante'},
    {value: 'Normal' , viewValue: 'Normal'},
    {value: 'Escasa' , viewValue: 'Escasa'},
  ];

  metodos: MetodoPlanificacion[] = [];

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
  antecedentes_ginecologicos: AntecedentesGinecologicos[];
  antecedentes_obstetricos: AntecedentesObstetricos[];
  planificaciones_familiares: PlanificacionesFamiliares[];

  //variable que identifica si un input es editable
  readonlyDatosGenerales: boolean = true;
  disabledDatosGenerales: boolean = true;
  readonlyAntecedentesFamiliares: boolean = true;
  readonlyAntecedentesPersonales: boolean = true;
  readonlyHabitosToxicologicos: boolean = true;
  readonlyActividadSexual: boolean = true;
  readonlyAntecedentesObstetricos: boolean = true;
  readonlyAntecedentesGinecologicos: boolean = true;
  readonlyPlanificacionFamiliar: boolean = true;

  //variable que identifica si un paciente es un alumno
  esAlumno: boolean = true;

  //variable que identifica si un paciente tiene estos campos
  mostrarAntecedenteGinecologico: boolean = false;
  mostrarAntecedenteObstetrico: boolean = false;
  mostrarPlanificacionFamiliar: boolean = false;  


constructor(private formularioService: FormularioService, private mensaje: MatSnackBar,  private activatedRoute: ActivatedRoute, 
  activar: AppComponent, private subsiguiente: MatDialog,private inven: InventariosService, ) { 
    activar.mostrar();
    this.id = this.activatedRoute.snapshot.params['id'];
    
   if(this.id){
      this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente) =>{
        this.paciente = data;
        //establesco el valor a los formcontrol para que se visualizen
        //en los respectivos inputs de los datos generales
        if(this.paciente.peso == null){
          this.paciente.temperatura="0";
          this.paciente.pulso="0";
          this.paciente.presion="0";
          this.paciente.imc="0";
          this.paciente.talla="0";
          this.paciente.peso="0";
          this.paciente.prosene="";

        }
        this.cargarInformacionDatosGenerales();
        //si el paciente no es alumno, cambiamos
        //el valor de la variable "esAlumno" a false
        //para mostrar diferente el contenido de los datos
        if(this.paciente.categoria != "Empleado"){
          this.esAlumno = false;
        }
        console.log('esAlumno: '+this.esAlumno);
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

      


      this.formularioService.obtenerAntecedenteFamiliar(this.id).subscribe((data: AntecedentesFamiliares)=>{
        this.ante_familiar = data;

        
       
       for (let index = 0; index < this.ante_familiar.length; index++) {
         switch (this.ante_familiar[index].antecedente) {
           case "Convulsiones":
             
             break;
         
           default:
             break;
         }
         
       }

        //cargo los datos de la tabla antecedentes familiares
        this.cargarTablaAntecedentesFamiliares();  
        //establesco el valor a los formcontrol para que se visualizen
        //en los respectivos inputs de los antecedentes familiares
        this.cargarInformacionAntecedentesFamiliares();        
        console.log(this.ante_familiar);
      }, (error)=>{
        console.log(error);
      });
  

      this.formularioService.obtenerAntecedentePersonal(this.id).subscribe((data: AntecedentesPersonales)=>{
      this.antecedente_personal = data;
      //cargo los datos de la tabla antecedentes personales
      this.cargarTablaAntecedentesPersonales();
      //establesco el valor a los formcontrol para que se visualizen
      //en los respectivos inputs de los antecedentes personales
      this.cargarInformacionAntecedentesPersonales();
      console.log(this.antecedente_personal);
    },(error)=>{
      console.log(error);
    });
     

    this.formularioService.obtenerHabitoToxicologico(this.id).subscribe((data: HabitosToxicologicosPersonales)=>{
      this.habito_toxicologico_personal = data;
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


      this.formularioService.obtenerActividadSexual(this.id).subscribe((data : ActividadSexual)=>{
      this.actividad_sexual = data;
      //establesco el valor a los formcontrol para que se visualizen
      //en los respectivos inputs de la actividad sexual
      this.cargarInformacionActividadSexual();
      },(error)=>{
      console.log(error);
      });


      this.formularioService.obtenerAntecedenteGinecologico(this.id).subscribe((data : AntecedentesGinecologicos)=>{
      this.antecedente_ginecologico = data;
      //verifico si el paciente tiene antecedentes ginecologicos para mostrarlos
      if(this.antecedente_ginecologico != null){
      this.mostrarAntecedenteGinecologico = true;
      //establesco el valor a los formcontrol para que se visualizen
      //en los respectivos inputs de los antecedentes ginecologicos
      this.cargarInformacionAntecedentesGinecologicos();
      console.log(this.antecedente_ginecologico);
      }
      console.log('mostrarAncedententeGinecologico: '+this.mostrarAntecedenteGinecologico);
      }, (error)=>{
      console.log(error);
      });



      this.formularioService.obtenerAntecedenteObstetrico(this.id).subscribe((data: AntecedentesObstetricos)=>{
        this.antecedente_obstetrico = data;
      //verifico si el paciente tiene antecedentes obstetricos para mostrarlos
        if(this.antecedente_obstetrico!= null){
          this.mostrarAntecedenteObstetrico = true;
        //establesco el valor a los formcontrol para que se visualizen
        //en los respectivos inputs de los antecedentes obstetricos
        this.cargarInformacionAntecedentesObstetricos();
          console.log(this.antecedente_obstetrico);
        }
        console.log('mostrarAntecedenteObstetrico: '+this.mostrarAntecedenteObstetrico);
      },(error)=>{
        console.log(error);        
      });


      this.formularioService.obtenerPlanificacionFamiliar(this.id).subscribe((data: PlanificacionesFamiliares)=>{
        this.planificacion_familiar = data;
        if(this.planificacion_familiar!= null){
          this.mostrarPlanificacionFamiliar = true;
          //establesco el valor a los formcontrol para que se visualizen
          //en los respectivos inputs de la planificacion familiar
          this.cargarInformacionPlanificacionfamiliar();
          console.log(this.planificacion_familiar);
        }
        console.log('mostrarPlanificacionFamiliar: '+this.mostrarPlanificacionFamiliar);
      },(error)=>{
        console.log(error);
      });

   }
 }//fin del constructor

 obtenerDatosFormulario(){

  this.formularioService.obtenerEstadosCiviles().subscribe((data: any[])=>{

    data.forEach(element => {
      this.estados_civiles.push({value:element.id_estado_civil, viewValue:element.estado_civil});  
    });
  
  });

  this.formularioService.obtenerSegurosMedicos().subscribe((data: any[])=>{

    data.forEach(element => {
      this.seguros_medicos.push({value:element.id_seguro_medico, viewValue:element.seguro_medico});  
    });
  
  });

  this.formularioService.obtenerPracticasSexuales().subscribe((data: any[])=>{

    data.forEach(element => {
      this.practicas_sexuales.push({value:element.id_practica_sexual, viewValue:element.practicas_sexuales_riesgo});  
    });
  
  });

  this.formularioService.obtenerMetodosPlanificaciones().subscribe((data: any[])=>{

    data.forEach(element => {
      this.metodos.push({value:element.id_metodo_planificacion, viewValue:element.metodo_planificacion});  
    });
  
  });

  }

 
 @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;


 perron(){
   console.log('dio perron');
 }

  
 actualizarDatosGenerales()
 {

  this.readonlyDatosGenerales = !this.readonlyDatosGenerales;
  this.disabledDatosGenerales = !this.disabledDatosGenerales;

  switch(this.paciente.estado_civil){
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

 switch(this.paciente.seguro_medico){
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

  console.log(this.paciente.sexo);

  


    if(this.readonlyDatosGenerales === true){    
      if(this.formulario_datos_generales.valid){

        // guardar datos del formulario en paciente y enviarlo a la api
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
        this.paciente.numero_telefono = this.numero_telefono.value;
        this.paciente.emergencia_persona = this.emergencia_persona.value;
        this.paciente.emergencia_telefono = this.emergencia_telefono.value;
        this.paciente.categoria = this.categoria.value;
        this.paciente.imc = this.imc.value;
        this.paciente.peso = this.peso.value;
        this.paciente.presion = this.presion.value;
        this.paciente.talla = this.talla.value;
        this.paciente.temperatura = this.temperatura.value;
        this.paciente.pulso = this.pulso.value;
        this.paciente.prosene = this.prosene.value;

      
        this.formularioService.actualizarPaciente(this.paciente).subscribe((data)=>{

          this.formularioService.obtenerPaciente(this.id).subscribe((data: Paciente)=>{
            this.paciente = data;
  
            this.cargarInformacionDatosGenerales();
          });

          // alert('se actualizaron perron los datos generales');
          this.showError('Datos generales actualizado correctamente');
          

        }, (error)=>{
          console.log(error);
          this.showError('Error al actualizar los datos generales'); 
        });

        
      } 
    }     
  }



  actualizarAntecedentesFamiliares(){
    if(this.readonlyAntecedentesFamiliares === true){
      if(this.formulario_antecedentes_familiares.valid){
        // guardar datos del formulario en antecedente_familiar y enviarlo a la api
        this.antecedente_familiar.diabetes = this.diabetes.value;
        this.antecedente_familiar.parentesco_diabetes = this.parentesco_diabetes.value;
        this.antecedente_familiar.tb_pulmonar = this.tb_pulmonar.value;
        this.antecedente_familiar.parentesco_tb_pulmonar = this.parentesco_tb_pulmonar.value;
        this.antecedente_familiar.desnutricion = this.desnutricion.value;
        this.antecedente_familiar.parentesco_desnutricion = this.parentesco_desnutricion.value;
        this.antecedente_familiar.tipo_desnutricion = this.tipo_desnutricion.value;
        this.antecedente_familiar.enfermedades_mentales = this.enfermedades_mentales.value;
        this.antecedente_familiar.parentesco_enfermedades_mentales = this.parentesco_enfermedades_mentales.value;
        this.antecedente_familiar.tipo_enfermedad_mental = this.tipo_enfermedad_mental.value;
        this.antecedente_familiar.convulsiones = this.convulsiones.value;
        this.antecedente_familiar.parentesco_convulsiones = this.parentesco_convulsiones.value;
        this.antecedente_familiar.alcoholismo_sustancias_psicoactivas = this.alcoholismo_sustancias_psicoactivas.value;
        this.antecedente_familiar.parentesco_alcoholismo_sustancias_psicoactivas = this.parentesco_alcoholismo_sustancias_psicoactivas.value;
        this.antecedente_familiar.alergias = this.alergias.value;
        this.antecedente_familiar.parentesco_alergias = this.parentesco_alergias.value;
        this.antecedente_familiar.tipo_alergia = this.tipo_alergia.value;
        this.antecedente_familiar.cancer = this.cancer.value;
        this.antecedente_familiar.parentesco_cancer = this.parentesco_cancer.value;
        this.antecedente_familiar.tipo_cancer = this.tipo_cancer.value;
        this.antecedente_familiar.hipertension_arterial = this.hipertension_arterial.value;
        this.antecedente_familiar.parentesco_hipertension_arterial = this.parentesco_hipertension_arterial.value;
        this.antecedente_familiar.otros = this.otros.value;
        this.antecedente_familiar.parentesco_otros = this.parentesco_otros.value;            

        this.formularioService.actualizarAntecedenteFamiliar(this.antecedente_familiar).subscribe( (data) =>{
          this.cargarTablaAntecedentesFamiliares();
          //alert('se actualizaron perron los ')
          this.showError('Antecedentes familiares actualizado correctamente');
        }, (error) => {
          console.log(error);
          //alert('se chorriaron los antecedentes familiares')
          this.showError('Error al actualizar los antecedentes familiares');
        });
      }
    }
  }



  actualizarAntecedentesPersonales(){
    if(this.readonlyAntecedentesPersonales == true){
      if(this.formulario_antecedentes_personales.valid){
        // guardar datos del formulario en antecedente_personal y enviarlo a la api
        this.antecedente_personal.diabetes = this.diabetes_ap.value;
        this.antecedente_personal.observacion_diabetes = this.observacion_diabetes.value;
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

        this.formularioService.actualizarAntecedentePersonal(this.antecedente_personal).subscribe((data)=>{
          this.cargarTablaAntecedentesPersonales();
          //alert('se actualizaron perron los antecedentes personales');
          this.showError('Antecedentes personales actualizado correctamente');    
        },(error)=>{
          console.log(error)
          //alert('se chorriaron los antecedentes personales');
          this.showError('Error al actualizar los antecedentes personales');    
        });
      }      
    }    
  }



  actualizarHabitosToxicologicos(){
    if(this.readonlyHabitosToxicologicos == true){
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
        this.formularioService.actualizarHabitoToxicologico(this.habito_toxicologico_personal).subscribe((data)=>{          
          this.cargarTablaHabitosToxicologicos();
          //alert('se actualizaron perron los habitos toxicologicos');
          this.showError('Habitos toxicologicos actualizado correctamente');
        }, (error)=>{
          console.log(error);
          this.showError('Error al actualizar los habitos toxicologicos');
        });
      }
    }
  }



  actualizarActividadSexual(){
    if(this.readonlyActividadSexual == true){
      if(this.formulario_actividad_sexual.valid){
         // guardar datos del formulario en actividad_sexual y enviarlo a la api
         this.actividad_sexual.actividad_sexual = this.actividad_sexuall.value;
         this.actividad_sexual.edad_inicio_sexual = this.edad_inicio_sexual.value;
         this.actividad_sexual.numero_parejas_sexuales = this.numero_parejas_sexuales.value;
         this.actividad_sexual.practicas_sexuales_riesgo = this.practicas_sexuales_riesgo.value;

         this.formularioService.actualizarActividadSexual(this.actividad_sexual).subscribe((data)=>{
          this.cargarInformacionActividadSexual();
          //alert('se actualizaron perron la actividad sexual');
          this.showError('Actividad sexual actualizado correctamente');           
         },(error)=>{
           console.log(error);
           this.showError('Error al actualizar los Actividad sexual');
         });
      }
    }
  }



  actualizarAntecedentesGinecologicos(){
    if(this.readonlyAntecedentesGinecologicos == true){
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

        this.formularioService.actualizarAntecedenteGinecologico(this.antecedente_ginecologico).subscribe((data)=>{
          this.cargarInformacionAntecedentesGinecologicos();
          //alert('se actualizaron perron los antecedentes ginecologicos');
          this.showError('Antecedentes ginecologicos actualizado correctamente');
        }, (error)=> {
          console.log(error);
          this.showError('Error al actualizar los antecedentes ginecologicos');
        });
      }
    }
  }



  actualizarAntecedentesObstetricos(){
    if(this.readonlyAntecedentesObstetricos == true){
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

        this.formularioService.actualizarAntecedenteObstetrico(this.antecedente_obstetrico).subscribe((data)=>{
          this.cargarInformacionAntecedentesObstetricos();
          //alert('se actualizaron perron los antecedentes obstetricos');
          this.showError('Antecedentes obstetricos actualizado correctamente');
        }, (error)=>{
          console.log(error);
          this.showError('Error al actualizar los antecedentes obstetricos');
        });
      }
    }
  }



  actualizarPlanificacionFamiliar(){
    if(this.readonlyPlanificacionFamiliar){
      if(this.formulario_planificacion_familiar.valid){
        // guardar datos del formulario en planificacion_familiar y enviarlo a la api
        this.planificacion_familiar.planificacion_familiar = this.planificacion_familiarr.value;
        this.planificacion_familiar.metodo_planificacion = this.metodo_planificacion.value;
        this.planificacion_familiar.observacion_planificacion = this.observacion_planificacion.value;

        this.formularioService.actualizarPlanificacionFamiliar(this.planificacion_familiar).subscribe((data)=>{
            this.cargarInformacionPlanificacionfamiliar();            
            //alert('se actualizaron perron la Planificacion Familiar');
            this.showError('Planificacion Familiar actualizado correctamente');
          }, (error)=>{
            console.log(error);
            this.showError('Error al actualizar los Planificacion Familiar');
          });
      }
    }
  }



  ngOnInit() {
    this.obtenerDatosFormulario();
  }

  
  
  @Input() cambios: string = this.otros.value;
  ngOnChanges(changes: SimpleChanges) {
    console.log('se ejecuto el onChanges')
    // if (changes['cambios']) {
    //   console.log(this.cambios);
    // }   
  }

 
/////////////////////////////////////////////////////////////////////////////////////////////////////
  cargarTablaAntecedentesFamiliares(){
    // establesco los valores a el arreglo de interfaces "tablaAntecedentesFamiliares"
    
    this.tablaAntecedentesFamiliares = new MatTableDataSource(this.ante_familiar);
    // verifico si otro tiene un valor para poder agregarlo a la tabla
    
  }

  cargarTablaAntecedentesPersonales(){
    // establesco los valores a el arreglo de interfaces "tablaAntecedentesPersonales"
    this.formularioService.obtenerAntecedentePersonal(this.id).subscribe((data)=>{
      this.tablaAntecedentesPersonales = data;            
    }, (error)=>{
      console.log(error);
    });
    // [
    //   {antecedente: 'Diabetes',
    //   valor: this.antecedente_personal.diabetes,
    //   observacion: this.antecedente_personal.observacion_diabetes
    //   },
    
    //   {
    //   antecedente: 'Tuberculosis Pulmonar',
    //   valor: this.antecedente_personal.tb_pulmonar,
    //   observacion: this.antecedente_personal.observacion_tb_pulmonar
    //   },
  
    //   {
    //   antecedente: 'ITSs',
    //   valor: this.antecedente_personal.its,
    //   observacion: this.antecedente_personal.observacion_its
    //   },
      
    //   {
    //   antecedente: 'Desnutrición',
    //   valor: this.antecedente_personal.desnutricion,
    //   tipo: this.antecedente_personal.tipo_desnutricion,
    //   observacion: this.antecedente_personal.observacion_desnutricion
    //   },
  
    //   {
    //   antecedente: 'Enfermedades Mentales',
    //   valor: this.antecedente_personal.enfermedades_mentales,
    //   tipo: this.antecedente_personal.tipo_enfermedad_mental,
    //   observacion: this.antecedente_personal.observacion_enfermedades_mentales
    //   },
  
    //   {
    //   antecedente: 'Convulsiones',
    //   valor: this.antecedente_personal.convulsiones,
    //   observacion: this.antecedente_personal.observacion_convulsiones
    //   }, 
  
    //   { 
    //   antecedente: 'Alergias',
    //   valor: this.antecedente_personal.alergias,
    //   tipo:this.antecedente_personal.tipo_alergia,
    //   observacion: this.antecedente_personal.observacion_alergias
    //   }, 
  
    //   { 
    //   antecedente: 'Cáncer',
    //   valor:this.antecedente_personal.cancer,
    //   tipo: this.antecedente_personal.tipo_cancer,
    //   observacion: this.antecedente_personal.observacion_cancer
    //   },

    //   {
    //   antecedente: 'Hospitalarios y Quirurgicos',
    //   valor: this.antecedente_personal.hospitalarias_quirurgicas,
    //   },

    //   {
    //     antecedente: 'Traumáticos',
    //     valor: this.antecedente_personal.traumaticos,
    //     observacion: this.antecedente_personal.observacion_traumaticos
    //   },   
    // ];
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
    this.formularioService.obtenerHabitoToxicologico(this.id).subscribe((data)=>{
      this.tablaHabitosToxicologicos = data;            
    }, (error)=>{
      console.log(error);
    });
     
    // [
    //   {antecedente: 'Alcohol',
    //   valor: this.habito_toxicologico_personal.alcohol,
    //   observacion: this.habito_toxicologico_personal.observacion_alcohol
    //   },
    
    //   {
    //   antecedente: 'Tabaquismo',
    //   valor: this.habito_toxicologico_personal.tabaquismo,
    //   observacion: this.habito_toxicologico_personal.observacion_tabaquismo
    //   },
  
    //   {
    //   antecedente: 'Marihuana',
    //   valor: this.habito_toxicologico_personal.marihuana,
    //   observacion: this.habito_toxicologico_personal.observacion_marihuana
    //   },

    //   {
    //   antecedente: 'Cocaina',
    //   valor: this.habito_toxicologico_personal.cocaina,
    //   observacion: this.habito_toxicologico_personal.observacion_cocaina
    //   },
    // ];
    // verifico si otro tiene un valor para poder agregarlo a la tabla
    if(this.habito_toxicologico_personal.otros){
      this.tablaHabitosToxicologicos.push(
        {
          antecedente: this.habito_toxicologico_personal.otros.trim(),
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

   /* switch(this.paciente.sexo){
      case "Hombre":
        this.sexo.setValue(1);
          break;
     default:
        this.sexo.setValue(2);
          break;
      }*/ 
   
    this.sexo.setValue(this.paciente.sexo);
    this.lugar_procedencia.setValue(this.paciente.lugar_procedencia);
    this.direccion.setValue(this.paciente.direccion);
    this.fecha_nacimiento.setValue(this.paciente.fecha_nacimiento);
/*
    switch(this.paciente.estado_civil){
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
    }*/


    this.estado_civil.setValue(this.paciente.estado_civil);

    //switch(this.paciente.seguro_medico){
      //case 1:
        //this.paciente.seguro_medico = "Privado";
         // break;
     // case 2:
       // this.paciente.seguro_medico = "IHSS";
        //  break;
     // default:
       // this.paciente.seguro_medico = "No";
         // break;
   // }

   /*switch(this.paciente.seguro_medico){
    case "Privado":
      this.seguro_medico.setValue(1);
        break;
    case "IHSS":
      this.seguro_medico.setValue(2);
          break;
    
    default:
      this.seguro_medico.setValue(3);
        break;
    

  } */

    this.seguro_medico.setValue(this.paciente.seguro_medico);
    this.numero_telefono.setValue(this.paciente.numero_telefono);
    this.emergencia_persona.setValue(this.paciente.emergencia_persona);
    this.emergencia_telefono.setValue(this.paciente.emergencia_telefono);
    this.categoria.setValue(this.paciente.categoria);
    this.temperatura.setValue(this.paciente.temperatura);
    this.pulso.setValue(this.paciente.pulso);
    this.presion.setValue(this.paciente.presion);
    this.imc.setValue(this.paciente.imc);
    this.talla.setValue(this.paciente.talla);
    this.peso.setValue(this.paciente.peso);
    this.prosene.setValue(this.paciente.prosene);
    
    
  }


  cargarInformacionAntecedentesFamiliares(){
    //establesco el valor a los formControl de formulario_antecedentes_familiares
    //para que aparescan cargados en los inputs 
    this.diabetes.setValue(this.antecedente_familiar.diabetes);
    this.parentesco_diabetes.setValue(this.antecedente_familiar.parentesco_diabetes); 

    if(this.diabetes.value == "No"){
      this.parentesco_diabetes.disable({onlySelf: true})
    }

    this.tb_pulmonar.setValue(this.antecedente_familiar.tb_pulmonar);
    this.parentesco_tb_pulmonar.setValue(this.antecedente_familiar.parentesco_tb_pulmonar);

    if(this.tb_pulmonar.value == "No"){
      this.parentesco_tb_pulmonar.disable({onlySelf: true})
    }

    this.desnutricion.setValue(this.antecedente_familiar.desnutricion); 
    this.parentesco_desnutricion.setValue(this.antecedente_familiar.parentesco_desnutricion);
    this.tipo_desnutricion.setValue(this.antecedente_familiar.tipo_desnutricion);

    if(this.desnutricion.value == "No"){
      this.parentesco_desnutricion.disable({onlySelf: true});
      this.tipo_desnutricion.disable({onlySelf: true})
    }

    this.enfermedades_mentales.setValue(this.antecedente_familiar.enfermedades_mentales);
    this.parentesco_enfermedades_mentales.setValue(this.antecedente_familiar.parentesco_enfermedades_mentales);
    this.tipo_enfermedad_mental.setValue(this.antecedente_familiar.tipo_enfermedad_mental);
   
    if(this.enfermedades_mentales.value == "No"){
      this.parentesco_enfermedades_mentales.disable({onlySelf: true});
      this.tipo_enfermedad_mental.disable({onlySelf: true})
    }

    this.convulsiones.setValue(this.antecedente_familiar.convulsiones);
    this.parentesco_convulsiones.setValue(this.antecedente_familiar.parentesco_convulsiones);

    if(this.convulsiones.value == "No"){
      this.parentesco_convulsiones.disable({onlySelf: true});
    }

    this.alcoholismo_sustancias_psicoactivas.setValue(this.antecedente_familiar.alcoholismo_sustancias_psicoactivas);
    this.parentesco_alcoholismo_sustancias_psicoactivas.setValue(this.antecedente_familiar.parentesco_alcoholismo_sustancias_psicoactivas);
    
    if(this.alcoholismo_sustancias_psicoactivas.value == "No"){
      this.parentesco_alcoholismo_sustancias_psicoactivas.disable({onlySelf: true});
    }
    
    this.alergias.setValue(this.antecedente_familiar.alergias);
    this.parentesco_alergias.setValue(this.antecedente_familiar.parentesco_alergias);
    this.tipo_alergia.setValue(this.antecedente_familiar.tipo_alergia);

    if(this.alergias.value == "No"){
      this.parentesco_alergias.disable({onlySelf: true});
      this.tipo_alergia.disable({onlySelf: true});
    }

    this.cancer.setValue(this.antecedente_familiar.cancer);
    this.parentesco_cancer.setValue(this.antecedente_familiar.parentesco_cancer);
    this.tipo_cancer.setValue(this.antecedente_familiar.tipo_cancer);

    if(this.cancer.value == "No"){
      this.parentesco_cancer.disable({onlySelf: true});
      this.tipo_cancer.disable({onlySelf: true});
    }

    this.hipertension_arterial.setValue(this.antecedente_familiar.hipertension_arterial);
    this.parentesco_hipertension_arterial.setValue(this.antecedente_familiar.parentesco_hipertension_arterial);

    if(this.hipertension_arterial.value == "No"){
      this.parentesco_hipertension_arterial.disable({onlySelf: true});
    }

    this.otros.setValue(this.antecedente_familiar.otros);
    this.parentesco_otros.setValue(this.antecedente_familiar.parentesco_otros);
    this.parentesco_otros.disable({onlySelf:true});
  }



  cargarInformacionAntecedentesPersonales(){
    //establesco el valor a los formControl de formulario_antecedentes_personales
    //para que aparescan cargados en los inputs 
    this.diabetes_ap.setValue(this.antecedente_personal.diabetes);
    this.observacion_diabetes.setValue(this.antecedente_personal.observacion_diabetes); 

    if(this.diabetes_ap.value == "No"){
      this.observacion_diabetes.disable({onlySelf: true});
    }

    this.tb_pulmonar_ap.setValue(this.antecedente_personal.tb_pulmonar);
    this.observacion_tb_pulmonar_ap.setValue(this.antecedente_personal.observacion_tb_pulmonar);

    if(this.tb_pulmonar_ap.value == "No"){
      this.observacion_tb_pulmonar_ap.disable({onlySelf: true});
    }

    this.its.setValue(this.antecedente_personal.its);
    this.observacion_its.setValue(this.antecedente_personal.observacion_its); 

    if(this.its.value == "No"){
      this.observacion_its.disable({onlySelf: true});
    }

    this.desnutricion_ap.setValue(this.antecedente_personal.desnutricion);
    this.observacion_desnutricion_ap.setValue(this.antecedente_personal.observacion_desnutricion);
    this.tipo_desnutricion_ap.setValue(this.antecedente_personal.tipo_desnutricion);

    if(this.desnutricion_ap.value == "No"){
      this.observacion_desnutricion_ap.disable({onlySelf: true});
      this.tipo_desnutricion_ap.disable({onlySelf: true});
    }

    this.enfermedades_mentales_ap.setValue(this.antecedente_personal.enfermedades_mentales);
    this.observacion_enfermedades_mentales_ap.setValue(this.antecedente_personal.observacion_enfermedades_mentales);
    this.tipo_enfermedad_mental_ap.setValue(this.antecedente_personal.tipo_enfermedad_mental);

    if(this.enfermedades_mentales_ap.value == "No"){
      this.observacion_enfermedades_mentales_ap.disable({onlySelf: true});
      this.tipo_enfermedad_mental_ap.disable({onlySelf: true});
    }

    this.convulsiones_ap.setValue(this.antecedente_personal.convulsiones);
    this.observacion_convulsiones_ap.setValue(this.antecedente_personal.observacion_convulsiones);

    if(this.convulsiones_ap.value == "No"){
      this.observacion_convulsiones_ap.disable({onlySelf: true});
    }

    this.alergias_ap.setValue(this.antecedente_personal.alergias);
    this.observacion_alergias_ap.setValue(this.antecedente_personal.observacion_alergias);
    this.tipo_alergia_ap.setValue(this.antecedente_personal.tipo_alergia);

    if(this.alergias_ap.value == "No"){
      this.observacion_alergias_ap.disable({onlySelf: true});
      this.tipo_alergia_ap.disable({onlySelf: true});
    }

    this.cancer_ap.setValue(this.antecedente_personal.cancer);
    this.observacion_cancer_ap.setValue(this.antecedente_personal.observacion_cancer);
    this.tipo_cancer_ap.setValue(this.antecedente_personal.tipo_cancer);

    if(this.cancer_ap.value == "No"){
      this.observacion_cancer_ap.disable({onlySelf: true});
      this.tipo_cancer_ap.disable({onlySelf: true});
    }

    this.hospitalarias_quirurgicas.setValue(this.antecedente_personal.hospitalarias_quirurgicas);
    this.fecha_antecedente_hospitalario.setValue(this.antecedente_personal.fecha_antecedente_hospitalario);
    this.tratamiento.setValue(this.antecedente_personal.tratamiento);
    this.diagnostico.setValue(this.antecedente_personal.diagnostico);
    this.tiempo_hospitalizacion.setValue(this.antecedente_personal.tiempo_hospitalizacion);

    if(this.hospitalarias_quirurgicas.value == "No"){
      this.fecha_antecedente_hospitalario.disable({onlySelf: true});
      this.tratamiento.disable({onlySelf: true});
      this.diagnostico.disable({onlySelf: true});
      this.tiempo_hospitalizacion.disable({onlySelf: true});
    }

    this.traumaticos.setValue(this.antecedente_personal.traumaticos);
    this.observacion_traumaticos.setValue(this.antecedente_personal.observacion_traumaticos);

    if(this.traumaticos.value == "No"){
      this.observacion_traumaticos.disable({onlySelf: true});        
    }

    this.otros_ap.setValue(this.antecedente_personal.otros);
    this.observacion_otros_ap.setValue(this.antecedente_personal.observacion_otros);
  }



  cargarInformacionHabitosToxicologicos(){

    this.alcohol.setValue(this.habito_toxicologico_personal.alcohol);
    this.observacion_alcohol.setValue(this.habito_toxicologico_personal.observacion_alcohol);
    
    if(this.alcohol.value == "No"){
      this.observacion_alcohol.disable({onlySelf: true});        
    }

    this.tabaquismo.setValue(this.habito_toxicologico_personal.tabaquismo);
    this.observacion_tabaquismo.setValue(this.habito_toxicologico_personal.observacion_tabaquismo);

    if(this.tabaquismo.value == "No"){
      this.observacion_tabaquismo.disable({onlySelf: true});       
    }
    this.marihuana.setValue(this.habito_toxicologico_personal.marihuana);
    this.observacion_marihuana.setValue(this.habito_toxicologico_personal.observacion_marihuana);

    if(this.marihuana.value == "No"){
      this.observacion_marihuana.disable({onlySelf: true});       
    }

    this.cocaina.setValue(this.habito_toxicologico_personal.cocaina);
    this.observacion_cocaina.setValue(this.habito_toxicologico_personal.observacion_cocaina);

    if(this.cocaina.value == "No"){
      this.observacion_cocaina.disable({onlySelf: true});       
    }

    this.otros_ht.setValue(this.habito_toxicologico_personal.otros);
    this.observacion_otros_ht.setValue(this.habito_toxicologico_personal.observacion_otros);
  }

  cambiarInformacionActividadSexual(){
    if(this.readonlyActividadSexual){
      switch(this.practicas_sexuales_riesgo.value){
        case 1:
            this.practicas_sexuales_riesgo.setValue("Anal");
            break;
        case 2:
            this.practicas_sexuales_riesgo.setValue("Vaginal");
              break;
        default:
            this.practicas_sexuales_riesgo.setValue("Oral");
            break;
        
  
      }
    }else{
      switch(this.practicas_sexuales_riesgo.value){
        case "Anal":
            this.practicas_sexuales_riesgo.setValue(1);
            break;
        case "Vaginal":
            this.practicas_sexuales_riesgo.setValue(2);
              break;
        default:
            this.practicas_sexuales_riesgo.setValue(3);
            break;
        
  
      }
    }
  }



  cargarInformacionActividadSexual(){

    this.actividad_sexuall.setValue(this.actividad_sexual.actividad_sexual);
    this.edad_inicio_sexual.setValue(this.actividad_sexual.edad_inicio_sexual);
    this.numero_parejas_sexuales.setValue(this.actividad_sexual.numero_parejas_sexuales);

    switch(this.actividad_sexual.practicas_sexuales_riesgo){
      case 1:
        this.actividad_sexual.practicas_sexuales_riesgo = "Anal";
          break;
      case 2:
        this.actividad_sexual.practicas_sexuales_riesgo = "Vaginal";
            break;

      default:
        this.actividad_sexual.practicas_sexuales_riesgo = "Oral";
          break;
    }      

    this.practicas_sexuales_riesgo.setValue(this.actividad_sexual.practicas_sexuales_riesgo);

    if(this.actividad_sexuall.value == "No"){
      this.edad_inicio_sexual.disable({onlySelf:true});
      this.numero_parejas_sexuales.disable({onlySelf:true});
      this.practicas_sexuales_riesgo.disable({onlySelf:true});
    }else{
      this.edad_inicio_sexual.setValidators([Validators.required]);
      this.numero_parejas_sexuales.setValidators([Validators.required]);
      this.practicas_sexuales_riesgo.setValidators([Validators.required]);
    }
  }



  cargarInformacionAntecedentesGinecologicos(){

    this.edad_inicio_menstruacion.setValue(this.antecedente_ginecologico.edad_inicio_menstruacion);
    this.fum.setValue(this.antecedente_ginecologico.fum);
    this.citologia.setValue(this.antecedente_ginecologico.citologia);
    this.fecha_citologia.setValue(this.antecedente_ginecologico.fecha_citologia);
    this.resultado_citologia.setValue(this.antecedente_ginecologico.resultado_citologia);

    if(this.citologia.value == "No"){
      this.fecha_citologia.disable({onlySelf: true});
      this.resultado_citologia.disable({onlySelf: true});
    }

    this.duracion_ciclo_menstrual.setValue(this.antecedente_ginecologico.duracion_ciclo_menstrual);
    this.periocidad_ciclo_menstrual.setValue(this.antecedente_ginecologico.periocidad_ciclo_menstrual);
    this.caracteristicas_ciclo_menstrual.setValue(this.antecedente_ginecologico.caracteristicas_ciclo_menstrual);
  }



  cargarInformacionAntecedentesObstetricos(){
    
    this.partos.setValue(this.antecedente_obstetrico.partos);
    this.abortos.setValue(this.antecedente_obstetrico.abortos);
    this.cesarias.setValue(this.antecedente_obstetrico.cesarias);
    this.hijos_vivos.setValue(this.antecedente_obstetrico.hijos_vivos);
    this.hijos_muertos.setValue(this.antecedente_obstetrico.hijos_muertos);
    this.fecha_termino_ult_embarazo.setValue(this.antecedente_obstetrico.fecha_termino_ult_embarazo);
    this.descripcion_termino_ult_embarazo.setValue(this.antecedente_obstetrico.descripcion_termino_ult_embarazo);
    this.observaciones.setValue(this.antecedente_obstetrico.observaciones);        
  }


  cambiarInformacionPlanificacionFamiliar(){
    if(this.readonlyPlanificacionFamiliar){
      switch(this.metodo_planificacion.value){
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
        default:
            this.metodo_planificacion.setValue("Esterilización");
            break;
        
  
      }
    }else{
      switch(this.metodo_planificacion.value){
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
        default:
            this.metodo_planificacion.setValue(9);
            break;
        
  
      }
    }
  }


  cargarInformacionPlanificacionfamiliar(){
 
    
    this.planificacion_familiarr.setValue(this.planificacion_familiar.planificacion_familiar);

    
    switch(this.planificacion_familiar.metodo_planificacion){
      case 1:
          this.planificacion_familiar.metodo_planificacion = "DIU";
          break;
      case 2:
            this.planificacion_familiar.metodo_planificacion = "Condón";
            break;
      case 3:
          this.planificacion_familiar.metodo_planificacion = "Pastilla";
          break;
      case 4:
          this.planificacion_familiar.metodo_planificacion = "Implante";
          break;
      case 5:
          this.planificacion_familiar.metodo_planificacion = "Inyección trimestral";
          break;
      case 6:
          this.planificacion_familiar.metodo_planificacion = "Inyección trimestral";
          break;
      case 7:
          this.planificacion_familiar.metodo_planificacion = "Inyección mensual";
          break;
      case 8:
          this.planificacion_familiar.metodo_planificacion = "Ritmo";
          break;
      default:
          this.planificacion_familiar.metodo_planificacion = "Esterilización";
          break;
      

    }
  

    this.metodo_planificacion.setValue(this.planificacion_familiar.metodo_planificacion);
    this.observacion_planificacion.setValue(this.planificacion_familiar.observacion_planificacion);

    if(this.planificacion_familiarr.value == "No"){
      this.metodo_planificacion.disable({onlySelf: true});
      this.observacion_planificacion.disable({onlySelf: true});
    }
  }

  anadirCita(){
    const Citasubsiguiente = this.subsiguiente.open(HistoriaSubsiguiente1, {disableClose:true, width:"70%"});
    this.inven.idCita=this.id;
  }
  public mostrarHistoriasSub(){
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

   showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }


  guardarDatos(){

    //  if(this.formulario_datos_faltantes.valid){
    //   this.paciente.imc = this.formulario_datos_faltantes.get('imc').value;
    //   this.paciente.peso = this.formulario_datos_faltantes.get('peso').value;
    //   this.paciente.presion = this.formulario_datos_faltantes.get('presion').value;
    //   this.paciente.talla = this.formulario_datos_faltantes.get('talla').value;
    //   this.paciente.temperatura = this.formulario_datos_faltantes.get('temperatura').value;
    //   this.paciente.pulso = this.formulario_datos_faltantes.get('pulso').value;
      
      

    //    this.formularioService.actualizarPaciente(this.paciente).subscribe((data)=>{
    //      this.mensaje.open('Datos guardados', '', {duration:2000});
    //      this.sidenav.toggle();

    //    }, (error)=>{
    //      console.log(error);
    //      this.mensaje.open('there was an error!', '', {duration:2000});
    // });


    //  }
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
  get peso(){return this.formulario_datos_generales.get('peso')};
  get talla(){return this.formulario_datos_generales.get('talla')};
  get imc(){return this.formulario_datos_generales.get('imc')};
  get temperatura(){return this.formulario_datos_generales.get('temperatura')};
  get presion(){return this.formulario_datos_generales.get('presion')};
  get pulso(){return this.formulario_datos_generales.get('pulso')};
  get prosene(){return this.formulario_datos_generales.get('prosene')};
}


export interface Inventario{
  id_inventario?: number,
  unidades?: number,
  medicamento?: string,
}
export interface selecto{
  value: number,
  viewValue: string
}

@Component({
  selector: 'historiaSubsiguiente1',
  templateUrl: 'HistoriaSubsiguiente1.html',  
  styleUrls: ['HistoriaSubsiguiente1.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})



export class HistoriaSubsiguiente1{
  seleccionado: boolean;
  seleccion = 0;
  maximoMedicamento : number = 2;
  minDate = new Date();
  


  constructor(private form: InventariosService, private dialogRef:MatDialogRef<HistoriaSubsiguiente1>, private mensaje: MatSnackBar){//para cerrar el dialogo desde la misma interfaz
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
  medicamento: any={
    id: null,
    cantidad: null
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

  obtenerMedicamentos(){

    this.form.obtenerMedicamento().subscribe((data: Inventario[])=>{
      this.datos = data;
      this.inventario = data;
      this.nombres.push({value:0,viewValue:'Ninguno'});
      this.datos.forEach(element => {
        this.nombres.push({value:element.id_inventario, viewValue:element.medicamento});  
      });
      console.log(this.nombres);
      console.log(this.inventario);
      console.log(this.unidad.value);
      
    
    });

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
    indicaciones: new FormControl('', [ Validators.maxLength(50),Validators.minLength(5)]),
    presion: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]),
    fecha_nacimiento: new FormControl('', Validators.required),
    pulso: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+/),Validators.maxLength(3)]),
    remitir: new FormControl(''),
    cita: new FormControl('', Validators.required),
    remitira: new FormControl(''),
    nombre: new FormControl(''),
    unidad: new FormControl('',[ Validators.pattern(/^[0-9]+/),Validators.maxLength(3)])
    
});
  matcher = new MyErrorStateMatcher();

  datos: any;
  demas: boolean = true;
  inventario: Inventario[];
  texto: string = "Unidades";

  parentescos: Parentescos[] = [
    {value: 1 , viewValue: 'Psicologia'},
    {value: 2 , viewValue: 'Nutricion'},
    {value: 3 , viewValue: 'Odontologia'},
    {value: 4 , viewValue: 'Terapia Funcional'},
    {value: 5 , viewValue: 'CATFA'},
    {value: 6 , viewValue: 'Trabajo Social'}
  ];
  nombres: selecto[]=[];

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

  medicamentoUnidad(numero: number){
    if(numero==0){
      this.borrarInputs([<FormControl>this.unidad]);
      this.seleccionado=false;
    }
     this.maximoMedicamento = this.inventario[numero-1].unidades;
     this.unidad.setValidators(Validators.max(this.maximoMedicamento));
     if (this.maximoMedicamento==0) {
      this.texto = "No hay producto en existencia";
      this.borrarInputs([<FormControl>this.unidad]);
      this.seleccionado=false;
     }else{
      this.texto = "El valor en existencia es: "+this.maximoMedicamento;
      this.seleccionado=true;
      this.habilitarInputs([<FormControl>this.unidad]);
     }
     
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

      

      if(this.citaGuardar.remitido == null || this.citaGuardar.remitido == ""){
        this.citaGuardar.remitido = 7;
      }
      console.log(this.citaGuardar);
      this.form.guardarCita(this.citaGuardar).subscribe( (data) =>{
        console.log(data);
        this.dialogRef.close();
        this.showError('Cita guardada con exito');
      }, (error) => {
        console.log(error);
        //alert('ocurrion un error');
        this.showError('ocurrion un error');
      });


      if(this.seleccionado==true){
        this.medicamento.id = this.nombre.value;
        this.medicamento.cantidad = this.unidad.value;
        console.log(this.medicamento);
        this.form.EgresoMedicamentos(this.medicamento).subscribe( (data) =>{
        console.log(data);
        this.showError('medicamento guardado con exito');
      }, (error) => {
        console.log(error);
        //alert('ocurrion un error en medicamento');
        this.showError('ocurrion un error en medicamento');
        
      });

      }
      
    }else{
      this.showError('LLenar todos los campos');
      
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
  get nombre(){return this.formulario_cita.get('nombre')};
  get unidad(){return this.formulario_cita.get('unidad')};
  get cita(){return this.formulario_cita.get('cita')};
  
}
