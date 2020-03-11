import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatDialog, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { DialogoVerificarPermisoComponent } from '../dialogo-verificar-permiso/dialogo-verificar-permiso.component';
import { Login } from '../interfaces/login';
import { LoginadminService } from '../services/loginadmin.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {

  cambiarContraForm = new FormGroup({

    contraseniaActual: new FormControl('', [Validators.minLength(5), Validators.maxLength(30)]),
    contraseniaNueva: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),
    confirmarContrasenia: new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]),

  });

  esconderContraActual: boolean = true;
  esconderContraNueva: boolean = true;
  esconderContraConfirmada: boolean = true;

  login: Login = {
    cuenta: null,
    password: null
  };



  constructor(
    private loginService: LoginService,
    private loginAdminService: LoginadminService,
    private dialogo: MatDialog,
    private mensaje: MatSnackBar
  ) { }

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 2000;
    this.mensaje.open(message, null, config);
  }


  llamarDialgo() {

    console.log(this.loginService.idActualizar);

    if (this.cambiarContraForm.valid) {

      if (this.contraseniaNueva.value == this.confirmarContrasenia.value) {


        var datos = {

          'cuenta': this.loginAdminService.datosAdministrador.usuario,
          'password': this.contraseniaActual.value,

        };

        this.loginService.obtenerUsuario(datos).subscribe((result: any) => {

          if (result.codigoError == 1) {

            this.showError('La contraseña actual no es la correcta');

          } else {

            const dialogRef = this.dialogo.open(DialogoVerificarPermisoComponent, {
              disableClose: true,
              panelClass: 'verificar',

            });

            dialogRef.afterClosed().subscribe(confirmacion => {

              if (confirmacion) {


                datos.password = this.contraseniaNueva.value;

                this.loginService.actualizarDatos(datos).subscribe((result: any) => {

                  this.showError('Contraseña actualizada con exito');

                }, (error) => {

                  console.log(error);
                  
                })

              }
            });


          }

        }, (error) => {

          console.log(error);


        });

      } else {

        this.showError('Las contraseñas no coinciden');

      }

    }

  }



  ngOnInit() {
  }

  get contraseniaActual() { return this.cambiarContraForm.get('contraseniaActual') };
  get contraseniaNueva() { return this.cambiarContraForm.get('contraseniaNueva') };
  get confirmarContrasenia() { return this.cambiarContraForm.get('confirmarContrasenia') };

}
