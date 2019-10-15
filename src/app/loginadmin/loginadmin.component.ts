import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAdmin } from '../interfaces/login_admin';
import { LoginadminService } from '../services/loginadmin.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  
  login_admin:LoginAdmin ={
    usuario_admin:null,
    contrasenia_admin:null,
    nombre_admin:null,
    identidad_admin:null,
    especialidad_admin:null
  };
  
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

  constructor(private router: Router,private login_adminservice:LoginadminService) { }

  ngOnInit() {
  }

  save(){
    this.login_adminservice.saveloginadmin(this.login_admin).subscribe((data)=>{
      alert('Administrador Guardado con exito');
      console.log(data);
    }, (error) => { 
      console.log(error);
      alert('ocurrio un error');
    
    });
  }




   // console.log(this.login_admin);
    //this.router.navigate(['principal']);
  

}
