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
import { At1Component } from './at1/at1.component';
import { DatoPacienteComponent } from './dato-paciente/dato-paciente.component';

const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'at1', component: At1Component},
  {path: 'datoPaciente', component: DatoPacienteComponent}

]; 

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    LoginComponent,
    PrincipalComponent,
    At1Component,
    DatoPacienteComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
