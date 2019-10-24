import { Component, OnInit , Input} from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { PacienteComponent } from '../paciente/paciente.component';



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
  
  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute, principal: AppComponent, public dialog: MatDialog) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.formularioService.get().subscribe((data: Paciente[]) =>{
        this.pacientes = data;
        this.paciente = this.pacientes.find((m)=>{return m.id_paciente == this.id});
        console.log(this.paciente.contrasenia);
        this.formularioService.idActualizar=this.paciente.id_paciente;
        if (this.paciente.contrasenia == null) {
          this.openDialog();
        }
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

  openDialog() {
    index: Number;
    const index = this.paciente.id_paciente;
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
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
  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute){
    this.paciente1.id_paciente = this.formularioService.idActualizar;
    console.log(this.id);
  }
  

  Nueva = new FormGroup({

    nuevaContra: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)]),
    nuevaContraRep: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-z]{2,15}$/)])
});

guardar(){
  
  if(this.Nueva.valid){
    // guardar datos del formulario en paciente y enviarlo a la api
  this.paciente1.contrasenia = this.Nueva.get('nuevaContra').value;
  this.formularioService.put(this.paciente1).subscribe((data)=>{
    alert('Contrase;a guardada');
    console.log(data);
  }, (error)=>{
    console.log(error);
    alert('No se guardo ni mierda');
  });


}

}}