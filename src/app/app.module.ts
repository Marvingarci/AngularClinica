import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent, Loginayuda,DialogoRecuperarContrasenia } from './login/login.component';
import { PrincipalComponent, DialogCerrarSesion2 } from './principal/principal.component';
import { LoginadminComponent, DialogoCambiarContraseniaAdmin, /*DialogoVerificar*/ } from './loginadmin/loginadmin.component';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { At1Component } from './at1/at1.component';
import { DatoPacienteComponent, cambiocontraDialog, actualizarcontraDialog, DialogCerrarSesion, verificarDialog, CambiarFoto1 } from './dato-paciente/dato-paciente.component';
import { PacienteComponent } from './paciente/paciente.component';
import { VerPacienteComponent, HistoriaSubsiguiente1, Borrartelefonoemergencia,Borrartelefono, BorrarDesnutricionAF, BorrarDesnutricionAP, BorrarHospitalarias, CambiarFoto, BorrarHabitoToxicologico } from './ver-paciente/ver-paciente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InventarioComponent } from './inventario/inventario.component';
import { FormInventarioComponent } from './form-inventario/form-inventario.component';




//Material Angular
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTableModule} from '@angular/material'
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PaseAdminComponent } from './pase-admin/pase-admin.component';
import { VerAdministradoresComponent, Borraradministrador, DialogoMedico } from './ver-administradores/ver-administradores.component';
import { MatBadgeModule } from '@angular/material/badge';
import { RegistromedicosComponent, DialogoCambiarContraseniaMed } from './registromedicos/registromedicos.component';
import { Principal1Component } from './principal1/principal1.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConsolidadodiarioComponent } from './consolidadodiario/consolidadodiario.component';
import { TelefonoUnicoDirective } from './validations/telefono-unico.directive';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatPaginatorModule } from "@angular/material/paginator";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


//graficas

import { NgxChartsModule } from '@swimlane/ngx-charts';



// Interceptors
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthPacienteGuard } from './guards/auth-paciente.guard';
import { UsuarioAdminUnicoDirective } from './validations/usuario-admin-unico.directive';
import { UsuarioMedicoUnicoDirective } from './validations/usuario-medico-unico.directive';
import { AuthAdministradorGuard } from './guards/auth-administrador.guard';
import { FocusInvalidoInputDirective } from './focus/focus-invalido-input.directive';

//importacion para los focus


//Tablas
import { ChartsModule } from 'ng2-charts';
import { IdentidadUnicaDirective } from './validations/identidad-unica.directive';
import { DialogoVerificarPermisoComponent } from './dialogo-verificar-permiso/dialogo-verificar-permiso.component';

//Camara
import { WebcamModule } from 'ngx-webcam';


// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
// import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import pdfFonts from "../assets/custom-fonts";
import { AyudaComponent } from './ayuda/ayuda.component';
import { LayoutModule } from '@angular/cdk/layout';
import { EstadisticasFisicasPacienteComponent } from './estadisticas-fisicas-paciente/estadisticas-fisicas-paciente.component';
import { CuentaUnicaDirective } from './validations/cuenta-unica.directive';
import { ChatComponent } from './chat/chat.component';


//firebase

import {AngularFireDatabaseModule} from 'angularfire2/database'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFireModule} from 'angularfire2'
import {environment} from '../environments/environment';
import { RecuperarContraseniaComponent } from './recuperar-contrasenia/recuperar-contrasenia.component'



//import { DialogoVerCitasComponent } from './dialogo-ver-citas/dialogo-ver-citas.component'; // custom fonts

// Set the fonts to use
// Configuring custom fonts
PdfMakeWrapper.setFonts(pdfFonts, {

  arial: {
    normal: 'arial.ttf',
    bold: 'arial.ttf',
    italics: 'arial.ttf',
    bolditalics: 'arial.ttf'
  }

});

PdfMakeWrapper.useFont('arial');


