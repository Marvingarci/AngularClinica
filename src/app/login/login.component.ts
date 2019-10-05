import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})



export class LoginComponent implements OnInit {


  passwordType: string= 'password';
  passwordShown: boolean = false;

    
  constructor(private loginService: LoginService,private router: Router){
  }
  
  ngOnInit() {
  }

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
   

}