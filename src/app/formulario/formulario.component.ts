import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  enviarDatos(){
    this.router.navigate(['principal']);
  }
}
