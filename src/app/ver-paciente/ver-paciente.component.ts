import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from "../services/formulario.service";
import { Paciente } from "../interfaces/paciente";
import { MatMonthView } from '@angular/material/datepicker';
import { AppComponent } from '../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { select } from '../formulario/formulario.component';
import { AntecedentesFamiliares } from '../interfaces/antecedentes-familiares';
import { MatTableDataSource } from '@angular/material';



export interface Select {
  value: string;
  viewValue: string;
}


export interface Element{
  antecedente: string;
  valor: string;
  observacion?: string;
}


@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css']
})



export class VerPacienteComponent implements OnInit {

  

  // getTotalCost() {
  //   return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  // }

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
    observacion_diabetes : new FormControl({value:'', disabled: true},[]),
    tb_pulmonar : new FormControl('',[Validators.required]),
    observacion_tb_pulmonar : new FormControl({value:'', disabled: true},[]),
    desnutricion : new FormControl('',[Validators.required]),
    observacion_desnutricion : new FormControl({value:'', disabled: true},[]),
    tipo_desnutricion: new FormControl({value:'', disabled: true},[]),
    enfermedades_mentales : new FormControl('',[Validators.required]),
    observacion_enfermedades_mentales : new FormControl({value:'', disabled: true},[]),
    tipo_enfermedad_mental: new FormControl({value:'', disabled: true},[]),
    convulsiones : new FormControl('',[Validators.required]),
    observacion_convulsiones : new FormControl({value:'', disabled: true},[]),
    alcoholismo_sustancias_psicoactivas : new FormControl('',[Validators.required]),
    observacion_alcoholismo_sustancias_psicoactivas: new FormControl({value:'', disabled: true},[]),    
    alergias : new FormControl('',[Validators.required]),
    observacion_alergias: new FormControl({value:'', disabled: true},[]),
    tipo_alergia: new FormControl({value:'', disabled: true},[]),
    cancer : new FormControl('',[Validators.required]),
    observacion_cancer: new FormControl({value:'', disabled: true},[]),
    tipo_cancer: new FormControl({value:'', disabled: true},[]),
    hipertension_arterial: new FormControl('',[Validators.required]),
    observacion_hipertension_arterial: new FormControl({value:'', disabled: true},[]),
    otros : new FormControl('', [ Validators.maxLength(60),Validators.minLength(6)]), 
    observacion_otros : new FormControl('',[]),
      
  });



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
    emergencia_telefono: null,
    categoria: null,
   

  }

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
    convulsiones : null,
    observacion_convulsiones : null,
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

  //creo un arreglo de la interfaz en donde voy a mostrar los datos de la tabla
  tablaAntecedentesFamiliares: Element[] ;





  categorias: select[] = [
    {value: 'T', viewValue: 'Empleado'},
    {value: 'V', viewValue: 'Visitante'},
    {value: 'P', viewValue: 'Prosene'}
  ];

  sexos: Select[] = [
    {value: 'hombre', viewValue: 'Hombre'},
    {value: 'mujer', viewValue: 'Mujer'},
    {value: 'otro', viewValue: 'Otro'}
  ];

  seguros_medicos: Select[] = [
    {value: 'Privado', viewValue: 'Privado'},
    {value: 'IHSS', viewValue: 'IHSS'},
    {value: 'No', viewValue: 'No'}
  ];

  estados_civiles: Select[] = [
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

  // arreglo de tipo Paciente en el que se mandan a traer todos los pacientes de la base de datos
  pacientes: Paciente[];
  antecedentes_familiares: AntecedentesFamiliares[];

  //variable que identifica si un input es editable
  readonly: boolean = true;

  esAlumno: boolean = true;


  dataSource: any;
  


  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute, activar: AppComponent ) { 
    activar.mostrar();
    this.id = this.activatedRoute.snapshot.params['id'];
    
    if(this.id){
      this.formularioService.obtenerPacientes().subscribe((data: Paciente[]) =>{
        this.pacientes = data;
        this.paciente = this.pacientes.find((m)=>{return m.id_paciente == this.id});

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


      this.formularioService.obtenerAntecedentesFamiliares().subscribe((data: AntecedentesFamiliares[])=>{
        this.antecedentes_familiares = data;
        this.antecedente_familiar = this.antecedentes_familiares.find((m)=>{return m.id_paciente == this.id});
        
        this.tablaAntecedentesFamiliares = 
        [
          {antecedente: 'Diabetes',
          valor: this.antecedente_familiar.diabetes,
          observacion: this.antecedente_familiar.observacion_diabetes
          },
        
          {
          antecedente: 'Tuberculosis Pulmonar',
          valor: this.antecedente_familiar.tb_pulmonar,
          observacion: this.antecedente_familiar.observacion_tb_pulmonar
          },
      
          {
          antecedente: 'Desnutrición',
          valor: this.antecedente_familiar.desnutricion,
          observacion: this.antecedente_familiar.observacion_desnutricion
          },
      
          {
          antecedente: 'Enfermedades Mentales',
          valor: this.antecedente_familiar.enfermedades_mentales,
          observacion: this.antecedente_familiar.observacion_enfermedades_mentales
          },
      
          {
          antecedente: 'Convulsiones',
          valor: this.antecedente_familiar.convulsiones,
          observacion: this.antecedente_familiar.observacion_convulsiones
          }, 
      
          {
          antecedente: 'Alcoholismo o Sustancias Psicoactivas',
          valor: this.antecedente_familiar.alcoholismo_sustancias_psicoactivas,
          observacion: this.antecedente_familiar.observacion_alcoholismo_sustancias_psicoactivas
          }, 
      
          { 
          antecedente: 'Alergias',
          valor: this.antecedente_familiar.alergias,
          observacion: this.antecedente_familiar.observacion_alergias
          }, 
      
          { 
          antecedente: 'Cáncer',
          valor: this.antecedente_familiar.cancer,
          observacion: this.antecedente_familiar.observacion_cancer
          }, 
      
        ];

        //establesco el valor a los formcontrol para que se visualizen
        //en los respectivos inputs de los antecedentes familiares
        this.cargarInformacionAntecedentesFamiliares();

        
        console.log(this.antecedente_familiar);
      }, (error)=>{
        console.log(error);
      });
    }

    
  }

  // getAntecedenteFamiliar(){
  //   this.formularioService.obtenerAntecedentesFamiliares().subscribe((data: AntecedentesFamiliares[])=>{
  //     this.antecedentes_familiares = data;

  //   });
  // }

  
  displayedColumns: string[] = ['antecedente', 'valor', 'observacion'];
  
  

  // displayedColumns: string[] = ['antecedente', '', 'tb_pulmonar', 'desnutricion', 'enfermedades_mentales'];
 

  ngOnInit() {
    
  }

  cargarInformacionDatosGenerales(){
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

    this.diabetes.setValue(this.antecedente_familiar.diabetes);
    this.observacion_diabetes.setValue(this.antecedente_familiar.observacion_diabetes); 
    this.tb_pulmonar.setValue(this.antecedente_familiar.tb_pulmonar);
    this.observacion_tb_pulmonar.setValue(this.antecedente_familiar.observacion_tb_pulmonar);
    this.desnutricion.setValue(this.antecedente_familiar.desnutricion);
    this.observacion_desnutricion.setValue(this.antecedente_familiar.observacion_desnutricion);
    this.tipo_desnutricion.setValue(this.antecedente_familiar.tipo_desnutricion);
    this.enfermedades_mentales.setValue(this.antecedente_familiar.enfermedades_mentales);
    this.observacion_enfermedades_mentales.setValue(this.antecedente_familiar.observacion_enfermedades_mentales);
    this.tipo_enfermedad_mental.setValue(this.antecedente_familiar.tipo_enfermedad_mental);
    this.convulsiones.setValue(this.antecedente_familiar.convulsiones);
    this.observacion_convulsiones.setValue(this.antecedente_familiar.observacion_convulsiones);
    this.alcoholismo_sustancias_psicoactivas.setValue(this.antecedente_familiar.alcoholismo_sustancias_psicoactivas);
    this.observacion_alcoholismo_sustancias_psicoactivas.setValue(this.antecedente_familiar.observacion_alcoholismo_sustancias_psicoactivas);
    this.alergias.setValue(this.antecedente_familiar.alergias);
    this.observacion_alergias.setValue(this.antecedente_familiar.observacion_alergias);
    this.tipo_alergia.setValue(this.antecedente_familiar.tipo_alergia);
    this.cancer.setValue(this.antecedente_familiar.cancer);
    this.observacion_cancer.setValue(this.antecedente_familiar.observacion_cancer);
    this.tipo_cancer.setValue(this.antecedente_familiar.tipo_cancer);
    this.hipertension_arterial.setValue(this.antecedente_familiar.hipertension_arterial);
    this.observacion_hipertension_arterial.setValue(this.antecedente_familiar.observacion_hipertension_arterial);
    this.otros.setValue(this.antecedente_familiar.otros);
    this.observacion_otros.setValue(this.antecedente_familiar.observacion_otros);

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
  get observacion_diabetes(){return this.formulario_antecedentes_familiares.get('observacion_diabetes')};
  get tb_pulmonar(){return this.formulario_antecedentes_familiares.get('tb_pulmonar')};
  get observacion_tb_pulmonar(){return this.formulario_antecedentes_familiares.get('observacion_tb_pulmonar')};
  get desnutricion(){return this.formulario_antecedentes_familiares.get('desnutricion')};
  get observacion_desnutricion(){return this.formulario_antecedentes_familiares.get('observacion_desnutricion')};
  get tipo_desnutricion(){return this.formulario_antecedentes_familiares.get('tipo_desnutricion')};
  get enfermedades_mentales(){return this.formulario_antecedentes_familiares.get('enfermedades_mentales')};
  get observacion_enfermedades_mentales(){return this.formulario_antecedentes_familiares.get('observacion_enfermedades_mentales')};
  get tipo_enfermedad_mental(){return this.formulario_antecedentes_familiares.get('tipo_enfermedad_mental')};
  get convulsiones(){return this.formulario_antecedentes_familiares.get('convulsiones')};
  get observacion_convulsiones(){return this.formulario_antecedentes_familiares.get('observacion_convulsiones')};
  get alcoholismo_sustancias_psicoactivas(){return this.formulario_antecedentes_familiares.get('alcoholismo_sustancias_psicoactivas')};
  get observacion_alcoholismo_sustancias_psicoactivas(){return this.formulario_antecedentes_familiares.get('observacion_alcoholismo_sustancias_psicoactivas')};
  get alergias(){return this.formulario_antecedentes_familiares.get('alergias')};
  get observacion_alergias(){return this.formulario_antecedentes_familiares.get('observacion_alergias')};
  get tipo_alergia(){return this.formulario_antecedentes_familiares.get('tipo_alergia')};
  get cancer(){return this.formulario_antecedentes_familiares.get('cancer')};
  get observacion_cancer(){return this.formulario_antecedentes_familiares.get('observacion_cancer')};
  get tipo_cancer(){return this.formulario_antecedentes_familiares.get('tipo_cancer')};
  get hipertension_arterial(){return this.formulario_antecedentes_familiares.get('hipertension_arterial')};
  get observacion_hipertension_arterial(){return this.formulario_antecedentes_familiares.get('observacion_hipertension_arterial')};
  get otros(){return this.formulario_antecedentes_familiares.get('otros')};
  get observacion_otros(){return this.formulario_antecedentes_familiares.get('observacion_otros')};
 
}
