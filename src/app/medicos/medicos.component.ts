import { Component, OnInit, ViewChild } from '@angular/core';
import { Medicos } from '../interfaces/medicos';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LoginadminService } from '../services/loginadmin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { MedicosService } from '../services/medicos.service';

export interface Medicos {
  id?: string;
  usuarioM?: string;
  contraseniaM?: string;
  nombreM?: string;
  identidadM?: string;
  especialidadM?: string;
}

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  API_ENDPOINT = 'http://127.0.0.1:8000/api';
 
  medicos: Medicos[];
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  medico:Medicos = {   
    usuarioM:null,
    contraseniaM:null,
    nombreM:null,
    identidadM:null,
    especialidadM:null
  };

  id: any;
  meds: Medicos[];

  constructor(private medicoService:MedicosService,private activatedRoute: ActivatedRoute,public dialog: MatDialog,
  private LoginAdminService: LoginadminService,private httpClient: HttpClient, private router:Router) { 
    this.getMedico();    
    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){
      this.medicoService.getMedico().subscribe((data: Medicos[]) =>{
        this.meds = data;
        this.medico = this.meds.find((m)=>{return m.id == this.id});
        console.log(this.medico.usuarioM);
        this.medicoService.idActualizar=this.medico.id;  
       console.log(this.medico);      
      },(error)=>{
        console.log(error);
      });

    }
  }

  getMedico(){
    this.medicoService.getMedico().subscribe((data: Medicos[]) =>{
      this.meds=data;
      console.log(this.meds);
      this.meds = this.meds.filter(paciente => paciente);
      this.dataSource =  new MatTableDataSource(this.meds);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  displayedColumns: string[] = ['id', 'usuarioM',  'nombreM', 'identidadM', 'especialidadM','nada'];
  displayedColumns2: string[] = ['id', 'usuarioM', 'nombreM', 'identidadM', 'especialidadM','nada'];

 applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }  

  ngOnInit() {
    this.getMedico(); 
  }

  borrarmedico(){
    const dialogRef = this.dialog.open(Borrarmedico, {disableClose:true,panelClass: 'borrar'});  
  }
}


























@Component({
  selector: 'dialog-borrar-medico',
  templateUrl: 'dialog-borrar-medico.html',
})
 
export class Borrarmedico {
  
  medico:Medicos = {   
    usuarioM:null,
    contraseniaM:null,
    nombreM:null,
    identidadM:null,
    especialidadM:null
  };

  id: any;
  meds: Medicos[];


constructor(public dialog: MatDialog,private router: Router,private mensaje: MatSnackBar,private medicoService:MedicosService,
          private activatedRoute: ActivatedRoute) {    
this.dialog.closeAll;   
this.getPacientes();
}

 showError(message: string) {
  const config = new MatSnackBarConfig();
  config.panelClass = ['background-red'];
  config.duration = 2000;
  this.mensaje.open(message, null, config);
}

getPacientes(){
  this.medicoService.getMedico().subscribe((data: Medicos[]) =>{
    this.meds=data;
    console.log(this.meds);
  },(error)=>{
    console.log(error);
    alert('Ocurrio un error');
  });
}


ngOnInit() {
  this.getPacientes();
}

  salir(){

    this.medico.id  = this.medicoService.idActualizar;
  
    if(this.medico.id){
    this.medicoService.getMedico().subscribe((data: Medicos[]) =>{
      this.meds = data;
      this.medico = this.meds.find((m)=>{return m.id == this.medico.id});
      //console.log(this.login_admin.usuario_admin);
      // this.login_adminservice.idActualizar=this.login_admin.id;  
     console.log(this.medico.id);      
    },(error)=>{
      console.log(error);
    });
  }
  console.log(this.medico.id);




     this.medicoService.delete(this.medico.id).subscribe((data)=>{       
    this.showError('Administrador eliminado correctamente'); 
    console.log(data);
    
  this.router.navigate(['/principal/medicos']);
    
   
},(error)=>{console.log(error);
  });
  }
}