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
  paciente: Paciente[];

  constructor() { }

  ngOnInit() {
  }

}
