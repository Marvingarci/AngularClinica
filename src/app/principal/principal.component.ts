import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppComponent } from "../app.component";
import {Location} from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  panelOpenState = false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  public isSpinnerVisible:boolean; 
  // @Output() messageEvent = new EventEmitter<boolean>();  esto es para mandar string de un componente a otro

  constructor(mostrar: AppComponent,private _location: Location,private router: Router) {
    mostrar.mostrar();
   
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;

      } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isSpinnerVisible = false;
      }
  }, () => {
      this.isSpinnerVisible = false;
  });

    
   }

    atras() {
        this._location.back();        
    }

    
    
   
    ngOnInit() {
  }
  
}

