const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'formulario:id', component: FormularioComponent },
  { path: 'clínicaunahtec', component: PrincipalComponent, canActivate: [AuthAdministradorGuard] },
  { path: 'at1', component: At1Component, canActivate: [AuthAdministradorGuard] },
  { path: 'datoPaciente/:id', component: DatoPacienteComponent, canActivate: [AuthPacienteGuard] },
  { path: 'datoPaciente', component: DatoPacienteComponent, canActivate: [AuthPacienteGuard] },
  { path: 'verPaciente/:id', component: VerPacienteComponent, canActivate: [AuthAdministradorGuard] },
  { path: 'inventario', component: InventarioComponent, canActivate: [AuthAdministradorGuard] },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'recuperarcontrasenia/:id', component: RecuperarContraseniaComponent },



  { path: 'loginadmin', component: LoginadminComponent, canActivate: [AuthAdministradorGuard] },
  { path: 'paseadmin', component: PaseAdminComponent, canActivate: [AuthAdministradorGuard] },
  { path: 'veradministradores', component: VerAdministradoresComponent, canActivate: [AuthAdministradorGuard] },
  { path: 'consolidadodiario', component: ConsolidadodiarioComponent, canActivate: [AuthAdministradorGuard] },

  {
    path: 'clínicaunahtec',
    component: PrincipalComponent,
    canActivate: [AuthAdministradorGuard],
    children: [
      { path: 'at1', component: At1Component },
      { path: 'registro', component: PacienteComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'paseadmin', component: PaseAdminComponent },
      { path: 'veradministradores', component: VerAdministradoresComponent },
      { path: 'veradministradores/:id', component: VerAdministradoresComponent },
      { path: 'loginadmin', component: LoginadminComponent },
      { path: 'loginadmin/:id', component: LoginadminComponent },
      { path: 'formInventario', component: FormInventarioComponent },
      { path: 'formInventario/:id', component: FormInventarioComponent },
      { path: 'registromedicos', component: RegistromedicosComponent },
      { path: 'registromedicos/:id', component: RegistromedicosComponent },
      { path: 'principal', component: Principal1Component },
      { path: 'verPaciente/:id', component: VerPacienteComponent },
      { path: 'formulario', component: FormularioComponent },
      { path: 'consolidado', component: ConsolidadodiarioComponent },
      // {path: 'verPaciente', component: VerPacienteComponent},
      { path: 'ayuda', component: AyudaComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'recuperarcontrasenia/:id', component: RecuperarContraseniaComponent },


    ]
  }



];

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    LoginComponent,
    PrincipalComponent,
    At1Component,
    DatoPacienteComponent,
    LoginadminComponent,
    At1Component,
    PacienteComponent,
    VerPacienteComponent,
    cambiocontraDialog,
    InventarioComponent,
    actualizarcontraDialog,
    verificarDialog,
    DialogCerrarSesion,
    HistoriaSubsiguiente1,
    Borraradministrador,
    DialogCerrarSesion2,
    PaseAdminComponent,
    VerAdministradoresComponent,
    FormInventarioComponent,
    RegistromedicosComponent,
    Principal1Component,
    ConsolidadodiarioComponent,
    TelefonoUnicoDirective,
    DialogoMedico,
    Borrartelefonoemergencia,
    Borrartelefono,
    BorrarDesnutricionAF,
    BorrarDesnutricionAP,
    BorrarHospitalarias,
    BorrarHabitoToxicologico,
    UsuarioAdminUnicoDirective,
    UsuarioMedicoUnicoDirective,
    FocusInvalidoInputDirective,
    IdentidadUnicaDirective,
    DialogoVerificarPermisoComponent,
    CambiarFoto,
    DialogoCambiarContraseniaAdmin,
    DialogoCambiarContraseniaMed,
    AyudaComponent,
    Loginayuda,
    DialogoRecuperarContrasenia,
    EstadisticasFisicasPacienteComponent,
    CuentaUnicaDirective,
    CambiarFoto1,
    ChatComponent,
    RecuperarContraseniaComponent,
  








  ],
  imports: [
    [NgxMaterialTimepickerModule],
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPasswordToggleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatCardModule,
    MatRadioModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    ChartsModule,
    WebcamModule,
    MatCheckboxModule,
    MatTooltipModule,
    NgxChartsModule,
    MatGridListModule,
    MatPaginatorModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,



    //esto es de los focus



  ],
  entryComponents: [
    cambiocontraDialog,
    actualizarcontraDialog,
    verificarDialog,
    DialogCerrarSesion,
    HistoriaSubsiguiente1,
    Borraradministrador,
    DialogCerrarSesion2,
    DialogoMedico,
    DialogoVerificarPermisoComponent,
    CambiarFoto,
    Borrartelefonoemergencia,
    Borrartelefono,
    DialogoVerificarPermisoComponent,
    DialogoCambiarContraseniaAdmin,
    DialogoCambiarContraseniaMed,
    BorrarDesnutricionAF,
    BorrarDesnutricionAP,
    BorrarHospitalarias,
    BorrarHabitoToxicologico,
    DialogoVerificarPermisoComponent,
    Loginayuda,
    DialogoRecuperarContrasenia,
    CambiarFoto1
    //DialogoVerCitasComponent
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // },
    CambiarFoto,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
