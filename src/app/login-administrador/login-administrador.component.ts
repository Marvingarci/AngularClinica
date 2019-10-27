import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAdmin } from '../interfaces/login_admin';
import { LoginadminService } from '../services/loginadmin.service';
import { Loginadministrador } from '../interfaces/loginadministrador';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.css']
})
export class LoginAdministradorComponent implements OnInit {
  hide = true;
  loading: boolean =false;

  login_admin: LoginAdmin = {  
    id :null,
    usuario_admin : null,
    contrasenia_admin : null,
    nombre_admin : null,
    identidad_admin : null,
    especialidad_admin : null,  
  }

  loginadministrador_form = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    contrasenia: new FormControl('',[Validators.required]),
  });

  loginadministrador: Loginadministrador = {
    usuario: null,
    contrasenia: null
  };

  login_admins:LoginAdmin;
  loginadmins: LoginAdmin[];
  LoginAdmin: LoginadminService;

  constructor(private router: Router,LoginAdmin: LoginadminService) { 

  //   LoginAdmin.get().subscribe((data: LoginAdmin[])=>{
  //   this.loginadmins = data;
  //   console.log(this.loginadmins);
  // }, (error)=>{
  //   console.log(error);
  // });  
}




  ngOnInit() {}


  ingresar(){

    this.loading=true;
    this.loginadministrador.usuario = this.loginadministrador_form.get('usuario').value;
    this.loginadministrador.contrasenia = this.loginadministrador_form.get('contrasenia').value;


   if (this.login_admins.contrasenia_admin  == this.loginadministrador.contrasenia) {
    console.log(this.login_admins.contrasenia_admin);console.log( this.loginadministrador.contrasenia);
        this.router.navigate(['/principal/']);
      }else{
        this.loading=false;
        alert('Contraseña incorrecta')
      } 
}

  get usuario(){return this.loginadministrador_form.get('usuario')};
  get contrasenia(){return this.loginadministrador_form.get('contrasenia')};

}


