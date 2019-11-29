import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppComponent } from "../app.component";
import {Location} from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogContentExampleDialog } from '../dato-paciente/dato-paciente.component';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  panelOpenState = false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  public opened:boolean =true; 
  public isSpinnerVisible:boolean; 
  // @Output() messageEvent = new EventEmitter<boolean>();  esto es para mandar string de un componente a otro

  constructor(mostrar: AppComponent,private router: Router,public dialog: MatDialog) {
    mostrar.mostrar();  
}

abrirside() {
      this.opened != this.opened;         
    }

    ayuda(){
  const dialogRef = this.dialog.open(DialogContentExampleDialog1, {disableClose:false,panelClass: 'custom-dialog-container1'});
  }
      
      
   
    ngOnInit() {}
  
}

















@Component({
  selector: 'dialog-content-example-dialog1',
  templateUrl: 'dialog-content-example-dialog1.html',
})

export class DialogContentExampleDialog1 {
 
  constructor( ){   
   }
}