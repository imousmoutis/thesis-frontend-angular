import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {LoginGuardService} from './auth/login-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RoleGuardService} from './auth/role-guard.service';
import {environment} from '../environments/environment';

const routes: Routes = [{path: '', component: HomeComponent}, {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoginGuardService]
}, {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [RoleGuardService],
  data: {
    expectedRole: environment.user
  }
}, {
  path: 'admin',
  component: AdminComponent,
  canActivate: [RoleGuardService],
  data: {
    expectedRole: environment.userAdmin
  }
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AppRoutingModule {
}
