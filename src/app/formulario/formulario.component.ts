import { Component, OnInit, Input, ViewChild, NgZone, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../interfaces/paciente';
import { FormularioService } from '../services/formulario.service';
import { HabitosToxicologicosPersonales } from '../interfaces/habitos-toxicologicos-personales';
import { ActividadSexual } from '../interfaces/actividad-sexual';
import { AntecedentesGinecologicos } from '../interfaces/antecedentes-ginecologicos';
import { PlanificacionesFamiliares } from '../interfaces/planificaciones-familiares';
import { AntecedentesObstetricos } from '../interfaces/antecedentes-obstetricos';
import { AppComponent } from "../app.component";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, AbstractControl, NG_ASYNC_VALIDATORS, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Login } from '../interfaces/login';
import { cambiocontraDialog, DatoPacienteComponent } from "../dato-paciente/dato-paciente.component";
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from "../services/login.service";
import { NgStyle } from '@angular/common';
import { stringify } from 'querystring';
import { Subscription, Observable } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take, startWith, map } from 'rxjs/operators';
import { PacienteAntecedenteFamiliar } from '../interfaces/paciente-antecedente-familiar';
import { MatChipInputEvent, MatAutocomplete, MatTableDataSource } from '@angular/material';
import { PacienteAntecedentePersonal } from '../interfaces/paciente-antecedente-personal';
import { HabitoToxicologico } from '../interfaces/habito-toxicologico';
import { PacienteHabitoToxicologico } from '../interfaces/paciente-habito-toxicologico';
import { PacienteHospitalariaQuirurgica } from '../interfaces/paciente-hospitalaria-quirurgica';
import { TelefonoUnicoService } from '../validations/telefono-unico.directive';
import { IdentidadUnicoService } from '../validations/identidad-unica.directive';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TelefonoEmergencia } from '../interfaces/telefono-emergencia';

export interface Loginadmin {
  // contrasenia_admin: any;
  value: string;
  viewValue: string;

}

export interface Element {

  numero: number;
  enfermedad?: string;
  id_grupo_enfermedad?: number
  observacion?: string;
  parentesco?: any;
  habito_toxicologico?: string;

}

export interface HospitalariaQuirurgica {

  numero: number;
  fecha: string;
  tiempo_hospitalizacion: string
  diagnostico: string;
  tratamiento: string;

}

export interface antecedentesPersonales {

  antecedente: number;
  observacion?: string;

}

export interface antecedentesFamiliares {

  antecedente: number;
  parentesco: number;

}

export interface habitosToxicologicos {

  habito_toxicologico: number;
  observacion: string;

}


export interface select {
  value: string;
  viewValue: string;
}


// todas estas interfaces hay que borrarlas despues y solo dejar una
// por mientras son de prueba
export interface sexos {
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
export interface Parentescos {
  value: number;
  viewValue: string;
}

export interface State {
  flag: string;
  name: string;
  population: string;
}

export interface Categorias {
  value: number;
  viewValue: string;
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

import * as _moment from 'moment';
import { FormTools } from '../focus';
//import { FormTools } from '../focus';
// tslint:disable-next-line:no-duplicate-imports




@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false },

  },

  ]
})


export class FormularioComponent implements OnInit, AfterViewInit {
  panelOpenState = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  telefonos_emergencia = [];


  selectSexo(valor) {

    if (valor == "Hombre") {

      this.ocultar = true;

    } else {

      this.ocultar = false;

      setTimeout(() => {
        this.mostrarLabelStep(0);
      }, 0);

    }

  }


  selectCategoria(valor) {

    if (valor == 3) {

      this.esAlumnoAdmon = true;
      this.numero_cuenta.setValue("");
      this.numero_cuenta.setValidators([Validators.required, Validators.pattern(/^[2][0-9]{10}$/)]);
      this.numero_cuenta.updateValueAndValidity();

    } else {

      this.esAlumnoAdmon = false;
      this.numero_cuenta.clearValidators();
      this.numero_cuenta.updateValueAndValidity();

    }



  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      // this.telefonos_emergencia.push({ name: value.trim() });
      this.telefonos_emergencia.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  remove(telefono_emergencia): void {
    const index = this.telefonos_emergencia.indexOf(telefono_emergencia);
    if (index >= 0) {
      this.telefonos_emergencia.splice(index, 1);
    }
  }


  loading: boolean = false;


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
    password: null,
    nombre: null,
    carrera: null,
    centro: null,
    numero_identidad: null,
  }


