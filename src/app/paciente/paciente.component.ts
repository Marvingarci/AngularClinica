import { Component, OnInit } from '@angular/core';
import { Paciente } from '../interfaces/paciente';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Paciente2{
  id_paciente: number;
  nombre: string;
  numero_cuenta: string;
  fecha: Date;
  tel: string;
  Identidad: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Marvin', weight: 1.23, symbol: 'HM'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  API_ENDPOINT = 'http://apiclinicaunah.test/api/';
  pacientes: Paciente[];
  pacientes2: Paciente2[];

  constructor( private pacienteService: FormularioService, private httpClient: HttpClient ) { 
    this.getPacientes();

   
    /*let pacientes;
    for(let paciente of this.pacientes){
      this.pacientes2[paciente.id_paciente].id_paciente = paciente.id_paciente;
      this.pacientes2[paciente.id_paciente].nombre = paciente.primer_nombre;
      this.pacientes2[paciente.id_paciente].Identidad = paciente.numero_identidad;
      this.pacientes2[paciente.id_paciente].tel = paciente.numero_telefono;
      this.pacientes2[paciente.id_paciente].numero_cuenta = paciente.numero_cuenta;
    }
    console.log(this.pacientes2);*/
    
  }
  
  getPacientes(){
    this.pacienteService.get().subscribe((data: Paciente[]) =>{
      this.pacientes = data;
      for (let index = 0; index < this.pacientes.length; index++) {
        this.pacientes2[index].id_paciente = this.pacientes[index].id_paciente;
        this.pacientes2[index].nombre = this.pacientes[index].primer_nombre;
        this.pacientes2[index].Identidad = this.pacientes[index].numero_identidad;
        this.pacientes2[index].tel = this.pacientes[index].numero_telefono;
        this.pacientes2[index].numero_cuenta = this.pacientes[index].numero_cuenta;
      }
      console.log(data);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  displayedColumns: string[] = ['id_paciente', 'nombre', 'Identidad', 'tel', 'Numero_Cuenta'];
  dataSource = new MatTableDataSource(this.pacientes2);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  ngOnInit() {
  }

}
