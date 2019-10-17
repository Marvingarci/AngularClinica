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
import { AppComponent } from "../app.component";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatDatepicker } from '@angular/material/datepicker';
import { stringify } from '@angular/compiler/src/util';

export interface Loginadmin {
  value: string;
  viewValue: string;
}

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

export interface practica_sexual_riesgo {
  value: string;
  viewValue: string;
}

export interface Periocidad {
  value: string;
  viewValue: string;
}

export interface Caracteristica {
  value: string;
  viewValue: string;
}

export interface Metodo {
  value: string;
  viewValue: string;
}

export interface resultado_embarazo {
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

  
   
  // Aqui esta codificando MELVIN
    isDisabled = true;
    input : string ;
    triggerSomeEventSi() {      
        this.isDisabled = false;
    }
     triggerSomeEventNo() {
      this.input  =null ;
      this.isDisabled = true;      
     }

     isDisabled1 = true;
     input1 : string ;
     triggerSomeEventSi1() {    
         this.isDisabled1 = false;
     }
     triggerSomeEventNo1() {  
      this.input1  =null ;
       this.isDisabled1 = true; 
      }

      isDisabled2 = true;
      input2 : string ;
     triggerSomeEventSi2() {      
         this.isDisabled2 = false;
     }
     triggerSomeEventNo2() {  
      this.input2  =null ;
       this.isDisabled2 = true; 
      }

      isDisabled3 = true;
      input3 : string ;
      triggerSomeEventSi3() {      
          this.isDisabled3 = false;
      }
      triggerSomeEventNo3() {  
        this.input3  =null ;
        this.isDisabled3 = true; 
       }

       isDisabled4 = true;
      input4 : string ;
      triggerSomeEventSi4() {      
          this.isDisabled4 = false;
      }
      triggerSomeEventNo4() {  
        this.input4  =null ;
        this.isDisabled4 = true; 
       }

       isDisabled5 = true;
       input5 : string ;
       triggerSomeEventSi5() {      
           this.isDisabled5 = false;
       }
       triggerSomeEventN5() {  
         this.input5  =null ;
         this.isDisabled5 = true; 
        }

        isDisabled6 = true;
        input6 : string ;
        triggerSomeEventSi6() {      
            this.isDisabled6 = false;
        }
        triggerSomeEventNo6() {  
          this.input6  =null ;
          this.isDisabled6 = true; 
         }

         isDisabled7 = true;
         input7 : string ;
         triggerSomeEventSi7() {      
             this.isDisabled7 = false;
         }
         triggerSomeEventNo7() {  
           this.input7  =null ;
           this.isDisabled7 = true; 
          }

          isDisabled8 = true;
          input8 : string ;
          triggerSomeEventSi8() {      
              this.isDisabled8 = false;
          }
          triggerSomeEventNo8() {  
            this.input8  =null ;
            this.isDisabled8 = true; 
           }

           isDisabled9 = true;
          input9 : string ;
          triggerSomeEventSi9() {      
              this.isDisabled9 = false;
          }
          triggerSomeEventNo9() {  
            this.input9  =null ;
            this.isDisabled9 = true; 
           }

           
































































































// Aqui esta codificando BRASLI

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

   isDisabledB7 = true;
  triggerSomeEventSiB7() {      
      this.isDisabledB7 = false;
  }
  triggerSomeEventNoB7() {  
    this.isDisabledB7 = true; 
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

   isDisabledB10 = true;
     inputB10 : string ;
     triggerSomeEventSiB10() {    
         this.isDisabledB10 = false;
     }
     triggerSomeEventNoB10() {  
      this.inputB10  =null ;
       this.isDisabledB10 = true; 
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

   


























































































     









// Aqui esta codificando MARVIN
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

     seccion: boolean = true;
   
     mostrarS(){
       this.seccion=false;
     }
     mostrarN(){
      this.seccion=true;
    }

   
































































































     // Aqui esta codificando ALBERTO





































































































   


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

  error: boolean = false;

  //date picker
  minDate = new Date(1950, 0, 1).toISOString;
  maxDate = new Date(2020, 0, 1).toISOString;
  


  

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

  practicas_sexuales_riesgo: practica_sexual_riesgo[] = [
    {value: 'Anal' , viewValue: 'Anal'},
    {value: 'Vaginal' , viewValue: 'Vaginal'},
    {value: 'Oral' , viewValue: 'Oral'},
  ];

  periocidades: Periocidad[] = [
    {value: 'Regular' , viewValue: 'Regular'},
    {value: 'Irregular' , viewValue: 'Irregular'},

  ];
  
  caracteristicas: Caracteristica[] = [
    {value: 'Abundante' , viewValue: 'Abundante'},
    {value: 'Normal' , viewValue: 'Normal'},
    {value: 'Escasa' , viewValue: 'Escasa'},

  ];

  metodos: Metodo[] = [
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

  resultados_embarazos: resultado_embarazo[] = [
    {value: 'Sin complicaciones' , viewValue: 'Sin complicaciones'},
    {value: 'Con complicaciones' , viewValue: 'Con complicaciones'},
    
  ];



  //radio buttons
  opciones: string[] = ['Si', 'No' ];
  

 

  

  isLinear = false;
  isOptional = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup; 


  constructor(private formularioService: FormularioService, 
    private router: Router,
    private _formBuilder: FormBuilder, activar: AppComponent) {
      activar.esconder();
     }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    
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
