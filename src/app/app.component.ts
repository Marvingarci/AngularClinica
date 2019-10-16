import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'AngularClinica';
  private principal: boolean;

  constructor(){
    this.principal=true;
  }

  mostrar(){
    this.principal=true;
  }
  esconder(){
    this.principal=false;
  }
}
