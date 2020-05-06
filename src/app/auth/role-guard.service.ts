import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {RoleService} from './role.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router, private roleService: RoleService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated() || (!this.roleService.hasRole(route.data.expectedRole))) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
