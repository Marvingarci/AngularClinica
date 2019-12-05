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
  icon : string='home';
  // @Output() messageEvent = new EventEmitter<boolean>();  esto es para mandar string de un componente a otro

  constructor(mostrar: AppComponent,private router: Router,public dialog: MatDialog) {
    mostrar.mostrar();  
}

abrirside() {
      this.opened != this.opened;         
    }

    principal(){      
      this.icon = 'home';
    }
    pacientes(){      
      this.icon = 'folder_shared';
    }
    at1(){      
      this.icon = 'receipt';
    }
    consolidariodiario(){      
      this.icon = 'today';
    }
    inventario(){      
      this.icon = 'healing';
    }
    admininstradores(){      
      this.icon = 'assignment_ind';
    }
    ayuda(){      
      this.icon = 'help';
  const dialogRef = this.dialog.open(DialogContentExampleDialog1, {disableClose:false,panelClass: 'custom-dialog-container1'});
  }
  cerrarsesion(){
    
  const dialogRef = this.dialog.open(DialogCerrarSesion2, {disableClose:false,panelClass: 'cerrarsesion2'});
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

@Component({
  selector: 'dialog-cerrar-sesion2',
  templateUrl: 'dialog-cerrar-sesion2.html',
})
 
export class DialogCerrarSesion2 {
constructor( public dialog: MatDialog,private router: Router){
  
  this.dialog.closeAll;
}
  salir(){
    this.router.navigate(['']);
  }
}