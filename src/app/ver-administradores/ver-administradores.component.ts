import { Component, OnInit , ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LoginadminService } from '../services/loginadmin.service';

export interface LoginAdmin {
  id_loginAdmin?: string;
  usuario_admin?: string;
  contrasenia_admin?: string;
  nombre_admin?: string;
  identidad_admin?: string;
  especialidad_admin?: string;
}

@Component({
  selector: 'app-ver-administradores',
  templateUrl: './ver-administradores.component.html',
  styleUrls: ['./ver-administradores.component.css']
})
export class VerAdministradoresComponent implements OnInit {
  API_ENDPOINT = 'http://127.0.0.1:8000/api';
  pacientes: LoginAdmin[];
  alumnos: LoginAdmin[];

  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private pacienteService: FormularioService,private LoginAdminService: LoginadminService, private httpClient: HttpClient, private router:Router) { 
    this.getPacientes();
  }
  getPacientes(){
    this.LoginAdminService.getAdmin().subscribe((data: LoginAdmin[]) =>{
      this.pacientes=data;

      console.log(this.pacientes);
      this.alumnos = this.pacientes.filter(paciente => paciente);
      this.dataSource =  new MatTableDataSource(this.alumnos);
 

    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }


  displayedColumns: string[] = ['id_loginAdmin', 'usuario_admin', 'contrasenia_admin', 'nombre_admin', 'identidad_admin', 'especialidad_admin','nada'];
  displayedColumns2: string[] = ['id_loginAdmin', 'usuario_admin', 'contrasenia_admin', 'nombre_admin', 'identidad_admin', 'especialidad_admin','nada'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;

  }  

  ngOnInit() {
  }
 
}