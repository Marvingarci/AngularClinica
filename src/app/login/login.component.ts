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
    cuenta: null,
    clave: null
  };


  

    
  constructor(private loginService: LoginService,private router: Router, activar: AppComponent){
   activar.esconder();
   
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