import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { RouterModule, Route} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { At1Component } from './at1/at1.component';
import { DatoPacienteComponent } from './dato-paciente/dato-paciente.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ListadoEstudiantesComponent } from './listado-estudiantes/listado-estudiantes.component';

const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'at1', component: At1Component},
  {path: 'datoPaciente', component: DatoPacienteComponent},

  {path: 'loginadmin', component: LoginadminComponent},

  {path: 'at1', component: At1Component},
  
  {path: 'registroPaciente', component: PacienteComponent},
  {path: 'listadoEstudiantes', component: ListadoEstudiantesComponent}
 
  

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
    ListadoEstudiantesComponent ,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgxPasswordToggleModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