  formulario_datos_generales = new FormGroup({
    nombre_completo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{0,100}$/)]),
    numero_cuenta: new FormControl('', [Validators.required, Validators.pattern(/^[2][0-9]{10}$/)]),
    // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
    // "/ /" indica el inicio y el final de la expresion regular
    // "{10}" indica le numero de digitos de lo que lo antecede
    numero_identidad: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^\d{4}\d{4}\d{5}$/)],
      asyncValidators: [this.IdentidadUnicoService.validate.bind(this.IdentidadUnicoService)]
    }),
    // "\d" es lo mismo "[0-9]"
    lugar_procedencia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,20}$/)]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(20)]),
    carrera: new FormControl('', [Validators.required]),
    fecha_nacimiento: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    categoria: new FormControl('', [Validators.required]),
    estado_civil: new FormControl('', Validators.required),
    seguro_medico: new FormControl('', Validators.required),
    numero_telefono: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^\d{8}$/)],
      asyncValidators: [this.TelefonoUnicoService.validate.bind(this.TelefonoUnicoService)]
    }),
    emergencia_persona: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-zñÑáéíóúÁÉÍÓÚ\s]{3,30}$/)]),
    emergencia_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)])
  });


  formulario_antecedentes_familiares = new FormGroup({
    diabetes: new FormControl('', [Validators.required]),
    parentesco_diabetes: new FormControl('', []),
    tb_pulmonar: new FormControl('', [Validators.required]),
    parentesco_tb_pulmonar: new FormControl('', []),
    desnutricion: new FormControl('', [Validators.required]),
    parentesco_desnutricion: new FormControl('', []),
    tipo_desnutricion: new FormControl('', []),
    enfermedades_mentales: new FormControl('', [Validators.required]),
    parentesco_enfermedades_mentales: new FormControl('', []),
    tipo_enfermedad_mental: new FormControl('', []),
    convulsiones: new FormControl('', [Validators.required]),
    parentesco_convulsiones: new FormControl('', []),
    alcoholismo_sustancias_psicoactivas: new FormControl('', [Validators.required]),
    parentesco_alcoholismo_sustancias_psicoactivas: new FormControl('', []),
    alergias: new FormControl('', [Validators.required]),
    parentesco_alergias: new FormControl('', []),
    tipo_alergia: new FormControl('', []),
    cancer: new FormControl('', [Validators.required]),
    parentesco_cancer: new FormControl('', []),
    tipo_cancer: new FormControl('', []),
    hipertension_arterial: new FormControl('', [Validators.required]),
    parentesco_hipertension_arterial: new FormControl('', []),
    otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    parentesco_otros: new FormControl('', []),
  });


  formulario_antecedentes_personales = new FormGroup({
    diabetes: new FormControl('', [Validators.required]),
    observacion_diabetes: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tb_pulmonar: new FormControl('', [Validators.required]),
    observacion_tb_pulmonar: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    its: new FormControl('', [Validators.required]),
    observacion_its: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    desnutricion: new FormControl('', [Validators.required]),
    observacion_desnutricion: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_desnutricion: new FormControl('', []),
    enfermedades_mentales: new FormControl('', [Validators.required]),
    observacion_enfermedades_mentales: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_enfermedad_mental: new FormControl('', []),
    convulsiones: new FormControl('', [Validators.required]),
    observacion_convulsiones: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    alergias: new FormControl('', [Validators.required]),
    observacion_alergias: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_alergia: new FormControl('', []),
    cancer: new FormControl('', [Validators.required]),
    observacion_cancer: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tipo_cancer: new FormControl('', []),
    hospitalarias_quirurgicas: new FormControl('', [Validators.required]),
    fecha_antecedente_hospitalario: new FormControl('', []),
    tratamiento: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    diagnostico: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tiempo_hospitalizacion: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    traumaticos: new FormControl('', [Validators.required]),
    observacion_traumaticos: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    observacion_otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
  });


  formulario_habito_toxicologico_personal = new FormGroup({
    alcohol: new FormControl('', [Validators.required]),
    observacion_alcohol: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    tabaquismo: new FormControl('', [Validators.required]),
    observacion_tabaquismo: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    marihuana: new FormControl('', [Validators.required]),
    observacion_marihuana: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    cocaina: new FormControl('', [Validators.required]),
    observacion_cocaina: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
    observacion_otros: new FormControl('', [Validators.maxLength(60), Validators.minLength(6)]),
  });


  formulario_actividad_sexual = new FormGroup({
    actividad_sexual: new FormControl('', Validators.required),
    edad_inicio_sexual: new FormControl(''),
    numero_parejas_sexuales: new FormControl(''),
    practicas_sexuales_riesgo: new FormControl(''),
  });


  formulario_antecedente_ginecologico = new FormGroup({
    edad_inicio_menstruacion: new FormControl('', [Validators.required, Validators.max(18), Validators.min(6)]),
    fum: new FormControl('', [Validators.required]),
    citologia: new FormControl('', [Validators.required]),
    fecha_citologia: new FormControl(''),
    resultado_citologia: new FormControl('', [Validators.maxLength(150), Validators.minLength(4)]),
    duracion_ciclo_menstrual: new FormControl('', [Validators.maxLength(150), Validators.minLength(4)]),
    periocidad_ciclo_menstrual: new FormControl('', [Validators.required]),
    caracteristicas_ciclo_menstrual: new FormControl('', [Validators.required])
  });


  formulario_planificacion_familiar = new FormGroup({
    planificacion_familiar: new FormControl('', Validators.required),
    metodo_planificacion: new FormControl(''),
    observacion_planificacion: new FormControl('', [Validators.maxLength(150), Validators.minLength(4)]),
  });


  formulario_antecedente_obstetrico = new FormGroup({
    partos: new FormControl('', [Validators.max(100), Validators.min(0)]),
    abortos: new FormControl('', [Validators.max(100), Validators.min(0)]),
    cesarias: new FormControl('', [Validators.max(100), Validators.min(0)]),
    hijos_vivos: new FormControl('', [Validators.max(100), Validators.min(0)]),
    hijos_muertos: new FormControl('', [Validators.max(100), Validators.min(0)]),
    fecha_termino_ult_embarazo: new FormControl(''),
    descripcion_termino_ult_embarazo: new FormControl('', [Validators.maxLength(150), Validators.minLength(4)]),
    observaciones: new FormControl('', [Validators.maxLength(150), Validators.minLength(4)]),
  });


  matcher = new MyErrorStateMatcher();



  habilitarInputs(formControl: FormControl[]) {
    formControl.forEach(controlador => {
      controlador.enable({ onlySelf: true });

      if (controlador.parent == this.formulario_antecedentes_familiares) {
        controlador.setValidators(Validators.required);
        //este metodo sirve para actualizar el valor y las validaciones de un controlador.
        controlador.updateValueAndValidity();
      }

      if (controlador.parent == this.formulario_antecedentes_personales) {
        if (this.tipo_desnutricion_ap == controlador ||
          this.tipo_enfermedad_mental_ap == controlador ||
          this.tipo_alergia_ap == controlador ||
          this.tipo_cancer_ap == controlador ||
          this.fecha_antecedente_hospitalario == controlador ||
          this.tiempo_hospitalizacion == controlador ||
          this.diagnostico == controlador ||
          this.tratamiento == controlador) {

          controlador.setValidators(Validators.required);
          //este metodo sirve para actualizar el valor y las validaciones de un controlador.
          controlador.updateValueAndValidity();
        }
      }
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
  }

  mostrarCamposEnfermedadesMentalesAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposEnfermedadesMentalesAF').style.display = "block";
  }

  mostrarCamposAlergiasAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposAlergiasAF').style.display = "block";
  }

  mostrarCamposCancerAF() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposCancerAF').style.display = "block";
  }

  mostrarCamposDesnutricionAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposDesnutricionAP').style.display = "block";
  }

  mostrarCamposEnfermedadesMentalesAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposEnfermedadesMentalesAP').style.display = "block";
  }

  mostrarCamposAlergiasAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposAlergiasAP').style.display = "block";
  }

  mostrarCamposCancerAP() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposCanceresAP').style.display = "block";
  }

  mostrarCamposHospitalariasQuirurgicas() {
    //muestro el contenido de este div si el usuario hace click en "si"
    document.getElementById('divAgregarTiposHospitalariasQ').style.display = "block";
  }






  ocultarCamposDesnutricionAF() {
    //oculto el contenido de este div si el usuario hace click en "no" y establezco
    // el datasource de la tabla en null para que no se muestre la tabla html, y por ultimo
    // limpio la tablaDesnutriciones para que quede en blanco.
    //ESTE LO HAGO EN TODOS LAS FUNCIONES DE OCULTAR
    document.getElementById('divAgregarTiposDesnutricionAF').style.display = "none";
    this.dataSourceTablaDesnutricionesAF = null;
    this.tablaDesnutricionesAF = [];
  }

  ocultarCamposEnfermedadesMentalesAF() {
    document.getElementById('divAgregarTiposEnfermedadesMentalesAF').style.display = "none";
    this.dataSourceTablaEnfermedadesMentalesAF = null;
    this.tablaEnfermedadesMentalesAF = [];
  }

  ocultarCamposAlergiasAF() {
    document.getElementById('divAgregarTiposAlergiasAF').style.display = "none";
    this.dataSourceTablaAlergiasAF = null;
    this.tablaAlergiasAF = [];
  }

  ocultarCamposCancerAF() {
    document.getElementById('divAgregarTiposCancerAF').style.display = "none";
    this.dataSourceTablaCanceresAF = null;
    this.tablaCanceresAF = [];
  }

  ocultarCamposDesnutricionAP() {
    document.getElementById('divAgregarTiposDesnutricionAP').style.display = "none";
    this.dataSourceTablaDesnutricionesAP = null;
    this.tablaDesnutricionesAP = [];
  }

  ocultarCamposEnfermedadesMentalesAP() {
    document.getElementById('divAgregarTiposEnfermedadesMentalesAP').style.display = "none";
    this.dataSourceTablaEnfermedadesMentalesAP = null;
    this.tablaEnfermedadesMentalesAP = [];
  }

  ocultarCamposAlergiasAP() {
    document.getElementById('divAgregarTiposAlergiasAP').style.display = "none";
    this.dataSourceTablaAlergiasAP = null;
    this.tablaAlergiasAP = [];
  }

  ocultarCamposCancerAP() {
    document.getElementById('divAgregarTiposCanceresAP').style.display = "none";
    this.dataSourceTablaCanceresAP = null;
    this.tablaCanceresAP = [];
  }

  ocultarCamposHospitalariaQuirurgica() {
    document.getElementById('divAgregarTiposHospitalariasQ').style.display = "none";
    this.dataSourceTablaHospitalariasQuirurgicas = null;
    this.tablaHospitalariasQuirurgicas = [];
  }


  hidden1 = true;
  readonly = true;
  read15 = true;
  isDisabledB25 = true;
  input15: string = '';
  ocultar: boolean = true;
  ocultar1: boolean = true;
  mostrarLabelDatosGenerales: boolean = false;


  csi15(formControl: FormControl[]) {

    formControl.forEach(controlador => {
      controlador.enable({ onlySelf: true });
    });

    this.edad_inicio_sexual.setValidators([Validators.required, Validators.max(99), Validators.min(1)]);
    this.edad_inicio_sexual.updateValueAndValidity();

    this.numero_parejas_sexuales.setValidators([Validators.required, Validators.max(1000), Validators.min(1)]);
    this.numero_parejas_sexuales.updateValueAndValidity();

    this.practicas_sexuales_riesgo.setValidators(Validators.required);
    this.practicas_sexuales_riesgo.updateValueAndValidity();


    if (this.formulario_datos_generales.get('sexo').value == "Hombre") {

      this.ocultar1 = false;

      setTimeout(() => {

        this.mostrarLabelStep(3);

      }, 0);

    } else {

      this.ocultar1 = false;

      setTimeout(() => {

        this.mostrarLabelStep(3);

      }, 0);
    }
  }

  cno15(formControl: FormControl[]) {

    formControl.forEach(controlador => {
      controlador.setValue('');
      controlador.disable({ onlySelf: true });

    });

    this.edad_inicio_sexual.clearValidators();
    this.edad_inicio_sexual.updateValueAndValidity();

    this.numero_parejas_sexuales.clearValidators();
    this.numero_parejas_sexuales.updateValueAndValidity();

    this.practicas_sexuales_riesgo.clearValidators();
    this.practicas_sexuales_riesgo.updateValueAndValidity();

    if (this.sexo.value == "Hombre") {

      this.ocultar1 = true;

    } else {

      this.ocultar1 = true;

    }
  }

  radioPlanificacionFamiliar(valor, formControl: FormControl[]) {

    console.log(valor);

    if (valor == "Si") {

      formControl.forEach(controlador => {
        controlador.enable({ onlySelf: true });
      });

      this.metodo_planificacion.setValidators([Validators.required]);
      this.metodo_planificacion.updateValueAndValidity();

      this.observacion_planificacion.setValidators([Validators.maxLength(150), Validators.minLength(4)])
      this.observacion_planificacion.updateValueAndValidity();

    } else {

      formControl.forEach(controlador => {
        controlador.setValue('');
        controlador.disable({ onlySelf: true });

      });

      this.metodo_planificacion.clearValidators();
      this.metodo_planificacion.updateValueAndValidity();

      this.observacion_planificacion.clearValidators()
      this.observacion_planificacion.updateValueAndValidity();


    }


  }

  radioCitologias(valor, formControl: FormControl[]) {

    if (valor == "Si") {

      formControl.forEach(controlador => {
        controlador.enable({ onlySelf: true });
      });


      this.fecha_citologia.setValidators(Validators.required);
      this.fecha_citologia.updateValueAndValidity();

      this.resultado_citologia.setValidators([Validators.required, Validators.maxLength(150), Validators.minLength(4)])
      this.resultado_citologia.updateValueAndValidity();

    } else {

      formControl.forEach(controlador => {
        controlador.setValue('');
        controlador.disable({ onlySelf: true });

      });

      this.fecha_citologia.clearValidators();
      this.fecha_citologia.updateValueAndValidity();

      this.resultado_citologia.clearValidators()
      this.resultado_citologia.updateValueAndValidity();

    }


  }


  public onStepChange(event: any): void {
    console.log('step index seleccionado');
    console.log(event.selectedIndex);
    this.mostrarLabelStep(event.selectedIndex);

    if (event.selectedIndex == 1) {
      this.AgregarTelefonosEmergencia();
    }
    if (event.selectedIndex == 2) {
      this.agregarDesnutricionesAF();
      this.agregarEnfermedadesMentales();
      this.agregarAlergias();
      this.agregarCanceres();
      this.agregarOtros();
    }
    if (event.selectedIndex == 3) {
      this.agregarDesnutricionesAP();
      this.agregarEnfermedadesMentalesAP();
      this.agregarAlergiasAP();
      this.agregarCanceresAP();
      this.agregarHospitalariasQuirurgicas();
      this.agregarOtrosAP();
    }
  }

  //muestra solo el step que le manda
  mostrarLabelStep(index: number) {
    let elementos: any = document.getElementsByClassName('mat-step-label');
    for (let i = 0; i < elementos.length; i++) {
      const element: any = elementos[i];
      element.style.display = "none";
      console.log(element);
    }
    console.log(index);
    elementos[index].style.display = "";
  }


  des = true;
  ingreso: string;
  des1 = true;
  ingreso1: string;
  des2 = true;
  ingreso2: string;
  des3 = true;
  ingreso3: string;

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
    telefono: null,
    categoria: null
  };

  telefono_emergencia: TelefonoEmergencia = {
    id_paciente: null,
    telefono_emergencia: null,
    emergencia_persona: null,
  }

  enfermedad: Element = {
    numero: null,
    enfermedad: null,
    parentesco: null,
    id_grupo_enfermedad: null,
  }

  habito_toxicologico: HabitoToxicologico = {
    habito_toxicologico: null,
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
  }

  paciente_habito_toxicologico: PacienteHabitoToxicologico = {
    id_paciente: null,
    id_habito_toxicologico: null,
    observacion: null,
  }

  paciente_hospitalaria_quirurgica: PacienteHospitalariaQuirurgica = {
    id_hospitalaria_quirurgica: null,
    id_paciente: null,
    fecha: null,
    tiempo_hospitalizacion: null,
    diagnostico: null,
    tratamiento: null,
  }


  actividad_sexual: ActividadSexual = {
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

  planificacion_familiar: PlanificacionesFamiliares = {
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



  error: boolean = false;




  ////////////////////////////////////////////////////
  //select
  categorias: Categorias[] = [
    { value: 1, viewValue: 'Empleado' },
    { value: 2, viewValue: 'Visitante' },
    { value: 3, viewValue: 'Estudiante' }
  ];
  sexos: sexos[] = [
    { value: 'Hombre', viewValue: 'Hombre' },
    { value: 'Mujer', viewValue: 'Mujer' },
    //{value: 'otro', viewValue: 'Otro'}
  ];

  seguros_medicos: SegurosMedicos[] = [];

  estados_civiles: EstadosCiviles[] = [];

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
    { value: 'Cervicouterino', viewValue: 'Cervicouterino' }
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

  resultado: any;
  id: any;
  esAlumno: boolean = true;

  tablaOtrosAF: Element[] = [];
  tablaDesnutricionesAF: Element[] = [];
  tablaEnfermedadesMentalesAF: Element[] = [];
  tablaAlergiasAF: Element[] = [];
  tablaCanceresAF: Element[] = [];

  dataSourceTablaOtrosAF: any;
  dataSourceTablaDesnutricionesAF: any;
  dataSourceTablaEnfermedadesMentalesAF: any;
  dataSourceTablaAlergiasAF: any;
  dataSourceTablaCanceresAF: any;
  dataSourceTablaTelefonosEmergencia: any;


  tablaOtrosAP: Element[] = [];
  tablaDesnutricionesAP: Element[] = [];
  tablaEnfermedadesMentalesAP: Element[] = [];
  tablaAlergiasAP: Element[] = [];
  tablaCanceresAP: Element[] = [];
  tablaTelefonosEmergencia: TelefonoEmergencia[] = [];

  dataSourceTablaOtrosAP: any;
  dataSourceTablaDesnutricionesAP: any;
  dataSourceTablaEnfermedadesMentalesAP: any;
  dataSourceTablaAlergiasAP: any;
  dataSourceTablaCanceresAP: any;

  tablaOtrosHT: Element[] = [];
  dataSourceTablaOtrosHT: any;


  tablaHospitalariasQuirurgicas: HospitalariaQuirurgica[] = [];
  dataSourceTablaHospitalariasQuirurgicas: any;

  esAlumnoAdmon: boolean = false;


  columnasTablaAF: string[] = ['numero', 'antecedente', 'parentesco', 'botones'];
  columnasTablaAP: string[] = ['numero', 'antecedente', 'observacion', 'botones'];
  columnasTablaHospitalarias: string[] = ['numero', 'fecha', 'tiempo', 'diagnostico', 'tratamiento', 'botones'];
  columnasTablaTelefonosEmergencia: string[] = ['numero', 'nombre', 'telefono', 'botones'];


  // creo estos arreglos de los cuales extraigo el valor de cada elemento y lo mando a la tabla de la base de datos respectiva
  // estos arreglos son de los controladores del formulario.

  antecedentesF: antecedentesFamiliares[];
  antecedentesP: antecedentesPersonales[];
  habitosT: habitosToxicologicos[];


  // myControl = new FormControl();
  enfermedadesDesnutricion: string[] = [];
  enfermedadesMentales: string[] = [];
  enfermedadesAlergias: string[] = [];
  enfermedadesCancer: string[] = [];
  habitosToxicologicos: string[] = [];


  // minDate: new Date(1969,0,1);
  minDate: Date;
  maxDate:  Date;


  constructor(private formularioService: FormularioService, private formBuilder: FormBuilder,
    private router: Router, activar: AppComponent, public dialog: MatDialog, public loginService: LoginService,
    private formulario: FormularioService, private TelefonoUnicoService: TelefonoUnicoService,
    private IdentidadUnicoService: IdentidadUnicoService) {


    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentMonth - 0, 9 ,1);


    // this.obtenerDatosFormulario();
    this.getDatosScraping();
    this.loginService.obtenerUltimoId().subscribe();
  }


  // para que se le quite la cosa fea al text area
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  ngAfterViewInit(): void {

    //FormTools.focusElement(this.formulario_datos_generales, 'lugar_procedencia')


    this.mostrarLabelStep(0);

    let element: any = document.getElementById("select");
    console.log(element);
    element.addEventListener('click', function (e) {
      console.log('se toco el select');
    })

    this.autocomplete(document.getElementById('InputDesnutricion'), this.enfermedadesDesnutricion, this.tipo_desnutricion);
    this.autocomplete(document.getElementById('InputEnfermedadAF'), this.enfermedadesMentales, this.tipo_enfermedad_mental);
    this.autocomplete(document.getElementById('InputAlergiaAF'), this.enfermedadesAlergias, this.tipo_alergia);
    this.autocomplete(document.getElementById('InputCancerAF'), this.enfermedadesCancer, this.tipo_cancer);
    this.autocomplete(document.getElementById('InputDenutricionAP'), this.enfermedadesDesnutricion, this.tipo_desnutricion_ap);
    this.autocomplete(document.getElementById('InputEnfermedadAP'), this.enfermedadesMentales, this.tipo_enfermedad_mental_ap);
    this.autocomplete(document.getElementById('inputAlergiaAP'), this.enfermedadesAlergias, this.tipo_alergia_ap);
    this.autocomplete(document.getElementById('InputCancerAP'), this.enfermedadesCancer, this.tipo_cancer_ap);
    this.autocomplete(document.getElementById('inputOtrosHT'), this.habitosToxicologicos, this.otros_ht);
  }


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






  ngOnInit() {
    this.obtenerDatosFormulario();
    this.getDatosScraping();
    this.esAlumno = this.formulario.esAlumno;

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




  modificaciones() {
    if (this.esAlumno == false) {
      this.numero_cuenta.valid;
      this.numero_identidad.valid;
    }
  }




  getDatosScraping() {
    this.formularioService.getScrap().subscribe((data: Login) => {
      this.datosScraping = data;
      console.log(this.maxDate);
      /////
      if (this.esAlumno === true) {
        // si el paciente es un alumno 
        //establesco el valor a los formcontrol recuperados del scrapping
        // para que se visualizen en los respectivos inputs
        this.nombre_completo.setValue(this.datosScraping.nombre);
        this.numero_cuenta.setValue(this.datosScraping.cuenta);
        this.numero_identidad.setValue(this.datosScraping.numero_identidad);
        this.carrera.setValue(this.datosScraping.carrera);
        this.categoria.setValue(3);
      } else {
        //si el paciente no es un alumno
        //establesco el valor por defecto a los formcontrol que no pertenecen a un
        //paciente normal y les establesco un valor por defecto


        var numAleatorio: string;
        numAleatorio = '2' + Math.floor(Math.random() * 10000000000);
        console.log(numAleatorio);
        this.carrera.setValue('no es estudiante');
        if (this.esAlumnoAdmon == false) {
          this.numero_cuenta.setValue(numAleatorio);
        }

      }

      console.log(this.datosScraping);

      //Obtencion de Paciente ultimo paciente regitrado
      this.formularioService.getUltimoID().subscribe((data) => {
        this.resultado = data;
        if (this.resultado[0].ultimoId == null) {
          this.resultado[0].ultimoId = 0;
          console.log(this.resultado[0].ultimoId);
        }


        if (this.esAlumno == false) {
          this.datosScraping.password = null;
          this.datosScraping.nombre = null;
          this.datosScraping.carrera = null;
          this.datosScraping.numero_identidad = null;
          this.datosScraping.imagen = null;
        }
        var numero = 1;
        console.log(this.resultado[0].ultimoId);
        this.datosScraping.id_login = parseInt(this.resultado[0].ultimoId) + numero;
        console.log(this.datosScraping.id_login);

      }, (error) => {
        console.log(error);
      });

      console.log(this.datosScraping);
    },
      (error) => {
        console.log(error),
          alert('ocurrio un error');
      });
  }




  agregarOtros() {
    if (this.otros.value.toString().trim() && this.otros.valid && this.parentesco_otros.value) {
      var stringParentesco: string = "";

      if (this.parentesco_otros.value.length == 1) {
        //le establezco a la variable stringParentesco el valor en string del arreglo parentesco
        // en donde el index es igual a el valor que se guarda en el formControl menos 1
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
          numero: this.tablaOtrosAF.length + 1,
          enfermedad: this.otros.value,
          parentesco: stringParentesco,
        }
      );

      this.dataSourceTablaOtrosAF = new MatTableDataSource(this.tablaOtrosAF);

      this.otros.setValue('');
      this.parentesco_otros.setValue('');

    }
  }







  eliminarOtros(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaOtrosAF.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaOtrosAF = new MatTableDataSource(this.tablaOtrosAF);


    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaOtrosAF.length) {
      this.dataSourceTablaOtrosAF = null;
    }

  }

  agregarDesnutricionesAF() {
    if (this.tipo_desnutricion.value && this.tipo_desnutricion.valid && this.parentesco_desnutricion.value) {
      var stringParentesco: string = "";
      // comparo si solo se selecciono un valor en el select de parentesco_desnutricion
      if (this.parentesco_desnutricion.value.length == 1) {
        stringParentesco = this.parentescos[this.parentesco_desnutricion.value[0] - 1].viewValue;
      } else {
        this.parentesco_desnutricion.value.forEach(element => {
          element = this.parentescos[element - 1].viewValue;
          //si se selecciono mas de un valor del select de parentesco_desnutricion
          //los guardo cada uno en una variable de tipo string y los separo con un espacio.
          stringParentesco += element + " ";
        });
        //elimino el espacio de inicio y el final que puede quedar en la variable stringParentesco.
        stringParentesco = stringParentesco.trim();
      }

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaDesnutricionesAF.push(
        {
          numero: this.tablaDesnutricionesAF.length + 1,
          enfermedad: this.tipo_desnutricion.value,
          parentesco: stringParentesco,
        }
      );

      this.dataSourceTablaDesnutricionesAF = new MatTableDataSource(this.tablaDesnutricionesAF);
      this.tipo_desnutricion.setValue('');
      this.parentesco_desnutricion.setValue('');
      //si se agrega un elemento a la tabla entonces los campos
      //tipo desnutricion y parentesco ya no seran requeridos, solo en caso de que la tabla este vacia.
      this.tipo_desnutricion.clearValidators();
      this.tipo_desnutricion.updateValueAndValidity();
      this.parentesco_desnutricion.clearValidators();
      this.parentesco_desnutricion.updateValueAndValidity();
    }
  }





  eliminarDesnutriciones(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaDesnutricionesAF.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaDesnutricionesAF = new MatTableDataSource(this.tablaDesnutricionesAF);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaDesnutricionesAF.length) {
      this.dataSourceTablaDesnutricionesAF = null;


      //si la tabla no tiene ningun valor entonces establezco como requerido
      // los campos tipo desnutricion y parentesco.
      this.tipo_desnutricion.setValidators(Validators.required);
      this.tipo_desnutricion.updateValueAndValidity();

      this.parentesco_desnutricion.setValidators(Validators.required);
      this.parentesco_desnutricion.updateValueAndValidity();

    }
  }


  agregarEnfermedadesMentales() {

    if (this.tipo_enfermedad_mental.value && this.tipo_enfermedad_mental.valid && this.parentesco_enfermedades_mentales.value) {

      var stringParentesco: string = "";

      // comparo si solo se selecciono un valor en el select de parentesco_desnutricion
      if (this.parentesco_enfermedades_mentales.value.length == 1) {

        stringParentesco = this.parentescos[this.parentesco_enfermedades_mentales.value[0] - 1].viewValue;

      } else {

        this.parentesco_enfermedades_mentales.value.forEach(element => {

          element = this.parentescos[element - 1].viewValue;

          //si se selecciono mas de un valor del select de parentesco_desnutricion
          //los guardo cada uno en una variable de tipo string y los separo con un espacio.
          stringParentesco += element + " ";
        });

        //elimino el espacio de inicio y el final que puede quedar en la variable stringParentesco.
        stringParentesco = stringParentesco.trim();


      }

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaEnfermedadesMentalesAF.push(
        {
          numero: this.tablaEnfermedadesMentalesAF.length + 1,
          enfermedad: this.tipo_enfermedad_mental.value,
          parentesco: stringParentesco,

        }

      );

      this.dataSourceTablaEnfermedadesMentalesAF = new MatTableDataSource(this.tablaEnfermedadesMentalesAF);

      this.tipo_enfermedad_mental.setValue('');
      this.parentesco_enfermedades_mentales.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo enfermedad mental y parentesco ya no seran requeridos, solo en caso de que la tabla este vacia.
      this.tipo_enfermedad_mental.clearValidators();
      this.tipo_enfermedad_mental.updateValueAndValidity();

      this.parentesco_enfermedades_mentales.clearValidators();
      this.parentesco_enfermedades_mentales.updateValueAndValidity();

    }


  }

  eliminarEnfermedadesMentales(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaEnfermedadesMentalesAF.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaEnfermedadesMentalesAF = new MatTableDataSource(this.tablaEnfermedadesMentalesAF);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaEnfermedadesMentalesAF.length) {

      this.dataSourceTablaEnfermedadesMentalesAF = null;

      //si la tabla no tiene ningun valor entonces establezco como requerido
      // los campos tipo enfermedad mental y parentesco.
      this.tipo_enfermedad_mental.setValidators(Validators.required);
      this.tipo_enfermedad_mental.updateValueAndValidity();

      this.parentesco_enfermedades_mentales.setValidators(Validators.required);
      this.parentesco_enfermedades_mentales.updateValueAndValidity();
    }
  }

  agregarAlergias() {

    if (this.tipo_alergia.value && this.tipo_alergia.valid && this.parentesco_alergias.value) {

      var stringParentesco: string = "";

      // comparo si solo se selecciono un valor en el select de parentesco_desnutricion
      if (this.parentesco_alergias.value.length == 1) {

        stringParentesco = this.parentescos[this.parentesco_alergias.value[0] - 1].viewValue;

      } else {

        this.parentesco_alergias.value.forEach(element => {

          element = this.parentescos[element - 1].viewValue;

          //si se selecciono mas de un valor del select de parentesco_desnutricion
          //los guardo cada uno en una variable de tipo string y los separo con un espacio.
          stringParentesco += element + " ";
        });

        //elimino el espacio de inicio y el final que puede quedar en la variable stringParentesco.
        stringParentesco = stringParentesco.trim();


      }

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaAlergiasAF.push(
        {
          numero: this.tablaAlergiasAF.length + 1,
          enfermedad: this.tipo_alergia.value,
          parentesco: stringParentesco,

        }

      );

      this.dataSourceTablaAlergiasAF = new MatTableDataSource(this.tablaAlergiasAF);

      this.tipo_alergia.setValue('');
      this.parentesco_alergias.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo alergia y parentesco ya no seran requeridos, solo en caso de que la tabla este vacia.
      this.tipo_alergia.clearValidators();
      this.tipo_alergia.updateValueAndValidity();

      this.parentesco_alergias.clearValidators();
      this.parentesco_alergias.updateValueAndValidity();

    }


  }

  eliminarAlergias(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaAlergiasAF.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaAlergiasAF = new MatTableDataSource(this.tablaAlergiasAF);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaAlergiasAF.length) {

      this.dataSourceTablaAlergiasAF = null;

      //si la tabla no tiene ningun valor entonces establezco como requerido
      // los campos tipo alergia y parentesco.
      this.tipo_alergia.setValidators(Validators.required);
      this.tipo_alergia.updateValueAndValidity();

      this.parentesco_alergias.setValidators(Validators.required);
      this.parentesco_alergias.updateValueAndValidity();
    }
  }


  agregarCanceres() {

    if (this.tipo_cancer.value && this.tipo_cancer.valid && this.parentesco_cancer.value) {

      var stringParentesco: string = "";

      // comparo si solo se selecciono un valor en el select de parentesco_desnutricion
      if (this.parentesco_cancer.value.length == 1) {

        stringParentesco = this.parentescos[this.parentesco_cancer.value[0] - 1].viewValue;

      } else {

        this.parentesco_cancer.value.forEach(element => {

          element = this.parentescos[element - 1].viewValue;

          //si se selecciono mas de un valor del select de parentesco_desnutricion
          //los guardo cada uno en una variable de tipo string y los separo con un espacio.
          stringParentesco += element + " ";
        });

        //elimino el espacio de inicio y el final que puede quedar en la variable stringParentesco.
        stringParentesco = stringParentesco.trim();


      }

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaCanceresAF.push(
        {
          numero: this.tablaCanceresAF.length + 1,
          enfermedad: this.tipo_cancer.value,
          parentesco: stringParentesco,

        }

      );

      this.dataSourceTablaCanceresAF = new MatTableDataSource(this.tablaCanceresAF);

      this.tipo_cancer.setValue('');
      this.parentesco_cancer.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo cancer y parentesco ya no seran requeridos, solo en caso de que la tabla este vacia.
      this.tipo_cancer.clearValidators();
      this.tipo_cancer.updateValueAndValidity();

      this.parentesco_cancer.clearValidators();
      this.parentesco_cancer.updateValueAndValidity();

    }

  }

  eliminarCanceres(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaCanceresAF.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaCanceresAF = new MatTableDataSource(this.tablaCanceresAF);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaCanceresAF.length) {

      this.dataSourceTablaCanceresAF = null;

      //si la tabla no tiene ningun valor entonces establezco como requerido
      // los campos tipo cancer y parentesco.
      this.tipo_cancer.setValidators(Validators.required);
      this.tipo_cancer.updateValueAndValidity();

      this.parentesco_cancer.setValidators(Validators.required);
      this.parentesco_cancer.updateValueAndValidity();
    }

  }


  agregarDesnutricionesAP() {

    if (this.tipo_desnutricion_ap.value && this.tipo_desnutricion_ap.valid && this.observacion_desnutricion_ap.valid) {

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaDesnutricionesAP.push(
        {
          numero: this.tablaDesnutricionesAP.length + 1,
          enfermedad: this.tipo_desnutricion_ap.value,
          observacion: this.observacion_desnutricion_ap.value,

        }

      );

      this.dataSourceTablaDesnutricionesAP = new MatTableDataSource(this.tablaDesnutricionesAP);

      this.tipo_desnutricion_ap.setValue('');
      this.observacion_desnutricion_ap.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo desnutricion de antecedentes personales y parentesco ya no seran requeridos,
      // solo en caso de que la tabla este vacia.

      this.tipo_desnutricion_ap.clearValidators();
      this.tipo_desnutricion_ap.updateValueAndValidity();

      this.observacion_desnutricion_ap.clearValidators();
      this.observacion_desnutricion_ap.updateValueAndValidity();

    }


  }

  eliminarDesnutricionesAP(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaDesnutricionesAP.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaDesnutricionesAP = new MatTableDataSource(this.tablaDesnutricionesAP);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaDesnutricionesAP.length) {

      this.dataSourceTablaDesnutricionesAP = null;

      //si la tabla no tiene ningun valor entonces establezco como requerido
      // el campo tipo desnutricion de antecedentes personales.

      this.tipo_desnutricion_ap.setValidators(Validators.required);
      this.tipo_desnutricion_ap.updateValueAndValidity();


    }

  }

  agregarEnfermedadesMentalesAP() {

    if (this.tipo_enfermedad_mental_ap.value && this.tipo_enfermedad_mental_ap.valid && this.observacion_enfermedades_mentales_ap.valid) {

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaEnfermedadesMentalesAP.push(
        {
          numero: this.tablaEnfermedadesMentalesAP.length + 1,
          enfermedad: this.tipo_enfermedad_mental_ap.value,
          observacion: this.observacion_enfermedades_mentales_ap.value,

        }

      );

      this.dataSourceTablaEnfermedadesMentalesAP = new MatTableDataSource(this.tablaEnfermedadesMentalesAP);

      this.tipo_enfermedad_mental_ap.setValue('');
      this.observacion_enfermedades_mentales_ap.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo enfermedades mentales de antecedentes personales y parentesco ya no seran requeridos,
      // solo en caso de que la tabla este vacia.

      this.tipo_enfermedad_mental_ap.clearValidators();
      this.tipo_enfermedad_mental_ap.updateValueAndValidity();

      this.observacion_enfermedades_mentales_ap.clearValidators();
      this.observacion_enfermedades_mentales_ap.updateValueAndValidity();

    }


  }

  eliminarEnfermedadesMentalesAP(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaEnfermedadesMentalesAP.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaEnfermedadesMentalesAP = new MatTableDataSource(this.tablaEnfermedadesMentalesAP);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaEnfermedadesMentalesAP.length) {

      this.dataSourceTablaEnfermedadesMentalesAP = null;

      //si la tabla no tiene ningun valor entonces establezco como requerido
      // el campo tipo enfermedades mentales de antecedentes personales.

      this.tipo_enfermedad_mental_ap.setValidators(Validators.required);
      this.tipo_enfermedad_mental_ap.updateValueAndValidity();

    }
  }


  agregarAlergiasAP() {

    if (this.tipo_alergia_ap.value && this.tipo_alergia_ap.valid && this.observacion_alergias_ap.valid) {

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaAlergiasAP.push(
        {
          numero: this.tablaAlergiasAP.length + 1,
          enfermedad: this.tipo_alergia_ap.value,
          observacion: this.observacion_alergias_ap.value,

        }

      );

      this.dataSourceTablaAlergiasAP = new MatTableDataSource(this.tablaAlergiasAP);

      this.tipo_alergia_ap.setValue('');
      this.observacion_alergias_ap.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo alergia de antecedentes personales y parentesco ya no seran requeridos,
      // solo en caso de que la tabla este vacia.

      this.tipo_alergia_ap.clearValidators();
      this.tipo_alergia_ap.updateValueAndValidity();

      this.observacion_alergias_ap.clearValidators();
      this.observacion_alergias_ap.updateValueAndValidity();

    }


  }

  eliminarAlergiasAP(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaAlergiasAP.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaAlergiasAP = new MatTableDataSource(this.tablaAlergiasAP);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaAlergiasAP.length) {

      this.dataSourceTablaAlergiasAP = null;

      //si la tabla no tiene ningun valor entonces establezco como requerido
      // el campo tipo alergia de antecedentes personales.

      this.tipo_alergia_ap.setValidators(Validators.required);
      this.tipo_alergia_ap.updateValueAndValidity();
    }
  }

  agregarCanceresAP() {

    if (this.tipo_cancer_ap.value && this.tipo_cancer_ap.valid && this.observacion_cancer_ap.valid) {

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaCanceresAP.push(
        {
          numero: this.tablaCanceresAP.length + 1,
          enfermedad: this.tipo_cancer_ap.value,
          observacion: this.observacion_cancer_ap.value,

        }

      );

      this.dataSourceTablaCanceresAP = new MatTableDataSource(this.tablaCanceresAP);

      this.tipo_cancer_ap.setValue('');
      this.observacion_cancer_ap.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo cancer de antecedentes personales y parentesco ya no seran requeridos,
      // solo en caso de que la tabla este vacia.

      this.tipo_cancer_ap.clearValidators();
      this.tipo_cancer_ap.updateValueAndValidity();

      this.observacion_cancer_ap.clearValidators();
      this.observacion_cancer_ap.updateValueAndValidity();

    }


  }

  eliminarCanceresAP(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaCanceresAP.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaCanceresAP = new MatTableDataSource(this.tablaCanceresAP);

    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaCanceresAP.length) {

      this.dataSourceTablaCanceresAP = null;

      //si la tabla no tiene ningun valor entonces establezco como requerido
      // el campo tipo cancer de antecedentes personales.

      this.tipo_cancer_ap.setValidators(Validators.required);
      this.tipo_cancer_ap.updateValueAndValidity();
    }

  }


  agregarOtrosAP() {

    if (this.otros_ap.value.toString().trim() && this.otros_ap.valid && this.observacion_otros_ap.valid) {

      this.tablaOtrosAP.push(
        {
          numero: this.tablaOtrosAP.length + 1,
          enfermedad: this.otros_ap.value,
          observacion: this.observacion_otros_ap.value,

        }

      );

      this.dataSourceTablaOtrosAP = new MatTableDataSource(this.tablaOtrosAP);

      this.otros_ap.setValue('');
      this.observacion_otros_ap.setValue('');



    }


  }

  eliminarOtrosAP(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaOtrosAP.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaOtrosAP = new MatTableDataSource(this.tablaOtrosAP);


    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaOtrosAP.length) {
      this.dataSourceTablaOtrosAP = null;
    }

  }

  agregarOtrosHT() {

    if (this.otros_ht.value.toString().trim() && this.otros_ht.valid && this.observacion_otros_ht.valid) {

      this.tablaOtrosHT.push(
        {
          numero: this.tablaOtrosHT.length + 1,
          habito_toxicologico: this.otros_ht.value,
          observacion: this.observacion_otros_ht.value,

        }

      );

      this.dataSourceTablaOtrosHT = new MatTableDataSource(this.tablaOtrosHT);

      this.otros_ht.setValue('');
      this.observacion_otros_ht.setValue('');

    }


  }


  eliminarOtrosHT(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaOtrosHT.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaOtrosHT = new MatTableDataSource(this.tablaOtrosHT);


    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaOtrosHT.length) {
      this.dataSourceTablaOtrosHT = null;
    }

  }

  agregarHospitalariasQuirurgicas() {

    console.log('agregado');

    if (this.fecha_antecedente_hospitalario.value && this.fecha_antecedente_hospitalario.valid
      && this.tratamiento.value && this.tratamiento.valid && this.tiempo_hospitalizacion.value
      && this.tiempo_hospitalizacion.valid && this.diagnostico.value && this.diagnostico.valid) {

      //agrego a la tabla el parentesco y el tipo de desnutricion.
      this.tablaHospitalariasQuirurgicas.push(
        {
          numero: this.tablaHospitalariasQuirurgicas.length + 1,
          fecha: this.fecha_antecedente_hospitalario.value,
          tiempo_hospitalizacion: this.tiempo_hospitalizacion.value,
          diagnostico: this.diagnostico.value,
          tratamiento: this.tratamiento.value

        }

      );

      this.dataSourceTablaHospitalariasQuirurgicas = new MatTableDataSource(this.tablaHospitalariasQuirurgicas);

      this.fecha_antecedente_hospitalario.setValue('');
      this.tiempo_hospitalizacion.setValue('');
      this.diagnostico.setValue('');
      this.tratamiento.setValue('');

      this.fecha_antecedente_hospitalario.clearValidators();
      this.fecha_antecedente_hospitalario.updateValueAndValidity();

      this.tiempo_hospitalizacion.clearValidators();
      this.tiempo_hospitalizacion.updateValueAndValidity();

      this.diagnostico.clearValidators();
      this.diagnostico.updateValueAndValidity();

      this.tratamiento.clearValidators();
      this.tratamiento.updateValueAndValidity();


    }


  }

  eliminarsHopitalariasQuirurgicas(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaHospitalariasQuirurgicas.splice(index, 1);

    //refresco el datasouerce con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaHospitalariasQuirurgicas = new MatTableDataSource(this.tablaHospitalariasQuirurgicas);


    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaHospitalariasQuirurgicas.length) {

      this.dataSourceTablaHospitalariasQuirurgicas = null;

      this.fecha_antecedente_hospitalario.setValidators(Validators.required);
      this.fecha_antecedente_hospitalario.updateValueAndValidity();

      this.tiempo_hospitalizacion.setValidators(Validators.required);
      this.tiempo_hospitalizacion.updateValueAndValidity();

      this.diagnostico.setValidators(Validators.required);
      this.diagnostico.updateValueAndValidity();

      this.tratamiento.setValidators(Validators.required);
      this.tratamiento.updateValueAndValidity();
    }

  }

  AgregarTelefonosEmergencia() {
    this.otros.value.toString().trim()

    if (this.emergencia_persona.value.toString().trim() && this.emergencia_telefono.valid &&
      this.emergencia_telefono.value.toString().trim() && this.emergencia_telefono.valid) {

      var emergencia_persona: string = "";
      var emergencia_telefono: string = "";

      //establezco el valor del fomrControl a las variables para despues eliminar los espacios finales e iniciales
      emergencia_persona = this.emergencia_persona.value;
      emergencia_telefono = this.emergencia_telefono.value;


      //elimino el espacio de inicio y el final que puede quedar en la variable stringParentesco.
      emergencia_persona = emergencia_persona.trim();
      emergencia_telefono = emergencia_telefono.trim();

      //agrego a la tabla la emergencia persona y el emergencia telefono.
      this.tablaTelefonosEmergencia.push(
        {
          id_paciente: null,
          telefono_emergencia: emergencia_telefono,
          emergencia_persona: emergencia_persona
        }

      );

      this.dataSourceTablaTelefonosEmergencia = new MatTableDataSource(this.tablaTelefonosEmergencia);

      this.emergencia_persona.setValue('');
      this.emergencia_telefono.setValue('');

      //si se agrega un elemento a la tabla entonces los campos
      //tipo alergia y parentesco ya no seran requeridos, solo en caso de que la tabla este vacia.
      this.emergencia_persona.clearValidators();
      this.emergencia_persona.updateValueAndValidity();

      this.emergencia_telefono.clearValidators();
      this.emergencia_telefono.updateValueAndValidity();

    }
  }

  eliminarTelefonosEmergencia(index) {
    //borro el elemento de la tabla estableciendo el index.
    this.tablaTelefonosEmergencia.splice(index, 1);

    //refresco el datasource con los elemento que quedaron para que se resfresque
    // tambien la tabla html.
    this.dataSourceTablaTelefonosEmergencia = new MatTableDataSource(this.tablaTelefonosEmergencia);


    //si el arreglo no tiene ningun valor entonces establezco en nulo el datasource
    // para que no se muestre en el html.
    if (!this.tablaTelefonosEmergencia.length) {

      this.dataSourceTablaTelefonosEmergencia = null;

      this.emergencia_telefono.setValidators(Validators.required);
      this.emergencia_telefono.updateValueAndValidity();

      this.emergencia_persona.setValidators(Validators.required);
      this.emergencia_persona.updateValueAndValidity();

    }

  }


  enviarDatos() {
    this.loading = true;

    this.antecedentesF = [

      {
        antecedente: this.diabetes.value,
        parentesco: this.parentesco_diabetes.value
      },

      {
        antecedente: this.tb_pulmonar.value,
        parentesco: this.parentesco_tb_pulmonar.value
      },

      {
        antecedente: this.desnutricion.value,
        parentesco: this.parentesco_desnutricion.value
      },

      {
        antecedente: this.enfermedades_mentales.value,
        parentesco: this.parentesco_enfermedades_mentales.value
      },

      {
        antecedente: this.convulsiones.value,
        parentesco: this.parentesco_convulsiones.value
      },

      {
        antecedente: this.alcoholismo_sustancias_psicoactivas.value,
        parentesco: this.parentesco_alcoholismo_sustancias_psicoactivas.value
      },

      {
        antecedente: this.alergias.value,
        parentesco: this.parentesco_alergias.value
      },

      {
        antecedente: this.cancer.value,
        parentesco: this.parentesco_cancer.value
      },

      {
        antecedente: this.hipertension_arterial.value,
        parentesco: this.parentesco_hipertension_arterial.value
      },

    ];

    this.antecedentesP = [

      {
        antecedente: this.diabetes_ap.value,
        observacion: this.observacion_diabetes_ap.value
      },

      {
        antecedente: this.tb_pulmonar_ap.value,
        observacion: this.observacion_tb_pulmonar_ap.value
      },

      {
        antecedente: this.its.value,
        observacion: this.observacion_its.value
      },

      {
        antecedente: this.desnutricion_ap.value,
        observacion: this.observacion_desnutricion_ap.value
      },

      {
        antecedente: this.enfermedades_mentales_ap.value,
        observacion: this.observacion_enfermedades_mentales_ap.value
      },

      {
        antecedente: this.convulsiones_ap.value,
        observacion: this.observacion_convulsiones_ap.value
      },


      {
        antecedente: this.alergias_ap.value,
        observacion: this.observacion_alergias_ap.value
      },

      {
        antecedente: this.cancer_ap.value,
        observacion: this.observacion_cancer_ap.value
      },

      {
        antecedente: this.hospitalarias_quirurgicas.value,
      },

      {
        antecedente: this.traumaticos.value,
        observacion: this.observacion_traumaticos.value
      },

    ];

    this.habitosT = [
      {
        habito_toxicologico: this.alcohol.value,
        observacion: this.observacion_alcohol.value
      },

      {
        habito_toxicologico: this.tabaquismo.value,
        observacion: this.observacion_tabaquismo.value
      },

      {
        habito_toxicologico: this.marihuana.value,
        observacion: this.observacion_marihuana.value
      },

      {
        habito_toxicologico: this.cocaina.value,
        observacion: this.observacion_cocaina.value
      },

    ];


    
    if (this.esAlumno == true) {


      if (this.formulario_datos_generales.valid) {

        // guardar datos del formulario en paciente y enviarlo a la api
        this.paciente.id_paciente = this.datosScraping.id_login;
        // introduzco el nombre estableciendo cada primer letra en mayuscula.
        this.paciente.nombre_completo = this.nombre_completo.value.replace(/\b\w/g, l => l.toUpperCase());
        this.paciente.numero_cuenta = this.numero_cuenta.value;
        this.paciente.numero_identidad = this.numero_identidad.value;
        this.paciente.imagen = this.datosScraping.imagen;
        this.paciente.lugar_procedencia = this.lugar_procedencia.value;
        this.paciente.direccion = this.direccion.value;
        this.paciente.carrera = this.carrera.value;
        this.paciente.fecha_nacimiento = this.fecha_nacimiento.value;
        this.paciente.sexo = this.sexo.value;
        this.paciente.estado_civil = this.estado_civil.value;
        this.paciente.seguro_medico = this.seguro_medico.value;
        this.paciente.telefono = this.numero_telefono.value;
        this.paciente.categoria = this.categoria.value;

        this.formularioService.guardarDatosGenerales(this.paciente).subscribe((data) => {

          var telefono_paciente: any = {
            'id_paciente': this.paciente.id_paciente,
            'telefono': this.paciente.telefono
          }

          this.formularioService.enviarTelefonoPaciente(telefono_paciente).subscribe((result) => {


          }, (error) => {

            console.log(error);

          });

          this.obtener();

        }, (error) => {

          console.log(error);

          this.error = true;

          alert('ocurrion un error');
        });


        if (this.tablaTelefonosEmergencia.length) {

          this.tablaTelefonosEmergencia.forEach(telefono_emergencia => {

            this.telefono_emergencia.id_paciente = this.paciente.id_paciente;
            this.telefono_emergencia.emergencia_persona = telefono_emergencia.emergencia_persona;
            this.telefono_emergencia.telefono_emergencia = telefono_emergencia.telefono_emergencia;

            this.formularioService.enviarTelefonoEmergencia(this.telefono_emergencia).subscribe((data) => {

            }, (error) => {

              console.log(error);

            });
          });
        }
      }

    } else {

      if (this.formulario_datos_generales.valid) {

        // guardar datos del formulario en paciente y enviarlo a la api
        this.paciente.id_paciente = this.datosScraping.id_login;
        this.paciente.nombre_completo = this.nombre_completo.value;
        if (this.esAlumnoAdmon == true) {
          this.paciente.numero_cuenta = this.numero_cuenta.value;
        } else {
          this.paciente.numero_cuenta = null;
        }

        this.paciente.numero_identidad = this.numero_identidad.value;
        this.paciente.lugar_procedencia = this.lugar_procedencia.value;
        this.paciente.direccion = this.direccion.value;
        this.paciente.carrera = this.carrera.value;
        this.paciente.fecha_nacimiento = this.fecha_nacimiento.value;
        this.paciente.sexo = this.sexo.value;
        this.paciente.estado_civil = this.estado_civil.value;
        this.paciente.seguro_medico = this.seguro_medico.value;
        this.paciente.telefono = this.numero_telefono.value;
        this.paciente.categoria = this.categoria.value;


        this.formularioService.guardarDatosGenerales(this.paciente).subscribe((data) => {

          var telefono_paciente: any = {
            'id_paciente': this.paciente.id_paciente,
            'telefono': this.paciente.telefono
          }

          this.formularioService.enviarTelefonoPaciente(telefono_paciente).subscribe((result) => {


          }, (error) => {

            console.log(error);

          });

          this.obtener();

        }, (error) => {

          console.log(error);

          this.error = true;

          alert('ocurrion un error');

        });


        if (this.telefonos_emergencia.length) {

          this.telefonos_emergencia.forEach(telefono_emergencia => {

            this.telefono_emergencia.id_paciente = this.paciente.id_paciente;
            this.telefono_emergencia.telefono_emergencia = telefono_emergencia;

            this.formularioService.enviarTelefonoEmergencia(this.telefono_emergencia).subscribe((data) => {

            }, (error) => {

              console.log(error);

            });
          });
        }

      }
    }


    if (this.formulario_antecedentes_familiares.valid) {

      var parentescos: any;
      var stringParentesco: string[];
      var NumeroParentesco: number;
      var id_antecedente: number;

      for (let index = 0; index < this.antecedentesF.length; index++) {
        const element = this.antecedentesF[index];

        // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
        if (element.antecedente != 0) {

          this.paciente_antecedente_familiar.id_paciente = this.datosScraping.id_login;


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

                    //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                    this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                      console.log('se enviaron perron los nuevos antecedentes');
                    }, (error) => {
                      console.log(error);
                    });

                  });

                });
              }

            }
          } else if (element.antecedente == 10) {

            if (this.tablaEnfermedadesMentalesAF.length) {

              for (let index = 0; index < this.tablaEnfermedadesMentalesAF.length; index++) {
                const element = this.tablaEnfermedadesMentalesAF[index];

                // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
                // de la interfaz de enfermedad.
                this.enfermedad.enfermedad = element.enfermedad;
                this.enfermedad.id_grupo_enfermedad = 2;


                this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {


                  // asigno el id de la enfermedad que me devuelve la funcion de mysql en el id_enfermedad
                  // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_familiares.
                  this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;

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

                    //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                    this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                      console.log('se enviaron perron los nuevos antecedentes');
                    }, (error) => {
                      console.log(error);
                    });

                  });

                });
              }

            }
          } else if (element.antecedente == 11) {

            if (this.tablaAlergiasAF.length) {

              for (let index = 0; index < this.tablaAlergiasAF.length; index++) {
                const element = this.tablaAlergiasAF[index];

                // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
                // de la interfaz de enfermedad.
                this.enfermedad.enfermedad = element.enfermedad;
                this.enfermedad.id_grupo_enfermedad = 3;


                this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {


                  // asigno el id de la enfermedad que me devuelve la funcion de mysql en el id_enfermedad
                  // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_familiares.
                  this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;

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

                    //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                    this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                      console.log('se enviaron perron los nuevos antecedentes');
                    }, (error) => {
                      console.log(error);
                    });

                  });

                });
              }

            }
          } else if (element.antecedente == 12) {

            if (this.tablaCanceresAF.length) {

              for (let index = 0; index < this.tablaCanceresAF.length; index++) {
                const element = this.tablaCanceresAF[index];

                // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
                // de la interfaz de enfermedad.
                this.enfermedad.enfermedad = element.enfermedad;
                this.enfermedad.id_grupo_enfermedad = 4;


                this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {


                  // asigno el id de la enfermedad que me devuelve la funcion de mysql en el id_enfermedad
                  // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_familiares.
                  this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;

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

                    //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                    this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                      console.log('se enviaron perron los nuevos antecedentes');
                    }, (error) => {
                      console.log(error);
                    });

                  });

                });
              }

            }
          } else {

            //guardo el valor del controlador del parentesco y lo guardo en una variable de tipo any
            // ahora el select como es multiple me devuelve un arreglo
            this.paciente_antecedente_familiar.id_enfermedad = element.antecedente;
            parentescos = element.parentesco;


            // por cada vuelta que de el ciclo se hará un registro en la tabla pacientes_antecedentes_familiares,
            // siendo cada registro un antecedente de los antecedentes familiares y su parentesco
            // si el antecedente tiene mas de un 1 parentesco entonces se insertara varias veces el mismo antecedente
            // con los diferentes parentesco.
            parentescos.forEach(parentesco => {

              //establezco el valor del arreglo en el atributo id_parentesco de la interfaz paciente_antecedente_familiar.
              this.paciente_antecedente_familiar.id_parentesco = parentesco;

              this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                console.log('se envio perron la prueba');
              }, (error) => {
                console.log(error);
              });

            });
          }
        }
      }



      //establezco primero el id del paciente por que si no no se guarda.
      this.paciente_antecedente_familiar.id_paciente = this.datosScraping.id_login;


      if (this.tablaOtrosAF.length) {

        for (let index = 0; index < this.tablaOtrosAF.length; index++) {
          const element = this.tablaOtrosAF[index];

          // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
          // de la interfaz de antecedente.
          this.enfermedad.enfermedad = element.enfermedad;
          this.enfermedad.id_grupo_enfermedad = 5;

          console.log('enfermedad: ' + element.enfermedad);

          // guardo cada uno de los antecedentes de la tabla en el html a la tabla antecedentes de la base de datos
          // cuando se va insertar un antecedente se hace por medio de una funcion en mysql que inserta y a la vez 
          // devuelve el id de el antecedente, si el antecedente ya existe en la base de datos entonces solo devuelve 
          // el id de ese antecedemte.
          this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {

            // asigno el id del antecedente que me devuelve la funcion de mysql en el id_antecedente
            // de la interfaz de antecedente que se va enviar a paciente_antecedentes_familiares.
            this.paciente_antecedente_familiar.id_enfermedad = data[0].id_enfermedad;

            console.log("ultimo antecedente: " + data[0].id_enfermedad);
            // console.log(data);              


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

              //envio el antecedente familiar del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
              this.formularioService.enviarPacienteAntecedenteFamiliar(this.paciente_antecedente_familiar).subscribe((data) => {
                console.log('se enviaron perron los nuevos antecedentes');
              }, (error) => {
                console.log(error);
              });

            });

          }, (error) => {
            console.log(error);

          });


        }

      }

    }

    if (this.formulario_antecedentes_personales.valid) {


      for (let index = 0; index < this.antecedentesP.length; index++) {
        const element = this.antecedentesP[index];

        // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
        if (element.antecedente != 0) {

          this.paciente_antecedente_personal.id_paciente = this.datosScraping.id_login;

          if (element.antecedente == 7) {

            if (this.tablaHospitalariasQuirurgicas.length) {

              for (let index = 0; index < this.tablaHospitalariasQuirurgicas.length; index++) {
                const element = this.tablaHospitalariasQuirurgicas[index];

                this.paciente_hospitalaria_quirurgica.id_paciente = this.datosScraping.id_login;
                this.paciente_hospitalaria_quirurgica.fecha = element.fecha;
                this.paciente_hospitalaria_quirurgica.tiempo_hospitalizacion = element.tiempo_hospitalizacion;
                this.paciente_hospitalaria_quirurgica.diagnostico = element.diagnostico;
                this.paciente_hospitalaria_quirurgica.tratamiento = element.tratamiento;

                this.formularioService.enviarPacienteHospitalariaQuirurgica(this.paciente_hospitalaria_quirurgica).subscribe(
                  (data) => {
                    console.log('perron');
                  }
                );



              }

            }

          } else if (element.antecedente == 9) {

            if (this.tablaDesnutricionesAP.length) {

              for (let index = 0; index < this.tablaDesnutricionesAP.length; index++) {
                const element = this.tablaDesnutricionesAP[index];

                // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
                // de la interfaz de enfermedad.
                this.enfermedad.enfermedad = element.enfermedad;
                this.enfermedad.id_grupo_enfermedad = 1;


                this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {


                  // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_enfermedad
                  // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_personales.
                  this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

                  console.log("ultimo antecedente: " + data[0].id_enfermedad);

                  // establezco el valor al atributo observacion de la interfaz paciente_antecedente_personal
                  // para ser enviado a la base de datos.
                  this.paciente_antecedente_personal.observacion = element.observacion;

                  //envio el antecedente personal del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                  this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
                    console.log('se enviaron perron los nuevos antecedentes personales');

                  }, (error) => {
                    console.log(error);

                  });



                });

              }

            }

          } else if (element.antecedente == 10) {

            if (this.tablaEnfermedadesMentalesAP.length) {

              for (let index = 0; index < this.tablaEnfermedadesMentalesAP.length; index++) {
                const element = this.tablaEnfermedadesMentalesAP[index];

                // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
                // de la interfaz de enfermedad.
                this.enfermedad.enfermedad = element.enfermedad;
                this.enfermedad.id_grupo_enfermedad = 2;


                this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {


                  // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_enfermedad
                  // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_personales.
                  this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

                  console.log("ultimo antecedente: " + data[0].id_enfermedad);

                  // establezco el valor al atributo observacion de la interfaz paciente_antecedente_personal
                  // para ser enviado a la base de datos.
                  this.paciente_antecedente_personal.observacion = element.observacion;

                  //envio el antecedente personal del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                  this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
                    console.log('se enviaron perron los nuevos antecedentes personales');

                  }, (error) => {
                    console.log(error);

                  });



                });

              }

            }

          } else if (element.antecedente == 11) {

            if (this.tablaAlergiasAP.length) {

              for (let index = 0; index < this.tablaAlergiasAP.length; index++) {
                const element = this.tablaAlergiasAP[index];

                // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
                // de la interfaz de enfermedad.
                this.enfermedad.enfermedad = element.enfermedad;
                this.enfermedad.id_grupo_enfermedad = 3;


                this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {


                  // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_enfermedad
                  // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_personales.
                  this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

                  console.log("ultimo antecedente: " + data[0].id_enfermedad);

                  // establezco el valor al atributo observacion de la interfaz paciente_antecedente_personal
                  // para ser enviado a la base de datos.
                  this.paciente_antecedente_personal.observacion = element.observacion;

                  //envio el antecedente personal del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                  this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
                    console.log('se enviaron perron los nuevos antecedentes personales');

                  }, (error) => {
                    console.log(error);

                  });



                });

              }

            }

          } else if (element.antecedente == 12) {

            if (this.tablaCanceresAP.length) {

              for (let index = 0; index < this.tablaCanceresAP.length; index++) {
                const element = this.tablaCanceresAP[index];

                // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
                // de la interfaz de enfermedad.
                this.enfermedad.enfermedad = element.enfermedad;
                this.enfermedad.id_grupo_enfermedad = 4;


                this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {

                  // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_enfermedad
                  // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_personales.
                  this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

                  console.log("ultimo antecedente: " + data[0].id_enfermedad);

                  // establezco el valor al atributo observacion de la interfaz paciente_antecedente_personal
                  // para ser enviado a la base de datos.
                  this.paciente_antecedente_personal.observacion = element.observacion;

                  //envio el antecedente personal del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
                  this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
                    console.log('se enviaron perron los nuevos antecedentes personales');

                  }, (error) => {
                    console.log(error);

                  });



                });

              }

            }

          } else {

            // guardo el id de la enfermedad que tiene el fomcontrol en el arreglo.
            this.paciente_antecedente_personal.id_enfermedad = element.antecedente;
            this.paciente_antecedente_personal.observacion = element.observacion;



            this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
              console.log('se envio perron el antecedente personal');
            }, (error) => {
              console.log(error);
            });

          }

        }

      }


      //establezco primero el id del paciente por que si no no se guarda.
      this.paciente_antecedente_personal.id_paciente = this.datosScraping.id_login;

      if (this.tablaOtrosAP.length) {

        for (let index = 0; index < this.tablaOtrosAP.length; index++) {
          const element = this.tablaOtrosAP[index];

          // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
          // de la interfaz de enfermedad.
          this.enfermedad.enfermedad = element.enfermedad;
          this.enfermedad.id_grupo_enfermedad = 5;


          this.formularioService.enviarEnfermedad(this.enfermedad).subscribe((data) => {

            // asigno el id del tipo de enfermedad que me devuelve la funcion de mysql en el id_enfermedad
            // de la interfaz de enfermedad que se va enviar a paciente_antecedentes_personales.
            this.paciente_antecedente_personal.id_enfermedad = data[0].id_enfermedad;

            console.log("ultimo antecedente: " + data[0].id_enfermedad);

            // establezco el valor al atributo observacion de la interfaz paciente_antecedente_personal
            // para ser enviado a la base de datos.
            this.paciente_antecedente_personal.observacion = element.observacion;

            //envio el antecedente personal del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
            this.formularioService.enviarPacienteAntecedentePersonal(this.paciente_antecedente_personal).subscribe((data) => {
              console.log('se enviaron perron los nuevos antecedentes personales');

            }, (error) => {
              console.log(error);

            });



          });


        }

      }

    }

    if (this.formulario_habito_toxicologico_personal.valid) {

      for (let index = 0; index < this.habitosT.length; index++) {
        const element = this.habitosT[index];

        // si el valor que recibe del radioButton es diferente de cero entonces ingresara los datos a la base de datos
        if (element.habito_toxicologico != 0) {


          this.paciente_habito_toxicologico.id_paciente = this.datosScraping.id_login;
          this.paciente_habito_toxicologico.id_habito_toxicologico = element.habito_toxicologico;
          this.paciente_habito_toxicologico.observacion = element.observacion;

          this.formularioService.enviarPacienteHabitoToxicologico(this.paciente_habito_toxicologico).subscribe((data) => {
            console.log('todo cheke con los pacientes_habitos_toxicologico');
          }, (error) => {
            console.log(error);
          });


        }

      }

      //establezco primero el id del paciente por que si no no se guarda.
      this.paciente_habito_toxicologico.id_paciente = this.datosScraping.id_login;

      if (this.tablaOtrosHT.length) {

        for (let index = 0; index < this.tablaOtrosHT.length; index++) {
          const element = this.tablaOtrosHT[index];

          // le establezco el valor de la enfermedad que se guarda en la tabla al atributo enfermedad
          // de la interfaz de enfermedad.
          this.habito_toxicologico.habito_toxicologico = element.habito_toxicologico;


          this.formularioService.enviarHabitoToxicologico(this.habito_toxicologico).subscribe((data) => {

            // asigno el id del habito toxicologico que me devuelve la funcion de mysql en el id_habito_toxicologico
            // de la interfaz de habito_toxicologico que se va enviar a paciente_habito_toxicologico.
            this.paciente_habito_toxicologico.id_habito_toxicologico = data[0].id_habito_toxicologico;

            console.log("ultimo habito: " + data[0].id_habito_toxicologico);

            // establezco el valor al atributo observacion de la interfaz paciente_habito_toxicologico
            // para ser enviado a la base de datos.
            this.paciente_habito_toxicologico.observacion = element.observacion;

            //envio el habito toxicologico del paciente por cada vuelta del ciclo o por cada fila de la tablaOtros.
            this.formularioService.enviarPacienteHabitoToxicologico(this.paciente_habito_toxicologico).subscribe((data) => {
              console.log('se enviaron perron los nuevos habitos toxicologicos');

            }, (error) => {
              console.log(error);

            });



          });


        }

      }

    }

    if (this.formulario_actividad_sexual.valid) {
      // guardar datos del formulario en actividad_sexual y enviarlo a la api
      this.actividad_sexual.actividad_sexual = this.actividad_sexuall.value;
      this.actividad_sexual.edad_inicio_sexual = this.edad_inicio_sexual.value;
      this.actividad_sexual.numero_parejas_sexuales = this.numero_parejas_sexuales.value;
      this.actividad_sexual.practicas_sexuales_riesgo = this.practicas_sexuales_riesgo.value;
      this.actividad_sexual.id_paciente = this.datosScraping.id_login;

      this.formularioService.guardarActividadSexual(this.actividad_sexual).subscribe((data) => {
        console.log(data);
      }, (error) => {
        this.error = true;
        console.log(error);
        alert('ocurrion un error');
      });

    }


    if (this.ocultar1 == false) {


      if (this.formulario_antecedente_obstetrico.valid) {
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

        this.formularioService.guardarAntecedentesObstetricos(this.antecedente_obstetrico).subscribe((data) => {
          console.log(data);
        }, (error) => {
          this.error = true;
          console.log(error);
          alert('ocurrion un error');
        });
      }


      if (this.formulario_planificacion_familiar.valid) {
        // guardar datos del formulario en planificacion_familiar y enviarlo a la api
        this.planificacion_familiar.planificacion_familiar = this.planificacion_familiarr.value;
        this.planificacion_familiar.metodo_planificacion = this.metodo_planificacion.value;
        this.planificacion_familiar.observacion_planificacion = this.observacion_planificacion.value;
        this.planificacion_familiar.id_paciente = this.datosScraping.id_login;

        this.formularioService.guardarPlanificacionesFamiliares(this.planificacion_familiar).subscribe((data) => {
          console.log(data);
        }, (error) => {
          this.error = true;
          console.log(error);
          alert('ocurrion un error');
        });

      } else {
        this.error = true;
      }
    }


    if (this.formulario_antecedente_ginecologico.valid) {

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

      this.formularioService.guardarAntecedentesGinecologicos(this.antecedente_ginecologico).subscribe((data) => {
        console.log(data);
      }, (error) => {
        this.error = true;
        console.log(error);
        alert('ocurrion un error');
      });

    }

  };

  obtener() {
    //Obtencion de Paciente recien registrado
    this.formularioService.getUltimoID().subscribe((data) => {
      this.resultado = data;
      console.log(this.resultado);
      if (this.resultado != null) {
        if (this.resultado[0].ultimoId != null) {
          this.loading = false;
          this.loginService.idpaciente = this.resultado[0].ultimoId;
          this.openDialog();

        }
      }
    }, (error) => {
      console.log(error);
    });

  }


  openDialog() {
    index: Number;
    const index = this.paciente.id_paciente;
    const dialogRef = this.dialog.open(cambiocontraDialog, {
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });
  }

  convertir(edad) {
    var nuevaedad = edad.toString().substr(0, 10);
    return nuevaedad;
  }



  //obtener los campos del formGroup: formulario_datos_generales
  get nombre_completo() { return this.formulario_datos_generales.get('nombre_completo') };
  get segundo_apellido() { return this.formulario_datos_generales.get('segundo_apellido') };
  get primer_nombre() { return this.formulario_datos_generales.get('primer_nombre') };
  get segundo_nombre() { return this.formulario_datos_generales.get('segundo_nombre') };
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
  get emergencia_telefono() { return this.formulario_datos_generales.get('emergencia_telefono') };
  get emergencia_persona() { return this.formulario_datos_generales.get('emergencia_persona') };
  get categoria() { return this.formulario_datos_generales.get('categoria') };


  //obtener los campos del formGroup: formulario_antecedentes_familiares
  get diabetes() { return this.formulario_antecedentes_familiares.get('diabetes') };
  get parentesco_diabetes() { return this.formulario_antecedentes_familiares.get('parentesco_diabetes') };
  get tb_pulmonar() { return this.formulario_antecedentes_familiares.get('tb_pulmonar') };
  get parentesco_tb_pulmonar() { return this.formulario_antecedentes_familiares.get('parentesco_tb_pulmonar') };
  get desnutricion() { return this.formulario_antecedentes_familiares.get('desnutricion') };
  get parentesco_desnutricion() { return this.formulario_antecedentes_familiares.get('parentesco_desnutricion') };
  get tipo_desnutricion() { return this.formulario_antecedentes_familiares.get('tipo_desnutricion') };
  get enfermedades_mentales() { return this.formulario_antecedentes_familiares.get('enfermedades_mentales') };
  get parentesco_enfermedades_mentales() { return this.formulario_antecedentes_familiares.get('parentesco_enfermedades_mentales') };
  get tipo_enfermedad_mental() { return this.formulario_antecedentes_familiares.get('tipo_enfermedad_mental') };
  get convulsiones() { return this.formulario_antecedentes_familiares.get('convulsiones') };
  get parentesco_convulsiones() { return this.formulario_antecedentes_familiares.get('parentesco_convulsiones') };
  get alcoholismo_sustancias_psicoactivas() { return this.formulario_antecedentes_familiares.get('alcoholismo_sustancias_psicoactivas') };
  get parentesco_alcoholismo_sustancias_psicoactivas() { return this.formulario_antecedentes_familiares.get('parentesco_alcoholismo_sustancias_psicoactivas') };
  get alergias() { return this.formulario_antecedentes_familiares.get('alergias') };
  get parentesco_alergias() { return this.formulario_antecedentes_familiares.get('parentesco_alergias') };
  get tipo_alergia() { return this.formulario_antecedentes_familiares.get('tipo_alergia') };
  get cancer() { return this.formulario_antecedentes_familiares.get('cancer') };
  get parentesco_cancer() { return this.formulario_antecedentes_familiares.get('parentesco_cancer') };
  get tipo_cancer() { return this.formulario_antecedentes_familiares.get('tipo_cancer') };
  get hipertension_arterial() { return this.formulario_antecedentes_familiares.get('hipertension_arterial') };
  get parentesco_hipertension_arterial() { return this.formulario_antecedentes_familiares.get('parentesco_hipertension_arterial') };
  get otros() { return this.formulario_antecedentes_familiares.get('otros') };
  get parentesco_otros() { return this.formulario_antecedentes_familiares.get('parentesco_otros') };


  //obtener los campos del formGroup: formulario_antecedentes_personales
  get diabetes_ap() { return this.formulario_antecedentes_personales.get('diabetes') };
  get observacion_diabetes_ap() { return this.formulario_antecedentes_personales.get('observacion_diabetes') };
  get tb_pulmonar_ap() { return this.formulario_antecedentes_personales.get('tb_pulmonar') };
  get observacion_tb_pulmonar_ap() { return this.formulario_antecedentes_personales.get('observacion_tb_pulmonar') };
  get its() { return this.formulario_antecedentes_personales.get('its') };
  get observacion_its() { return this.formulario_antecedentes_personales.get('observacion_its') };
  get desnutricion_ap() { return this.formulario_antecedentes_personales.get('desnutricion') };
  get observacion_desnutricion_ap() { return this.formulario_antecedentes_personales.get('observacion_desnutricion') };
  get tipo_desnutricion_ap() { return this.formulario_antecedentes_personales.get('tipo_desnutricion') };
  get enfermedades_mentales_ap() { return this.formulario_antecedentes_personales.get('enfermedades_mentales') };
  get observacion_enfermedades_mentales_ap() { return this.formulario_antecedentes_personales.get('observacion_enfermedades_mentales') };
  get tipo_enfermedad_mental_ap() { return this.formulario_antecedentes_personales.get('tipo_enfermedad_mental') };
  get convulsiones_ap() { return this.formulario_antecedentes_personales.get('convulsiones') };
  get observacion_convulsiones_ap() { return this.formulario_antecedentes_personales.get('observacion_convulsiones') };
  get alergias_ap() { return this.formulario_antecedentes_personales.get('alergias') };
  get observacion_alergias_ap() { return this.formulario_antecedentes_personales.get('observacion_alergias') };
  get tipo_alergia_ap() { return this.formulario_antecedentes_personales.get('tipo_alergia') };
  get cancer_ap() { return this.formulario_antecedentes_personales.get('cancer') };
  get observacion_cancer_ap() { return this.formulario_antecedentes_personales.get('observacion_cancer') };
  get tipo_cancer_ap() { return this.formulario_antecedentes_personales.get('tipo_cancer') };
  get hospitalarias_quirurgicas() { return this.formulario_antecedentes_personales.get('hospitalarias_quirurgicas') };
  get fecha_antecedente_hospitalario() { return this.formulario_antecedentes_personales.get('fecha_antecedente_hospitalario') };
  get tratamiento() { return this.formulario_antecedentes_personales.get('tratamiento') };
  get diagnostico() { return this.formulario_antecedentes_personales.get('diagnostico') };
  get tiempo_hospitalizacion() { return this.formulario_antecedentes_personales.get('tiempo_hospitalizacion') };
  get traumaticos() { return this.formulario_antecedentes_personales.get('traumaticos') };
  get observacion_traumaticos() { return this.formulario_antecedentes_personales.get('observacion_traumaticos') };
  get otros_ap() { return this.formulario_antecedentes_personales.get('otros') };
  get observacion_otros_ap() { return this.formulario_antecedentes_personales.get('observacion_otros') };

  //obtener los campos del formGroup: formulario_habito_toxicologico_personal
  get alcohol() { return this.formulario_habito_toxicologico_personal.get('alcohol') };
  get observacion_alcohol() { return this.formulario_habito_toxicologico_personal.get('observacion_alcohol') };
  get tabaquismo() { return this.formulario_habito_toxicologico_personal.get('tabaquismo') };
  get observacion_tabaquismo() { return this.formulario_habito_toxicologico_personal.get('observacion_tabaquismo') };
  get marihuana() { return this.formulario_habito_toxicologico_personal.get('marihuana') };
  get observacion_marihuana() { return this.formulario_habito_toxicologico_personal.get('observacion_marihuana') };
  get cocaina() { return this.formulario_habito_toxicologico_personal.get('cocaina') };
  get observacion_cocaina() { return this.formulario_habito_toxicologico_personal.get('observacion_cocaina') };
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



}


