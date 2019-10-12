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
    cuentalogin: null,
    contrasenialogin: null
  };


  

    
  constructor(private loginService: LoginService,private router: Router){
  }

  main(){
    this.router.navigate(['formulario']);
  }
  
  ngOnInit() {
  }

   
  

}