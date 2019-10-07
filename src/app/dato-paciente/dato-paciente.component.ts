import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { HttpClient } from '@angular/common/http';
import { Paciente } from "../interfaces/paciente";

@Component({
  selector: 'app-dato-paciente',
  templateUrl: './dato-paciente.component.html',
  styleUrls: ['./dato-paciente.component.css']
})
export class DatoPacienteComponent implements OnInit {
  API_ENDPOINT = 'http://127.0.0.1:8000/api';
  pacientes: Paciente[];
  constructor(private formularioService: FormularioService, private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + '/formulario').subscribe((data: Paciente[]) =>{
      this.pacientes = data;
    });
   }

  ngOnInit() {
  }

}