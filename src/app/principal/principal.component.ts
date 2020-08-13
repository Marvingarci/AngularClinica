import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppComponent } from "../app.component";
import { Location } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatDialog } from '@angular/material';
import { cambiocontraDialog } from '../dato-paciente/dato-paciente.component';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  panelOpenState = false;

  public opened: boolean = true;
  public isSpinnerVisible: boolean;
  icon: string = 'home';
  esAdmin: boolean;

  // @Output() messageEvent = new EventEmitter<boolean>();  esto es para mandar string de un componente a otro

  constructor(mostrar: AppComponent, private router: Router, public dialog: MatDialog, private loginService: LoginService) {

    mostrar.mostrar();


    this.obtenerUsuario()
 


  }

  abrirside() {
    this.opened != this.opened;
  }

  principal() {
    this.icon = 'home';
  }
  pacientes() {
    this.icon = 'folder_shared';
  }
  at1() {
    this.icon = 'receipt';
  }
  consolidariodiario() {
    this.icon = 'today';
  }
  inventario() {
    this.icon = 'healing';
  }
  admininstradores() {
    this.icon = 'assignment_ind';
  }
  ayuda() {
    this.icon = 'help';
  }

  cerrarsesion() {

    const dialogRef = this.dialog.open(DialogCerrarSesion2, { disableClose: false, });
  }



  ngOnInit() {


  }

  obtenerUsuario(){
    this.loginService.getCurrentUser({"token": localStorage.getItem("token")}).subscribe((data:any)=>{

      console.log(data)

      if(data.rol == "Administrador" || data.permisos == 1){

        this.esAdmin = true

      }else{

        this.esAdmin = false

      }
    })
  }
}



















@Component({
  selector: 'dialog-cerrar-sesion2',
  templateUrl: 'dialog-cerrar-sesion2.html',
})

export class DialogCerrarSesion2 {
  constructor(public dialog: MatDialog, private router: Router) {

    this.dialog.closeAll;
  }
  salir() {
    //borro el token para que el usuario no ya no tenga acceso
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}