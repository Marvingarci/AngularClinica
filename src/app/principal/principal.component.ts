import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from "../app.component";
import {Location} from '@angular/common';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  panelOpenState = false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  

  constructor(mostrar: AppComponent,private _location: Location) {
    mostrar.mostrar();
   }

    atras() {
        this._location.back();
    }

  ngOnInit() {
  }
  
}
