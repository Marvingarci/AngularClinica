import { Component, OnInit , Input} from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { ActivatedRoute, Route } from '@angular/router';
import { AppComponent } from "../app.component";
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dato-paciente',
  templateUrl: './dato-paciente.component.html',
  styleUrls: ['./dato-paciente.component.css']
})
export class DatoPacienteComponent implements OnInit {
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
    emergencia_telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    estudiante: null,
    empleado: null,
    visitante: null,
    prosene: null,
  }
  id: any;
  pacientes: Paciente[];
  
  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute, 
              principal: AppComponent, public dialog: MatDialog, login: LoginService) {
                this.dialog.closeAll;

    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.formularioService.get().subscribe((data: Paciente[]) =>{
        this.pacientes = data;
        this.paciente = this.pacientes.find((m)=>{return m.id_paciente == this.id});
        console.log(this.paciente.contrasenia);
        this.formularioService.idActualizar=this.paciente.id_paciente;
       
        console.log(this.paciente);
      
      },(error)=>{
        console.log(error);
      });
    }else{
//      this.paciente=this.formularioService.IngresoPaciente;
    }
    principal.esconder();

   
    
  }
  

  getdato(){
    this.formularioService.get().subscribe((data: Paciente[]) =>{
      this.pacientes = data;
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }


  ngOnInit() {
  }

 

}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
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
    emergencia_telefono: null,
    peso: null,
    talla: null,
    imc: null,
    temperatura: null,
    presion: null,
    pulso: null,
    estudiante: null,
    empleado: null,
    visitante: null,
    prosene: null,
  }
  id:any;
  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute, public login: LoginService, private router: Router ){
    this.paciente1.id_paciente = this.formularioService.idActualizar;
    console.log(this.id);
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
  

  Nueva = new FormGroup({

    nuevaContra: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    nuevaContraRep: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)])
});

guardar(){
  
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

  
  if(this.Nueva.valid){
    // guardar datos del formulario en paciente y enviarlo a la api
    
  this.paciente1.contrasenia = this.Nueva.get('nuevaContra').value;
  
  if(this.paciente1.contrasenia==this.Nueva.get('nuevaContraRep').value ){

  
  this.formularioService.put(this.paciente1).subscribe((data)=>{
    
    alert('Contraseña guardada');
    
    this.router.navigate(['datoPaciente/'+this.login.idpaciente]);

    console.log(data);
  }, (error)=>{
    console.log(error);
    alert('No se guardo ni mierda');
  });
}else{
  alert('La contrase;a no es la misma');
}

}

}
get nuevaContra(){return this.Nueva.get('nuevaContra')};
get nuevaContraRep(){return this.Nueva.get('nuevaContraRep')};

}