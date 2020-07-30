import { Component, OnInit, ViewChild, Inject, OnDestroy, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoginadminService } from '../services/loginadmin.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { LoginService } from '../services/login.service';
import { MedicosService } from '../services/medicos.service';
import { Administrador } from '../interfaces/administrador';
import { Medicos } from '../interfaces/medicos';
import { DialogoVerificarPermisoComponent } from '../dialogo-verificar-permiso/dialogo-verificar-permiso.component';


@Component({
  selector: 'app-ver-administradores',
  templateUrl: './ver-administradores.component.html',
  styleUrls: ['./ver-administradores.component.css']
})
export class VerAdministradoresComponent implements OnInit {

  API_ENDPOINT = 'http://127.0.0.1:8000/api';

  administradores: Administrador[];
  // alumnos: LoginAdmin[];
  datasourceAdmninistradores: any;

  medicos: Medicos[];
  datasourceMedicos: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  administrador: Administrador = {
    usuario: null,
    nombre_completo: null,
    identidad: null
  };

  id: any;

  medico: Medicos = {
    usuario: null,
    password: null,
    nombre: null,
    numero_identidad: null,
    especialidad: null
  };

  id1: any;
  meds: Medicos[];


  constructor(private medicoService: MedicosService,
    public dialog: MatDialog,
    private LoginAdminService: LoginadminService) {

    this.getAdministradores();
    this.getMedicos();

  }//fin constructor



  getAdministradores() {
    this.LoginAdminService.obtenerAdministradores().subscribe((data: Administrador[]) => {
      this.administradores = data;

      this.administradores = this.administradores.filter(administrador => administrador);
      this.datasourceAdmninistradores = new MatTableDataSource(this.administradores);

    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  getMedicos() {

    this.medicoService.obtenerMedicos().subscribe((data: Medicos[]) => {
      this.medicos = data;
      this.medicos = this.medicos.filter(medico => medico);
      this.datasourceMedicos = new MatTableDataSource(this.medicos);
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });

  }


  displayedColumns2: string[] = ['id_loginAdmin', 'usuario_admin', 'nombre_admin', 'identidad_admin', 'nada'];
  displayedColumns3: string[] = ['id', 'usuarioM', 'nombreM', 'identidadM', 'especialidadM', 'nada'];


  applyFilter(filterValue: string) {
    this.datasourceAdmninistradores.filter = filterValue.trim().toLowerCase();
    this.datasourceAdmninistradores.paginator = this.paginator;

    
    this.datasourceMedicos.filter = filterValue.trim().toLowerCase();
    this.datasourceMedicos.paginator = this.paginator;
  }


  //dialogo
  borrarAdministrador(id) {

    const dialogRef = this.dialog.open(DialogoVerificarPermisoComponent, {
      disableClose: true,
      panelClass: 'verificar',

    });

    dialogRef.afterClosed().subscribe(confimacion => {


      if (confimacion) {

        const dialogRef = this.dialog.open(Borraradministrador, {
          disableClose: true,
          panelClass: 'borrar',
          data: id

        });

        dialogRef.afterClosed().subscribe(result => {
          this.getAdministradores();
        });

      }

    });



  }

  borrarMedico(id) {

    const dialogRef = this.dialog.open(DialogoVerificarPermisoComponent, {
      disableClose: true,
      panelClass: 'verificar',

    });

    dialogRef.afterClosed().subscribe(confimacion => {


      if (confimacion) {

        const dialogRef = this.dialog.open(DialogoMedico, {
          disableClose: true,
          panelClass: 'borrar',
          data: id

        });

        dialogRef.afterClosed().subscribe(result => {
          this.getMedicos();
        });

      }

    });


  }



  ngOnInit() {
    this.getAdministradores();
    this.getMedicos();
  }
}





@Component({
  selector: 'dialogoMedico',
  templateUrl: 'dialog-borrar-medico.html',
})

export class DialogoMedico implements OnDestroy {

  constructor(public dialogRef: MatDialogRef<DialogoMedico>,
    private medicoService: MedicosService,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  salir(): void {
    this.dialogRef.close();
  }

  Borrarmedico() {
    this.medicoService.borrarMedico(this.data).subscribe((data) => {
      this.showError('Médico eliminado correctamente');
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

}







@Component({
  selector: 'borraradministrador',
  templateUrl: 'dialog-borrar-administrador.html',
})

export class Borraradministrador implements OnDestroy {

  verificado: boolean = false;

  constructor(public dialogRef: MatDialogRef<Borraradministrador>,
    private loginAdminService: LoginadminService,
    private loginService: LoginService,
    public dialogo: MatDialog,
    private mensaje: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  salir(): void {
    this.dialogRef.close();
  }

  Borraradministrador() {

    //verifico si el usuario que se va a borrar no es el que trae por defecto el sistema
    if (this.data != 1) {

      //verifico si el usuario que se va borrar no es el mismo usuario que esta logueado
      if (this.data != this.loginService.datosUsuario.id) {

        this.loginAdminService.delete(this.data).subscribe(result => {
          this.showError('Administrador borrado con exito');
        });

      } else {

        this.showError('No puede borrar su propio usuario');


      }

    } else {

      this.showError('El administrador no puede ser borrado');

    }


  }


  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  ngOnDestroy(): void {
    this.loginAdminService.obtenerAdministradores().subscribe();
  }
} 