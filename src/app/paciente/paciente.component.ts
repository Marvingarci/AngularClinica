import { Component, OnInit } from '@angular/core';
import { Paciente } from '../interfaces/paciente';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  API_ENDPOINT = 'http://apiclinicaunah.test/api/';
  pacientes: Paciente[];

  constructor( private pacienteService: FormularioService, private httpClient: HttpClient ) { 
    this.getPacientes();
  }
  
  getPacientes(){
    this.pacienteService.get().subscribe((data: Paciente[]) =>{
      this.pacientes = data;
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  ngOnInit() {
  }

}
