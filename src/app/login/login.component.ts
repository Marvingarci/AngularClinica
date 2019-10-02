import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})



export class LoginComponent implements OnInit {


  passwordType: string= 'password';
  passwordShown: boolean = false;

    usuario: Usuario  = {
    cuentaUsuario:null,
    contrasenia: null
  };
  constructor(private loginService: LoginService){
  }



  ngOnInit() {
  }

  saveLogin(){this.loginService.save(this.usuario).subscribe( (data) =>{
   console.log(data);
    alert('pelicula guardada');   
  },  (error)=>{
    console.log(error);
    alert('ocurrio un error');
  });
   
  } 

}
