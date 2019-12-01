import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Route} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent, DialogContentExampleDialog1} from './principal/principal.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { At1Component } from './at1/at1.component';
import { DatoPacienteComponent, DialogContentExampleDialog,DialogContentExampleDialog2 } from './dato-paciente/dato-paciente.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ListadoEstudiantesComponent, HistoriaSubsiguiente } from './listado-estudiantes/listado-estudiantes.component';
import { ListadoTrabajadoresComponent } from './listado-trabajadores/listado-trabajadores.component';
import { ListadoVisitantesComponent } from './listado-visitantes/listado-visitantes.component';
import { ListadoProseneComponent } from './listado-prosene/listado-prosene.component';
import { VerPacienteComponent , HistoriaSubsiguiente1} from './ver-paciente/ver-paciente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material'  
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { PaseAdminComponent } from './pase-admin/pase-admin.component';
import { VerAdministradoresComponent } from './ver-administradores/ver-administradores.component';
import { BorraradministradorComponent } from './borraradministrador/borraradministrador.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MedicosComponent } from './medicos/medicos.component';
import { RegistromedicosComponent } from './registromedicos/registromedicos.component';
import { BorrarMedicoComponent } from './borrar-medico/borrar-medico.component';
import { Principal1Component } from './principal1/principal1.component';










const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'formulario:id', component: FormularioComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'at1', component: At1Component},
  {path: 'datoPaciente/:id', component: DatoPacienteComponent},
  {path: 'datoPaciente', component: DatoPacienteComponent},
  {path: 'verPaciente/:id', component: VerPacienteComponent},
  {path: 'inventario', component: InventarioComponent},
  //{path: 'formInventario', component: FormInventarioComponent},
  {path: 'listadoEstudiantes/:id', component: ListadoEstudiantesComponent},



  {path: 'loginadmin', component: LoginadminComponent},
  {path: 'paseadmin', component: PaseAdminComponent},  
  {path: 'veradministradores', component: VerAdministradoresComponent},

  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
      {path: 'at1', component: At1Component},
      {path: 'registro', component: PacienteComponent},
      {path: 'listadotrabajadores', component: ListadoTrabajadoresComponent},
      {path: 'listadoVisitantes', component: ListadoVisitantesComponent},
      {path: 'listadoProsene', component: ListadoProseneComponent},
      {path: 'inventario', component: InventarioComponent},
      {path: 'paseadmin', component: PaseAdminComponent},
      {path: 'veradministradores', component: VerAdministradoresComponent},
      {path: 'veradministradores/:id', component: VerAdministradoresComponent},
      {path: 'borraradministradores/:id', component: BorraradministradorComponent},
      {path: 'borrarmedico/:id', component: BorrarMedicoComponent},
      {path: 'loginadmin', component: LoginadminComponent},
      {path: 'loginadmin/:id', component: LoginadminComponent},
      {path: 'formInventario', component: FormInventarioComponent},
      {path: 'formInventario/:id', component: FormInventarioComponent},
      {path: 'medicos', component: MedicosComponent},      
      {path: 'registromedicos', component: RegistromedicosComponent},
      {path: 'registromedicos/:id', component: RegistromedicosComponent},
      {path: 'principal1', component: Principal1Component},
      {path: 'verPaciente/:id', component: VerPacienteComponent},
      // {path: 'verPaciente', component: VerPacienteComponent},
      // {path: 'verPaciente/:id', component: VerPacienteComponent}

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
    ListadoEstudiantesComponent,
    ListadoTrabajadoresComponent,
    ListadoVisitantesComponent,
    ListadoProseneComponent,
    VerPacienteComponent,
    DialogContentExampleDialog,
    InventarioComponent,
    DialogContentExampleDialog1,
    DialogContentExampleDialog2,
    HistoriaSubsiguiente,
    HistoriaSubsiguiente1,




    
    PaseAdminComponent,
    VerAdministradoresComponent,

    FormInventarioComponent,

    BorraradministradorComponent,

    MedicosComponent,
    RegistromedicosComponent,
    BorrarMedicoComponent,
    Principal1Component,

    
  ],
  imports: [
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
    MatSnackBarModule
    ,MatSidenavModule,
    MatBadgeModule
  
    
  ],
  entryComponents: [
    DialogContentExampleDialog,
    DialogContentExampleDialog1,
    DialogContentExampleDialog2,
    HistoriaSubsiguiente,
    HistoriaSubsiguiente1
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
