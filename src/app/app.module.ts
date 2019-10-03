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

const routes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'loginadmin', component: LoginadminComponent}

]; 

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    LoginComponent,
    PrincipalComponent,
    LoginadminComponent
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
