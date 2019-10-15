import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})



export class LoginComponent implements OnInit {

  login: Login = {
    cuenta: null,
    clave: null
  };

  constructor(private loginService: LoginService,private router: Router){
  }


  
  ngOnInit() {
  
  }


  comprobarDatos(){
    
    this.loginService.guardarDatos(this.login).subscribe( (data) =>{
      console.log(data);   
      alert('todo perron');  
    }, (error) => {
      console.log(error);
      alert('se chorrio');
    });

  }
  

}