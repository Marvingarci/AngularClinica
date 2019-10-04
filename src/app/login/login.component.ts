import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})



export class LoginComponent implements OnInit {
<<<<<<< HEAD


  passwordType: string= 'password';
  passwordShown: boolean = false;

    
=======
    usuario: Usuario  = {
    cuentaUsuario:null,
    contrasenia: null
  };
>>>>>>> 23fcc0400b31fa97a4276d070d8d3b7334910747
  constructor(private loginService: LoginService,private router: Router){
  }
  
  ngOnInit() {
  }

<<<<<<< HEAD
   
  
=======
  saveLogin(){
    this.router.navigate(['formulario']);
  }
  /*saveLogin(){this.loginService.save(this.usuario).subscribe( (data) =>{
   console.log(data);
    alert('pelicula guardada');   
  },  (error)=>{
    console.log(error);
    alert('ocurrio un error');  
  this.router.navigate(['formulario']);
  });   
  } */
   
>>>>>>> 23fcc0400b31fa97a4276d070d8d3b7334910747

}