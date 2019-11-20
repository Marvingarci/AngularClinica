import { Component, OnInit , Input} from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { ActivatedRoute, Route } from '@angular/router';
import { AppComponent } from "../app.component";
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { LoginComponent } from '../login/login.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PacienteComponent } from '../paciente/paciente.component';

export interface select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dato-paciente',
  templateUrl: './dato-paciente.component.html',
  styleUrls: ['./dato-paciente.component.css']
})
export class DatoPacienteComponent implements OnInit {

  

  formulario_datos_generales = new FormGroup({
    
      
    nombre_completo: new FormControl('', [Validators.required,  Validators.pattern(/^[a-zA-z\s]{0,100}$/)]),
    // segundo_apellido: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    // primer_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    // segundo_nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    numero_cuenta: new FormControl('', [ Validators.required, Validators.pattern(/^[2][0-9]{10}$/)]), 
    // "^$" delimita el inicio y el final de lo que quiere que se cumpla de la expresion
    // "/ /" indica el inicio y el final de la expresion regular
    // "{10}" indica le numero de digitos de lo que lo antecede
    numero_identidad: new FormControl('', [Validators.required,Validators.pattern(/^\d{4}\d{4}\d{5}$/)]),
     // "\d" es lo mismo "[0-9]"
    // lugar_procedencia: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z\s]{5,30}$/)]),
    // direccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    carrera: new FormControl('', [Validators.required]),
    // fecha_nacimiento: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    // categoria: new FormControl('',[]),
    // estado_civil: new FormControl('', Validators.required),
    // seguro_medico: new FormControl('', Validators.required),
    numero_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
    // emergencia_telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)])


  });

  paciente: Paciente = {
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
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    categoria: null,
  
}


  


  id: any;
  noImg: boolean = true;
  pacientes: Paciente[];
  

  //variable que identifica si un input es editable
  readonly: boolean = true;
  
  
  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute, 
              principal: AppComponent, public dialog: MatDialog, login: LoginService, private formBuilder: FormBuilder, private mensaje: MatSnackBar) 

              
  {    

    this.dialog.closeAll;

    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){

      this.formularioService.obtenerPaciente(this.id).subscribe((data : Paciente)=>{
      this.paciente = data;
      console.log(this.paciente);

      //establesco el valor a los formcontrol para que se visualizen en los respectivos inputs
      this.nombre_completo.setValue(this.paciente.nombre_completo);
      this.numero_identidad.setValue(this.paciente.numero_identidad);
      this.numero_cuenta.setValue(this.paciente.numero_cuenta);
      this.carrera.setValue(this.paciente.carrera);
      this.sexo.setValue(this.paciente.sexo);
      this.numero_telefono.setValue(this.paciente.numero_telefono);

      console.log(this.paciente.contrasenia);
      this.formularioService.idActualizar=this.paciente.id_paciente;
      

      
      // valido si el paciente tiene imagen, la variable noImg por defecto esta en true
      //si el paciente tiene imagen entonces esta variable cambiara a false
      if(this.paciente.imagen != null){
        this.noImg = false;
      }


      },(error)=>{
        console.log(error)
      });
    }
   
    principal.esconder();



   
    
  }

  

  getdato(){
    this.formularioService.obtenerPacientes().subscribe((data: Paciente[]) =>{
      this.pacientes = data;
    },(error)=>{
      console.log(error);
      this.mensaje.open('Ocurrio un error', '', {duration:2000});
    });
    
  }


  ngOnInit() {
  }

  editar(){
    this.readonly = !this.readonly;

    // this.nombre_completo.setValue('hola');
  }

  actualizar(){
    if(this.readonly === true){
    
      if(this.formulario_datos_generales.valid){

        this.paciente.nombre_completo = this.nombre_completo.value;
        this.paciente.numero_cuenta = this.numero_cuenta.value;
        this.paciente.numero_identidad = this.numero_identidad.value;
        this.paciente.carrera = this.carrera.value;
        this.paciente.sexo = this.sexo.value;
        this.paciente.numero_telefono = this.numero_telefono.value;

        this.formularioService.actualizarPaciente(this.paciente).subscribe((data)=>{
          console.log(data);
          alert('estamos en vivo');
        }, (error)=>{
          console.log(error);
          alert('se chorrio');
        });
      } 
    }else{
    }
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
  get categoria(){return this.formulario_datos_generales.get('categoria')};

}

