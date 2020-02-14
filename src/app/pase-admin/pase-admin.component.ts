import { Component, OnInit, RootRenderer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../interfaces/login';
import { AppComponent } from "../app.component";
import { Paciente } from "../interfaces/paciente";
import { PacienteComponent } from '../paciente/paciente.component';
import { FormularioService } from '../services/formulario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginAdmin } from '../interfaces/login_admin';
import { LoginadminService } from '../services/loginadmin.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pase-admin',
  templateUrl: './pase-admin.component.html',
  styleUrls: ['./pase-admin.component.css']
})

export class PaseAdminComponent implements OnInit {
  hide = true;
  loading: boolean = false;

  //,Validators.pattern(/^[2][0-9]{10}$/)
  login_form = new FormGroup({
    cuenta: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });
  login: Login = {
    cuenta: null,
    password: null
  };
  login_admin: LoginAdmin
  login_admins: LoginAdmin[];

  constructor(private LoginAdminService: LoginadminService, private loginService: LoginService,
    private router: Router, private activar: AppComponent, private mensaje: MatSnackBar) {
    activar.esconder();


    // this.LoginAdminService.getAdmin().subscribe((data: LoginAdmin[]) => {
    //   this.login_admins = data;
    //   console.log(this.login_admins);
    // }, (error: any) => {
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

  loguear() {

    this.hide = false;
    this.loading = true;

    this.loginService.obtenerUsuario(this.cuenta.value, this.clave.value).subscribe((data: any) => {

      if (data != null) {

        if (data != 'contrasenia incorrecta') {

          this.login.cuenta = this.cuenta.value;
          this.login.password = this.clave.value;


          this.loginService.loguear(this.login).subscribe((data: any) => {

            this.router.navigate(['/principal/veradministradores']);

          }, (error) => {
            console.log(error);
          });
        } else {

          this.loading = false;
          this.showError('Cuenta incorrecta');

        }

      } else {
        this.loading = false;
        this.showError('El usuario no existe');
      }

    });

  }

  //CLICK ENTER
  onKeydown(event) {

    if (event.key === "Enter") {

      this.loguear();

    }
    
  }

  //CLICK BOTON
  comprobarDatos() {

    this.loguear();

  }

  get cuenta() { return this.login_form.get('cuenta') };
  get clave() { return this.login_form.get('clave') };
}