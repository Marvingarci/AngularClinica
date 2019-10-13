import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../services/formulario.service';
import { Paciente } from "../interfaces/paciente";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dato-paciente',
  templateUrl: './dato-paciente.component.html',
  styleUrls: ['./dato-paciente.component.css']
})
export class DatoPacienteComponent implements OnInit {
  API_ENDPOINT = 'http://apiclinicaunah.test/api/';
  pacientes: Paciente[];

  constructor(private formularioService: FormularioService, private activatedRoute: ActivatedRoute) {
    this.getdato();
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