/////////de aqui para abajo///////////////////////////////////

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./dialogo.css']


})
export class DialogContentExampleDialog {
  hide = true;
  resultado:any;

   paciente1: Paciente = {
    id_paciente: null,
    numero_paciente: null,
    contrasenia: null,
    nombre_completo: null,
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
    emergencia_persona: null,
    emergencia_telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    categoria:null
  }
  id:any;
  Listo:boolean = false;
  constructor( private formularioService: FormularioService,private activatedRoute: ActivatedRoute,
   public login: LoginService, private router: Router, private mensaje: MatSnackBar ){
    this.paciente1.id_paciente = this.formularioService.idActualizar;
    console.log(this.paciente1.id_paciente);
    ///////
    this.formularioService.getUltimoID().subscribe((data)=>{
      this.resultado = data;
      console.log(this.resultado);
      if(this.resultado!=null){
        if(this.resultado[0].ultimoId!=null){
          this.paciente1.id_paciente=this.resultado[0].ultimoId;
          
      }
       }

    }, (error)=>{
      console.log(error);
    }); 

  
  }
  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }
  

  Nueva = new FormGroup({

    nuevaContra: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    nuevaContraRep: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)])
});

//EVENTO CUANDO SE DA ENTER
onKeydown(event) {
  if (event.key === "Enter") {
  this.hide = false;

  this.formularioService.getUltimoID().subscribe((data)=>{
    this.resultado = data;
    console.log(this.resultado);
    if(this.resultado!=null){
      if(this.resultado[0].ultimoId!=null){
        this.paciente1.id_paciente=this.resultado[0].ultimoId;
        console.log(this.paciente1.id_paciente);    
        
    }
     }
  }, (error)=>{
    console.log(error);
  }); 

  
  if(this.Nueva.valid){
    // guardar datos del formulario en paciente y enviarlo a la api
    this.paciente1.contrasenia = this.Nueva.get('nuevaContra').value;
    if(this.paciente1.contrasenia==this.Nueva.get('nuevaContraRep').value ){
      this.formularioService.actualizarPaciente(this.paciente1).subscribe((data)=>{
        this.router.navigate(['datoPaciente/'+this.paciente1.id_paciente]);
        this.showError('Contraseña Guardada'); 
        this.Listo = true;
      }, (error)=>{
        console.log(error);
        this.showError('Existe un error'); 
      });
    }else{
      this.showError('La contraseña no coincide'); 
      
    }
  }

  }
}

//EVENTO BOTON GUARDAR
guardar(){
  
  this.formularioService.getUltimoID().subscribe((data)=>{
    this.resultado = data;
    console.log(this.resultado);
    if(this.resultado!=null){
      if(this.resultado[0].ultimoId!=null){
        this.paciente1.id_paciente=this.resultado[0].ultimoId;
        console.log(this.paciente1.id_paciente);    
        
    }
     }
  }, (error)=>{
    console.log(error);
  }); 

  
  if(this.Nueva.valid){
    // guardar datos del formulario en paciente y enviarlo a la api
    this.paciente1.contrasenia = this.Nueva.get('nuevaContra').value;
    if(this.paciente1.contrasenia==this.Nueva.get('nuevaContraRep').value ){
      this.formularioService.actualizarPaciente(this.paciente1).subscribe((data)=>{
        this.router.navigate(['datoPaciente/'+this.paciente1.id_paciente]);
        this.showError('Contraseña Guardada'); 
        this.Listo = true;
      }, (error)=>{
        console.log(error);
        this.showError('Existe un error'); 
      });
    }else{
      this.showError('La contraseña no coincide'); 
      
    }
  }  
}


get nuevaContra(){return this.Nueva.get('nuevaContra')};
get nuevaContraRep(){return this.Nueva.get('nuevaContraRep')};



}