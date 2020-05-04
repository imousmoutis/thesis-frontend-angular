import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NavbarComponent} from './templates/navbar/navbar.component';
import {FooterComponent} from './templates/footer/footer.component';
import {HomeComponent} from './home/home.component';
import {HomeService} from './config/home.service';
import {MatCardModule} from '@angular/material/card';
import {LoginComponent} from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {LoginPageComponent} from './login/login-page/login-page.component';
import {RegisterPageComponent} from './login/register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './config/auth/auth-guard.service';
import {AuthService} from './config/auth/auth.service';
import {LoginGuardService} from './config/auth/login-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HomeService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService, AuthService, AuthGuardService, LoginGuardService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
