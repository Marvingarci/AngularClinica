import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { LoginadminService } from '../services/loginadmin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UsuarioAdminUnicoService } from '../validations/usuario-admin-unico.directive';
import { Administrador } from '../interfaces/administrador';


export interface select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  hide1 = false;
  hide = true;
  disabledloginadmin: boolean = false;

  loginadmin_form = new FormGroup({


    usuario: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: [this.usuarioAdminUnicoService.validate.bind(this.usuarioAdminUnicoService)]
    }),


    contrasenia: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    contraseniaC: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
    identidad: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('[0-9]*')]),
  });

  getErrorMessage() {
    return this.loginadmin_form.get('usuario').hasError('required') ? 'You must enter a value' :
      this.loginadmin_form.get('usuario').hasError('usuario') ? 'Not a valid usuario' : '';
  }

  administrador: Administrador = {
    usuario: null,
    password: null,
    nombre_completo: null,
    identidad: null
  };

  id: any;
  editing: boolean = false;
  admins: Administrador[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, activar: AppComponent,
    private login_adminservice: LoginadminService, private mensaje: MatSnackBar,
    private usuarioAdminUnicoService: UsuarioAdminUnicoService) {
    activar.esconder();
    this.getdato();
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.editing = true;

      this.login_adminservice.obtenerAdministrador(this.id).subscribe((data) => {

        //establesco el valor al los formcontrol para que se visualizen en los respectivos inputs
        this.usuario.setValue(this.administrador.usuario);
        this.contrasenia.setValue(this.administrador.password);
        this.contraseniaC.setValue(this.administrador.password);
        this.nombre.setValue(this.administrador.nombre_completo);
        this.identidad.setValue(this.administrador.identidad);

        this.login_adminservice.idActualizar = this.administrador.id_administrador;

      }, (error) => {
        console.log(error);
      });

    } else {
      this.editing = false;
    }
  }//fin del constructor

  getdato() {
    this.login_adminservice.obtenerAdministradores().subscribe((data: Administrador[]) => {
      this.admins = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    });
  }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }



  ngOnInit() {
    this.getdato();
  }



  onKeydown(event) {
    if (event.key === "Enter") {
      this.hide = true;
      this.hide1 = true;
    }
  }





  comprobarDatos() {
    if (this.editing) {

      if (this.loginadmin_form.valid) {

        this.disabledloginadmin = true;
        this.administrador.password = this.contraseniaC.value;

        if (this.administrador.password == this.contrasenia.value) {

          this.administrador.usuario = this.usuario.value;
          this.administrador.password = this.contraseniaC.value;
          this.administrador.nombre_completo = this.nombre.value;
          this.administrador.identidad = this.identidad.value;

          this.login_adminservice.put(this.administrador).subscribe((data) => {
            console.log(data);
            this.router.navigate(['/principal/veradministradores']);
            this.getdato();
            this.showError('Administrador actualizado correctamente');

          }, (error) => {
            console.log(error);
            alert('se chorrio');
          });
        } else {
          this.showError('La contraseña no coincide');
        }
      } else {
        this.showError('Ingrese los datos correctamente');
      }

    } else {
      this.administrador.password = this.contraseniaC.value;
      if (this.administrador.password == this.contrasenia.value) {
        this.administrador.usuario = this.usuario.value;
        this.administrador.password = this.contraseniaC.value;
        this.administrador.nombre_completo = this.nombre.value;
        this.administrador.identidad = this.identidad.value;

        if (this.loginadmin_form.valid) {

          this.disabledloginadmin = true;

          this.login_adminservice.guardarAdministrador(this.administrador).subscribe((data) => {

            this.getdato();

            this.router.navigate(['/principal/veradministradores']);

            this.showError('Administrador creado con exito');

          }, (error) => {

            console.log(error);

          });

        } else {

          this.showError('Ingrese los datos correctamente');
        }
      }
      else {

        this.showError('La contraseña no coincide');
        
      }
    }
  }//fin del boton

  get usuario() { return this.loginadmin_form.get('usuario') };
  get contrasenia() { return this.loginadmin_form.get('contrasenia') };
  get contraseniaC() { return this.loginadmin_form.get('contraseniaC') };
  get nombre() { return this.loginadmin_form.get('nombre') };
  get identidad() { return this.loginadmin_form.get('identidad') };

}