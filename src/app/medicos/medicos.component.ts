import { Component, OnInit, ViewChild, Inject, AfterViewInit, Input, OnChanges, OnDestroy, AfterContentInit } from '@angular/core';
import { Medicos } from '../interfaces/medicos';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LoginadminService } from '../services/loginadmin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { MedicosService } from '../services/medicos.service';
import { FormularioService } from '../services/formulario.service';
import { get } from 'http';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  styleUrls: ['./medicos.component.css'],
  providers: []
})

export class MedicosComponent implements OnInit{
  

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

    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){
      this.medicoService.obtenerMedicos().subscribe((data: Medicos[]) =>{
        this.meds = data;
        this.medico = this.meds.find((m)=>{return m.id == this.id});
        this.medicoService.idActualizar=this.medico.id;  
       console.log(this.medico);      
      },(error)=>{
        console.log(error);
      });

    }
  }

  getMedico(){
    this.medicoService.obtenerMedicos().subscribe((data: Medicos[]) =>{
      this.medicos=data;
      this.medicos = this.medicos.filter(paciente => paciente);
      this.dataSource = new MatTableDataSource(this.medicos);
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

  abrirDialogo(id){

    const dialogRef = this.dialog.open(DialogoMedico, {
      disableClose:true, 
      panelClass: 'borrar',
      data: id
    });  

    dialogRef.afterClosed().subscribe(result => {

      this.getMedico();
 
    });
    
  }


}




@Component({
  selector: 'dialogoMedico',
  templateUrl: 'dialog-borrar-medico.html',
  
})

 
export class DialogoMedico implements OnDestroy{

  constructor(public dialogRef: MatDialogRef<DialogoMedico>,
    private medicoService:MedicosService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  
  salir(): void {
    this.dialogRef.close();
  }

  Borrarmedico(){
    this.medicoService.borrarMedico(this.data).subscribe((data)=>{
      this.showError('Administrador eliminado correctamente');
    });
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  ngOnDestroy(): void {
    this.medicoService.obtenerMedicos().subscribe();
  }

  // RecargarMedicos(){
  //   let index: number;

  //   this.medicoService.obtenerMedicos().subscribe((data: Medicos[])=>{
  //     medicos = data;
  //     dataSource = new MatTableDataSource(medicos);

  //     // this.datasourcePadre = new MatTableDataSource(this.medicos);
  //     // this.datosDesdeElPadre.estollegadelpadre = this.datasourcePadre;

  //     // this.medicos = data;
  //     // this.medico = this.medicos.find((m)=>{return m.id == this.data.id});
  //     // index = this.medicos.indexOf(this.medico);
  //     // this.medicos.splice(index, 1);
  //     // this.dataSource = new MatTableDataSource(this.medicos);

  //     // console.log('medico');
  //     // console.log(this.medicosComponent.medico);
  //     // console.log('index');
  //     // console.log(index = this.medicosComponent.medicos.indexOf(this.medicosComponent.medico));

  //   });
    
  // }

 
  

}
