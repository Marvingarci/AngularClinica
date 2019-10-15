import { Component, OnInit, RootRenderer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";

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


  

    
  constructor(private loginService: LoginService,private router: Router, activar: AppComponent){
   activar.esconder();
   
  }

  main(){
    this.router.navigate(['formulario']);
  }
  
  ngOnInit() {
  }

   
  

}