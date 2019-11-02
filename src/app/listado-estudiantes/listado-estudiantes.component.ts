import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { Router } from '@angular/router';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { asLiteral } from '@angular/compiler/src/render3/view/util';


export class MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-listado-estudiantes',
  templateUrl: './listado-estudiantes.component.html',
  styleUrls: ['./listado-estudiantes.component.css']
})


export class ListadoEstudiantesComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  
  events: string[] = [];
  opened: boolean;
  paciente1: Paciente;

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

  

  constructor(private form: FormularioService, private router: Router, private mensaje: MatSnackBar) { 
  }


  ngOnInit() {
  }


  guardarDatos(){
    this.sidenav.close();

    // if(this.formulario_datos_faltantes.valid){
      

    //   this.form.actualizarPaciente(this.paciente1).subscribe((data)=>{
    //     this.mensaje.open('Datos guardados', '', {duration:2000});
    //   }, (error)=>{
    //     console.log(error);
    //     this.mensaje.open('there was an error!', '', {duration:2000});
    //     this.sidenav.close;
    //   });


    // }
  }

  get peso(){return this.formulario_datos_faltantes.get('peso')};
  get talla(){return this.formulario_datos_faltantes.get('talla')};
  get imc(){return this.formulario_datos_faltantes.get('imc')};
  get temperatura(){return this.formulario_datos_faltantes.get('temperatura')};
  get presion(){return this.formulario_datos_faltantes.get('presion')};
  get pulso(){return this.formulario_datos_faltantes.get('pulso')};

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

