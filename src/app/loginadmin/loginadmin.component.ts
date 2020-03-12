import { Component, OnInit, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { LoginadminService } from '../services/loginadmin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UsuarioAdminUnicoService } from '../validations/usuario-admin-unico.directive';
import { Administrador } from '../interfaces/administrador';
import { LoginService } from '../services/login.service';
import { Login } from '../interfaces/login';
import { ThemeService } from 'ng2-charts';
import { DialogoVerificarPermisoComponent } from '../dialogo-verificar-permiso/dialogo-verificar-permiso.component';


export interface select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit, AfterViewInit {

  

  esconderClave: boolean = true;
  esconderConfirmacionClave: boolean = true;

  loginadmin_form = new FormGroup({

    usuario: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: [this.usuarioAdminUnicoService.validate.bind(this.usuarioAdminUnicoService)]
    }),

    contraseniaActual: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),
    contraseniaNueva: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),
    confirmarContrasenia: new FormControl('', [ Validators.minLength(8), Validators.maxLength(30)]),
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
  editando: boolean = false;
  admins: Administrador[];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, activar: AppComponent,
    private login_adminservice: LoginadminService, private mensaje: MatSnackBar,
    public dialogo: MatDialog,
    private usuarioAdminUnicoService: UsuarioAdminUnicoService) {

    this.id = this.activatedRoute.snapshot.params['id'];

    activar.esconder();
    this.getAdministradores();

    if (this.id) {

      this.editando = true;

      this.login_adminservice.obtenerAdministrador(this.id).subscribe((data: any) => {

        this.administrador = data;
        this.login_adminservice.datosAdministrador = this.administrador;

        //establesco el valor al los formcontrol para que se visualizen en los respectivos inputs
        this.usuario.setValue(this.administrador.usuario);
        // this.contrasenia.setValue(this.administrador.password);
        this.contraseniaNueva.setValue('holahola');
        // this.contraseniaC.setValue(this.administrador.password);
        this.nombre.setValue(this.administrador.nombre_completo);
        this.identidad.setValue(this.administrador.identidad);

        this.login_adminservice.idActualizar = this.administrador.id_administrador;

      }, (error) => {
        console.log(error);
      });

    } else {

      this.editando = false;

    }
  }//fin del constructor

  getAdministradores() {

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
    this.getAdministradores();
  }

  ngAfterViewInit(){
    
    // if(this.confirmarContrasenia.value != null){

    //   this.confirmarContrasenia.setValidators(Validators.required);
    //   this.confirmarContrasenia.updateValueAndValidity();
    // }
    
  }



  // onKeydown(event) {

  //   if (event.key === "Enter") {
  //     this.esconderClave = true;
  //     this.esconderConfirmacionClave = true;
  //     this.llamarDialogo();
  //   }
  // }


  llamarDialogo() {

    if (this.loginadmin_form.valid) {


      // if (this.confirmarContrasenia.value == this.contraseniaNueva.value) {

        const dialogRef = this.dialogo.open(DialogoVerificarPermisoComponent, {
          disableClose: true,
          panelClass: 'verificar',
          data: { id: this.id, editando: this.editando, formulario: this.loginadmin_form}

        });

        dialogRef.afterClosed().subscribe(confirmacion => {

          if (confirmacion) {

            if (this.editando) {

              this.administrador.id_administrador = this.id;
              this.administrador.usuario = this.usuario.value;
              this.administrador.password = this.confirmarContrasenia.value;
              this.administrador.nombre_completo = this.nombre.value;
              this.administrador.identidad = this.identidad.value;

              this.login_adminservice.actualizarAdministrador(this.administrador).subscribe((data) => {

                this.router.navigate(['/principal/veradministradores']);
                this.getAdministradores();
                this.showError('Administrador actualizado correctamente');

              }, (error) => {
                console.log(error);
                alert('se chorrio');
              });


            } else {

              if (this.confirmarContrasenia.value == this.contraseniaNueva.value) {

                this.administrador.usuario = this.usuario.value;
                this.administrador.password = this.contraseniaNueva.value;
                this.administrador.nombre_completo = this.nombre.value;
                this.administrador.identidad = this.identidad.value;

                if (this.loginadmin_form.valid) {


                  this.login_adminservice.guardarAdministrador(this.administrador).subscribe((data) => {

                    this.getAdministradores();

                    this.router.navigate(['/principal/veradministradores']);

                    this.showError('Administrador creado con exito');

                  }, (error) => {

                    console.log(error);

                  });

                } else {

                  this.showError('Ingrese los datos correctamente');
                }

              } else {

                this.showError('La contraseña no coincide');

              }
            }

          }
        });

      // } else {

      //   this.showError('La contraseña no coincide');


      // }

    }

  }

  comprobarDatos() {

    this.llamarDialogo();

  }//fin del boton

  get usuario() { return this.loginadmin_form.get('usuario') };
  get contraseniaActual() { return this.loginadmin_form.get('contraseniaActual') };
  get contraseniaNueva() { return this.loginadmin_form.get('contraseniaNueva') };
  get confirmarContrasenia() { return this.loginadmin_form.get('confirmarContrasenia') };
  get nombre() { return this.loginadmin_form.get('nombre') };
  get identidad() { return this.loginadmin_form.get('identidad') };

}
