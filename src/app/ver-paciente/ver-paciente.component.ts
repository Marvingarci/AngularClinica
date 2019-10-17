import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from "../services/formulario.service";
import { Paciente } from "../interfaces/paciente";
import { MatMonthView } from '@angular/material/datepicker';
@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css']
})
export class VerPacienteComponent implements OnInit {
  paciente: Paciente={
    id_paciente: null,
    numero_paciente: null,
    contrasenia: null,
    primer_apellido: null,
    segundo_apellido: null,
    primer_nombre:null,
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
    prosene: null

  }

  id: any;
  pacientes: Paciente[];
  constructor(private FormService: FormularioService, private activatedRoute: ActivatedRoute ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.FormService.get().subscribe((data: Paciente[])=>{
          this.pacientes = data;
          this.paciente = this.pacientes.find((m)=>{ return m.id_paciente == this.id});
          console.log(this.paciente);
      }, (error)=>{
        console.log(error);
      });
    }

  }

  ngOnInit() {
  }
 
}
