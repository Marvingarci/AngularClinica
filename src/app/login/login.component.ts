import { Component, OnInit, RootRenderer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})



export class LoginComponent implements OnInit {
 hide = true;
  //input
 

  login_form = new FormGroup({
    cuenta: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    clave: new FormControl('',[Validators.required]),

  });

  getErrorMessage() {
    return this.login_form.get('cuenta').hasError('required') ? 'You must enter a value' :
    this.login_form.get('cuenta').hasError('cuenta') ? 'Not a valid cuenta' :
        '';
  }



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
    this.login.cuenta = this.login_form.get('cuenta').value;
    this.login.clave = this.login_form.get('clave').value;

    if(this.login_form.valid){
      this.loginService.guardarDatos(this.login).subscribe( (data) =>{
        console.log(data);   
        alert('todo perron');  
      }, (error) => {
        console.log(error);
        alert('se chorrio');
      });
    }else{
      alert('la esta cagando !!')
    }

    

  }

  get cuenta(){return this.login_form.get('cuenta')};
  get clave(){return this.login_form.get('clave')};
  

}