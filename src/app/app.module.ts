import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NavbarComponent} from './templates/navbar/navbar.component';
import {FooterComponent} from './templates/footer/footer.component';
import {HomeComponent} from './home/home.component';
import {IndexService} from './service/index.service';
import {MatCardModule} from '@angular/material/card';
import {LoginComponent} from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {LoginPageComponent} from './login/login-page/login-page.component';
import {RegisterPageComponent} from './login/register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {LoginGuardService} from './auth/login-guard.service';
import {HttpInterceptor} from './interceptor/http.interceptor';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminComponent} from './admin/admin.component';
import {RoleGuardService} from './auth/role-guard.service';
import {RoleService} from './auth/role.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {EditUserModalComponent} from './edit-user-modal/edit-user-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';
import {MatPaginatorIntlService} from './service/mat-paginator-intl.service';
import {UniqueUsernameValidator} from './validator/unique-username.validator';
import {ErrorComponent} from './error/error.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.baseUrl + 'lexicon?lang=', '');
}

export function createCustomMatPaginatorIntl(translateService: TranslateService) {
  return new MatPaginatorIntlService(translateService);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardComponent,
    AdminComponent,
    EditUserModalComponent,
    ConfirmationDialogComponent,
    ErrorComponent
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
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
    }),
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatGridListModule
  ],
  providers: [IndexService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService, AuthService, AuthGuardService, RoleService, RoleGuardService, LoginGuardService, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    }, {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      }
    }, {provide: MatPaginatorIntl, deps: [TranslateService], useFactory: createCustomMatPaginatorIntl},
    UniqueUsernameValidator, DatePipe],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
