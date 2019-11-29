import { Component, OnInit , ViewChild, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LoginadminService } from '../services/loginadmin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paciente } from '../interfaces/paciente';
import { LoginService } from '../services/login.service';
import { LoginAdmin } from '../interfaces/login_admin';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  
  login_admin:LoginAdmin = {   
    usuario_admin:null,
    contrasenia_admin:null,
    nombre_admin:null,
    identidad_admin:null
  };
  

  id: any;
  admins: LoginAdmin[];
  constructor( private login_adminservice:LoginadminService,private activatedRoute: ActivatedRoute,public dialog: MatDialog,
    private LoginAdminService: LoginadminService,
     private httpClient: HttpClient, private router:Router) { 
    this.getAdministrador();
    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){
      this.login_adminservice.getAdmin().subscribe((data: LoginAdmin[]) =>{
        this.admins = data;
        this.login_admin = this.admins.find((m)=>{return m.id == this.id});
        console.log(this.login_admin.usuario_admin);
        this.login_adminservice.idActualizar=this.login_admin.id;  
       console.log(this.login_admin);      
      },(error)=>{
        console.log(error);
      });

    }
  }//fin constructor

  getAdministrador(){
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


  displayedColumns2: string[] = ['id_loginAdmin', 'usuario_admin', 'contrasenia_admin', 'nombre_admin', 'identidad_admin', 'nada'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;

  }  

  ngOnInit() {
    this.getAdministrador();
  }
  }