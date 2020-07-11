import { Component, OnInit, RootRenderer, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";
import { Paciente } from "../interfaces/paciente";
import { PacienteComponent } from '../paciente/paciente.component';
import { FormularioService } from '../services/formulario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginadminService } from '../services/loginadmin.service';
import { Medicos } from '../interfaces/medicos';
import { MedicosService } from '../services/medicos.service';
import { isNullOrUndefined } from "util";
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetConfig, MatDialog } from '@angular/material';
import { trigger, state, style } from '@angular/animations';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // animations:[
  //   trigger('',[
  //     state('void',style({

  //     })),
  //   ])
  // ]
})





export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('inputClave', { static: false }) inputClave: ElementRef;
  hide = true;
  loading: boolean = false;

  // scrap1: LoginAdmin = {
  //   id: null,
  //   usuario_admin: null,
  //   contrasenia_admin: null,
  //   nombre_admin: null,
  //   identidad_admin: null,
  // }


  //,Validators.pattern(/^[2][0-9]{10}$/)
  login_form = new FormGroup({
    cuenta: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });


  login: Login = {
    cuenta: null,
    password: null
  };

  // login_admin: LoginAdmin;
  // login_admins: LoginAdmin[];
  paciente: Paciente;
  pacientes: Paciente[];
  medico: Medicos;
  medicos: Medicos[];

  pase: boolean = true;

  constructor(public dialog: MatDialog, private LoginAdminService: LoginadminService, private loginService: LoginService,
    private medicosService: MedicosService, private router: Router, private activar: AppComponent,
    private formularioService: FormularioService, private mensaje: MatSnackBar, private ayudasheet: MatBottomSheet) {
    activar.esconder();
    // cada vez que el usuario se devuelva al login borro los token para que tenga
    // que volver a loguearse y crear otro nuevo token.
    localStorage.removeItem('token');
  }



  ayuda() {
    const dialogRef = this.dialog.open(Loginayuda, {
      disableClose: false, width: "75%",
      panelClass: 'loginayuda',
    });
  }
  startanimation() {
    var x = document.getElementById("ayudadiv");
    // If "mystyle" exist, overwrite it with "mystyle2"
    if (!x.className) {
      x.className = "divayudados";
    } else if (x.className === "divayudauno") {
      x.className = "divayudados";
    } else if (x.className === "divayudados") {
      x.className = "divayudauno";
    }
  }








  ngAfterViewInit(): void {

    //  FormTools.validatorForm(this.login_form);
    // FormTools.validatorForm(this.login_form);//comente este
    // this.inputClave.nativeElement.focus();
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  ngOnInit() {
  }

  //FUNCION QUE HACE TODO EL MACANEO
  continuar() {


    if (this.login_form.valid) {

      this.hide = false;
      this.loading = true;
      this.loginService.porMientras = this.ControlClave.value;


      this.login.cuenta = this.cuenta.value;
      this.login.password = this.ControlClave.value;


      //verifico en la base de datos si el usuario fue logueado ya anteriormente ó es primera vez.
      this.loginService.obtenerUsuario(this.login).subscribe((data: any) => {


        if (data.codigoError == 1) {

          this.loading = false;
          this.showError(data.msg);

        } else if (data.codigoError == 2) {


          this.login.cuenta = this.cuenta.value;
          this.login.password = this.ControlClave.value;

          // si el usuario es nuevo entonces lo registro.
          this.loginService.guardarDatos(this.login).subscribe((data: any) => {

            //establezco el rol del usuario como estudiante para que pueda tener permisos
            //para ver sus datos
            this.loginService.datosUsuario = { 'rol': 'Paciente' };

            //guardo el token en el localstorage para poder obtenerlo despues.
            localStorage.setItem("token", data.token);

            this.showError('Llene el siguiente formulario');
            this.router.navigate(['/formulario']);

          }, (error) => {

            this.loading = false;
            this.showError('Cuenta incorrecta');
          });



        } else {

          //guardo el token en el localstorage para poder obtenerlo despues.
          localStorage.setItem("token", data.token);


          this.loginService.getCurrentUser(data).subscribe((data: any) => {

            //guardo los datos en una variable globar dentro del service
            //para poder acceder desde cualquier lado a ellos.
            this.loginService.datosUsuario = data;

            //guardo el rol en el localStorage para despues utilizarlo en los Guard
            localStorage.setItem("rol", data.rol);




            //si en los datos del usario logueado el rol es Estudiante 
            //entonces el usuario sera redirigido a datoPaciente sino sera redirigido a principal.
            if (data.rol == 'Paciente') {

              this.router.navigate(['/datoPaciente/' + data.id]);
              this.showError('Bienvenido');


            } else {

              //si en los datos del usario logueado el id_admnistrador tiene un valor 
              //entonces el usuario sera redirigido a principal.
              this.router.navigate(['/clínicaunahtec/principal']);
              this.showError('Bienvenido');

            }

          }, (error) => {

            console.log(error);

          });


        }

      });


    }



  }


  //EVENTO CUANDO SE DA ENTER
  onKeydown1(event) {
    if (event.key === "Enter") {
      this.hide = false;
    }
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.continuar();
    }
  }

  //EVENTO CUANDO SE DA EN EL BOTON
  comprobarDatos() {
    this.continuar();
    this.hide = true;
  }

  get cuenta() { return this.login_form.get('cuenta') };
  get ControlClave() { return this.login_form.get('clave') };

}


@Component({
  selector: 'loginayuda',
  templateUrl: 'dialog-login-ayuda.html',
  styleUrls: ['dialog-login-ayuda.css'],
})

export class Loginayuda {
  constructor() {

  }
} 