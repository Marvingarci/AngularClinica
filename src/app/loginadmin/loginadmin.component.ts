import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  lista:string[]=[
  "Salud Pública",
  "Ginecología y Obstetricia",
  "Pediatría",
  "Cirugía General",
  "Medicina Interna",
  "Dermatología",
  "Neurología",
  "Neurocirugía",
  "Cirugía Plástica",
  "Anestesiología, Reanimación y Dolor",
  "Ortopedia",
  "Psiquiatría",
  "Otorrinolaringología",
  "Medicina Física y Rehabilitación"];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  saveLoginAdmin(){
    this.router.navigate(['principal']);
  }

}
