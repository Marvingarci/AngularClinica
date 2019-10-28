import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from "../services/formulario.service";
import { Paciente } from "../interfaces/paciente";
import { MatMonthView } from '@angular/material/datepicker';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styleUrls: ['./ver-paciente.component.css']
})
export class VerPacienteComponent implements OnInit {

  step = 0;

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
  constructor(private FormService: FormularioService, private activatedRoute: ActivatedRoute, activar: AppComponent ) { 
    activar.mostrar();
    this.id = this.activatedRoute.snapshot.params['id'];
    

    if(this.id){
      this.FormService.getUno(this.id).subscribe((data: Paciente)=>{
          this.paciente = data;
          console.log(this.id);
          console.log(this.paciente);
      }, (error)=>{
        console.log(error);
      });
    }

  }

  ngOnInit() {
  }
 
}
