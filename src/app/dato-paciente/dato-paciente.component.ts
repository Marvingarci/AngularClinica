import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";



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

  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute, principal: AppComponent) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.formularioService.get().subscribe((data: Paciente[]) =>{
        this.pacientes = data;
        this.paciente = this.pacientes.find((m)=>{return m.id_paciente == this.id});
        console.log(this.paciente);
      },(error)=>{
        console.log(error);
      });
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