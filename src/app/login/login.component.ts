import { Component, OnInit, RootRenderer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";
import { Paciente } from "../interfaces/paciente";
import { PacienteComponent } from '../paciente/paciente.component';
import { FormularioService } from '../services/formulario.service';

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

  pacientes: Paciente[];
  Formulario: FormularioService;
  pase: boolean=true;

  constructor(private loginService: LoginService,private router: Router, private activar: AppComponent,  Formulario: FormularioService){
   activar.esconder();


   Formulario.get().subscribe((data: Paciente[])=>{
    this.pacientes = data;
    console.log(this.pacientes);
  }, (error)=>{
    console.log(error);
  }); 
  }


  
  ngOnInit() {
  
  }


  comprobarDatos(){

    for (let index = 0; index < this.pacientes.length; index++) {
      if (this.pacientes[index].numero_cuenta == this.login.cuenta) {
        this.pase=false;
      
      }
    }

    if (this.pase == true) {
      this.loginService.guardarDatos(this.login).subscribe( (data) =>{
        console.log(data);   
        alert('todo perron'); 
         this.router.navigate(['/formulario']);
      }, (error) => {
        console.log(error);
        alert('Clave incorrecta');
      });
      
    }else{
      this.router.navigate(['/datoPaciente']);
    }

    
    

  }
  

}