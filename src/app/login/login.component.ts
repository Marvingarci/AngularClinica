import { Component, OnInit, RootRenderer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";
import { Paciente } from "../interfaces/paciente";
import { PacienteComponent } from '../paciente/paciente.component';
import { FormularioService } from '../services/formulario.service';
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
  paciente: Paciente;
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
    this.login.cuenta = this.login_form.get('cuenta').value;
    this.login.clave = this.login_form.get('clave').value;

    for (let index = 0; index < this.pacientes.length; index++) {
      if (this.pacientes[index].numero_cuenta == this.login.cuenta) {
        this.pase=false;
        this.paciente=this.pacientes[index];
      }
    }

    if (this.pase == true) {
      this.loginService.guardarDatos(this.login).subscribe( (data) =>{
        console.log(data);   
        alert('todo perron'); 
         this.router.navigate(['/formulario']);
      }, (error) => {
        console.log(error);
        alert('Usuario incorrecto ');
      });
      
    }else{
      if (this.paciente.contrasenia==this.login.clave) {
        this.router.navigate(['/datoPaciente/'+this.paciente.id_paciente]);  
      }else{
        alert('Contrase;a incorrecta')
      }
      
    }

    
    
/*
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

    */

  }

  get cuenta(){return this.login_form.get('cuenta')};
  get clave(){return this.login_form.get('clave')};
  

}