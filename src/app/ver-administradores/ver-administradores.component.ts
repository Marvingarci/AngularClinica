import { Component, OnInit , ViewChild, Inject, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioService } from '../services/formulario.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LoginadminService } from '../services/loginadmin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Paciente } from '../interfaces/paciente';
import { LoginService } from '../services/login.service';
import { LoginAdmin } from '../interfaces/login_admin'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MedicosService } from '../services/medicos.service';

export interface LoginAdmin {
  id_loginAdmin?: string;
  usuario_admin?: string;
  contrasenia_admin?: string;
  nombre_admin?: string;
  identidad_admin?: string;
  especialidad_admin?: string;
}
export interface Medicos {
  id?: string;
  usuarioM?: string;
  contraseniaM?: string;
  nombreM?: string;
  identidadM?: string;
  especialidadM?: string;
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

  medicos: Medicos[];
  dataSourcemedico: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  login_admin:LoginAdmin = {  
    usuario_admin:null,
    contrasenia_admin:null,
    nombre_admin:null,
    identidad_admin:null
  };

  id: any;
  admins: LoginAdmin[];

  medico:Medicos = {   
    usuarioM:null,
    contraseniaM:null,
    nombreM:null,
    identidadM:null,
    especialidadM:null
  };

  id1: any;
  meds: Medicos[];
  

  constructor(private medicoService:MedicosService, private login_adminservice:LoginadminService,
    private activatedRoute: ActivatedRoute,public dialog: MatDialog,private LoginAdminService: LoginadminService,
     private httpClient: HttpClient, private router:Router) { 
             
    this.getAdministrador();
    this.getMedico();
    // this.id = this.activatedRoute.snapshot.params['id'];

    // if(this.id){
    //   this.login_adminservice.getAdmin().subscribe((data: LoginAdmin[]) =>{
    //     this.admins = data;

    //     this.login_admin = this.admins.find((m)=>{return m.id == this.id});
    //     console.log(this.login_admin.usuario_admin);
    //     this.login_adminservice.idActualizar=this.login_admin.id;  
    //    console.log(this.login_admin);      
    //   },(error)=>{
    //     console.log(error);
    //   });

    // }
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

  getMedico(){
    this.medicoService.obtenerMedicos().subscribe((data: Medicos[]) =>{
      this.medicos=data;
      this.medicos = this.medicos.filter(paciente => paciente);
      this.dataSourcemedico = new MatTableDataSource(this.medicos);
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    });
  }


  displayedColumns2: string[] = ['id_loginAdmin', 'usuario_admin', 'nombre_admin', 'identidad_admin', 'nada'];
  displayedColumns3: string[] = ['id', 'usuarioM', 'nombreM', 'identidadM', 'especialidadM','nada'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }  

  //dialogo
  borraradministrador(id){
    const dialogRef = this.dialog.open(Borraradministrador, {
      disableClose:true,
      panelClass: 'borrar',
    data:id
  });  
  dialogRef.afterClosed().subscribe(result => {
    this.getAdministrador(); 
  });   
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



  ngOnInit() {
    this.getAdministrador();
    this.getMedico();
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
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  
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
















  @Component({
    selector: 'dialog-borrar-administrador',
    templateUrl: 'dialog-borrar-administrador.html',
  })
   
  export class Borraradministrador implements OnDestroy{

    constructor(public dialogRef: MatDialogRef<Borraradministrador>,
      private loginAdminService:LoginadminService,
      private mensaje: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

        
  salir(): void {
    this.dialogRef.close();
  }

  Borraradministrador(){
    this.loginAdminService.delete(this.data).subscribe((data)=>{
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
    this.loginAdminService.getAdmin().subscribe();
  }
    } 