import { Component, OnInit, RootRenderer } from '@angular/core';
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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
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

  constructor(private LoginAdminService: LoginadminService, private loginService: LoginService, private medicosService: MedicosService,
    private router: Router, private activar: AppComponent, private formularioService: FormularioService, private mensaje: MatSnackBar) {
    activar.esconder();


    // cada vez que el usuario se devuelva al login borro los token para que tenga
    // que volver a loguearse y crear otro nuevo token.
    if (localStorage.getItem('token_paciente')) {
      
      localStorage.removeItem('token_paciente');

    } else if(localStorage.getItem('token_administrador')){

      localStorage.removeItem('token_administrador');

    } else{

      localStorage.removeItem('token_medico');

    }

    // this.LoginAdminService.getAdmin().subscribe((data: LoginAdmin[]) => {
    //   this.login_admins = data;
    //   console.log(this.login_admins);
    // }, (error: any) => {
    //   console.log(error);
    // });

    // this.medicosService.obtenerMedicos().subscribe((data: Medicos[]) => {
    //   this.medicos = data;
    //   console.log(this.medicos);
    // }, (error: any) => {
    //   console.log(error);
    // });

    // formularioService.obtenerPacientes().subscribe((data: Paciente[]) => {
    //   this.pacientes = data;
    //   console.log(this.pacientes);
    // }, (error) => {
    //   console.log(error);
    // });
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }

  ngOnInit() { }

  //FUNCION QUE HACE TODO EL MACANEO
  continuar() {

    let id_administrador: any;
    let id_medico: any;

    this.hide = false;
    this.loading = true;
    this.loginService.porMientras = this.clave.value;

    //pacientes

    //verifico en la base de datos si el usuario fue logueado ya anteriormente ó es primera vez.
    this.loginService.obtenerUsuario(this.cuenta.value, this.clave.value).subscribe((data: any) => {


      //si el resultado arroja un valor diferente de null, entonces el usuario existe en la base de datos.
      if (data != null) {

        if (data.id_administrador) {
          id_administrador = data.id_administrador
        } else if (data.id_medico) {
          id_medico = data.id_medico;
        }


        //si el resultado arroja un valor difente a contrasenia incorrecta entonces el usuario esta verificado y
        //puede loguearse correctamente
        if (data != 'contrasenia incorrecta') {


          //establezco a la interfaz login el atributo cuenta y password 
          //los valores que el usuario ingresa una vez que se sabe que son veridicos.
          this.login.cuenta = this.cuenta.value;
          this.login.password = this.clave.value;

          // si el usuario ya se encuentra registrado entonces solo se logueára.
          this.loginService.loguear(this.login).subscribe((data: any) => {


            //guardo el token en el localstorage para poder obtenerlo despues.
            if (id_administrador) {

              localStorage.setItem("token_administrador", data.token);


            } else if (id_medico) {

              localStorage.setItem("token_medico", data.token);


            } else {

              localStorage.setItem("token_paciente", data.token);

            }

            //si en los datos del usario logueado el id_admnistrador tiene un valor 
            //entonces el usuario sera redirigido a principal.
            if (id_administrador) {

              this.router.navigate(['/principal/principal1']);
              this.showError('Bienvenido');

              //si en los datos del usuario logueado el id_medico tiene un valor
              //entonces el usuario sera redirigido a principal.
            } else if (id_medico) {

              this.router.navigate(['/principal/principal1']);
              this.showError('Bienvenido');

            } else {

              //recupero al paciente introduciendo su numero de cuenta para poder recuperar su id
              // y redireccionarlo a su respectivo informacion.

              this.formularioService.obtenerPacientePorCuenta(this.cuenta.value).subscribe((data: Paciente) => {
                this.paciente = data;

                this.router.navigate(['/datoPaciente/' + this.paciente.id_paciente]);
                this.showError('Bienvenido');
              });

            }




          });


          // si el resultado arroja que la contrasenia es incorrecta el usuario existe en la base
          // de datos pero su contrasenia no es correcta.
        } else {
          // console.log(this.medico.contraseniaM); console.log(this.login.cuenta);
          this.loading = false;
          this.showError('Contraseña Incorrecta');
        }


        // si el resultado arroja null entonces el usuario no existe en la base de datos
        // por lo que es nuevo y tiene que hacer su registro correspondiente.
      } else {

        this.login.cuenta = this.cuenta.value;
        this.login.password = this.clave.value;

        // si el usuario es nuevo entonces lo registro.
        this.loginService.guardarDatos(this.login).subscribe((data: any) => {

          //guardo el token en el localstorage para poder obtenerlo despues.
          localStorage.setItem("token_paciente", data.token);

          this.showError('Llene el siguiente formulario');
          this.router.navigate(['/formulario']);

        }, (error) => {

          this.loading = false;
          console.log(error);
          this.showError('Cuenta incorrecta');
        });

      }

    });

    // for (let index = 0; index < this.pacientes.length; index++) {
    //   if (this.pacientes[index].numero_cuenta == this.login.cuenta || this.pacientes[index].numero_identidad == this.login.cuenta) {
    //     this.pase = false;
    //     this.paciente = this.pacientes[index];
    //   }
    // }

    // if (this.pase == true) {

    //   this.login.cuenta = this.cuenta.value;
    //   this.login.password = this.clave.value;

    //   // si el usuario es nuevo entonces lo registro.
    //   this.loginService.guardarDatos(this.login).subscribe((data: any) => {
    //     //guardo el token en el localstorage para poder obtenerlo despues.
    //     localStorage.setItem("token", data.token);
    //     this.showError('Llene el siguiente formulario');
    //     this.router.navigate(['/formulario']);
    //   }, (error) => {
    //     this.loading = false;
    //     console.log(error);
    //     this.showError('Cuenta incorrecta');
    //   });

    // } else {

    // this.loginService.encryptarPassword(this.clave.value).subscribe((data)=>{
    //   this.clave.setValue(data);

    //   console.log('esta es la clave: \n'+data);

    //   if(this.login.password == data){
    //     console.log('true');
    //   }else{
    //     console.log('false');
    //   }

    // });

    //   console.log('esta es el password: \n'+ this.login.password);

    //   // this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);


    //   if (this.login.password == this.clave.value) {

    //     // si el usuario ya se encuentra registrado entonces solo se logueára.
    //     this.loginService.loguear(this.login).subscribe((data: any) => {
    //       //guardo el token en el localstorage para poder obtenerlo despues.
    //       localStorage.setItem("token", data.token);

    //       this.router.navigate(['/datoPaciente/' + this.paciente.id_paciente]);
    //       this.showError('Bienvenido');
    //     })

    //   } else {
    //     this.loading = false;
    //     this.showError('Contraseña Incorrecta');
    //   }
    // }

    //medicos

    // for (let indexx = 0; indexx < this.medicos.length; indexx++) {
    //   if (this.medicos[indexx].usuarioM == this.login.cuenta) {
    //     this.medico = this.medicos[indexx];
    //     if (this.medico.contraseniaM == this.login.password) {
    //       console.log(this.medico.contraseniaM); console.log(this.login.cuenta);
    //       this.showError('Bienvenido Medico');
    //       this.router.navigate(['/principal/principal1']);
    //     } else {
    //       console.log(this.medico.contraseniaM); console.log(this.login.cuenta);
    //       this.loading = false;
    //       this.showError('Contraseña Incorrecta');
    //     }
    //   }
    // }

    // //administradores
    // for (let indexx = 0; indexx < this.login_admins.length; indexx++) {
    //   if (this.login_admins[indexx].usuario_admin == this.login.cuenta) {
    //     this.login_admin = this.login_admins[indexx];
    //     if (this.login_admin.contrasenia_admin == this.login.password) {
    //       console.log(this.login_admin.contrasenia_admin); console.log(this.login.cuenta);
    //       this.showError('Bienvenido Administrador');
    //       this.router.navigate(['/principal/principal1']);
    //     } else {
    //       console.log(this.login_admin.contrasenia_admin); console.log(this.login.cuenta);
    //       this.loading = false;
    //       this.showError('Contraseña Incorrecta');
    //     }
    //   }
    // }
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
  get clave() { return this.login_form.get('clave') };
}