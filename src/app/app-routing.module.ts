import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './config/auth/auth-guard.service';
import {LoginGuardService} from './config/auth/login-guard.service';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [{path: '', component: HomeComponent}, {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoginGuardService]
}, {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AppRoutingModule {
}
