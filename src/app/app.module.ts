import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Route} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { At1Component } from './at1/at1.component';
import { DatoPacienteComponent } from './dato-paciente/dato-paciente.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ListadoEstudiantesComponent } from './listado-estudiantes/listado-estudiantes.component';
import { ListadoTrabajadoresComponent } from './listado-trabajadores/listado-trabajadores.component';
import { ListadoVisitantesComponent } from './listado-visitantes/listado-visitantes.component';
import { ListadoProseneComponent } from './listado-prosene/listado-prosene.component';
import { VerPacienteComponent } from './ver-paciente/ver-paciente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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







const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'at1', component: At1Component},
  {path: 'datoPaciente/:id', component: DatoPacienteComponent},
  {path: 'datoPaciente', component: DatoPacienteComponent},

  {path: 'loginadmin', component: LoginadminComponent},
  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
      {path: 'at1', component: At1Component},
      {path: 'registro', component: PacienteComponent},
      {path: 'listadoEstudiantes', component: ListadoEstudiantesComponent},
      {path: 'listadotrabajadores', component: ListadoTrabajadoresComponent},
      {path: 'listadoVisitantes', component: ListadoVisitantesComponent},
      {path: 'listadoProsene', component: ListadoProseneComponent},
      {path: 'verPaciente', component: VerPacienteComponent},
      {path: 'verPaciente/:id', component: VerPacienteComponent}

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
    VerPacienteComponent ,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPasswordToggleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

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
    MatTableModule
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
