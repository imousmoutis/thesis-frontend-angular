import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthSharedService} from './auth-shared.service';

@Injectable()
export class RoleService {

  userRole: string;

  constructor(private jwtHelperService: JwtHelperService, private authSharedService: AuthSharedService) {

    this.authSharedService.userRole.subscribe(data => {
      this.userRole = data;
    });

    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const decodedJwt = this.jwtHelperService.decodeToken(jwt);
      this.authSharedService.setUserLoggedIn(true, decodedJwt.sub, decodedJwt.role1);
    }
  }

  public hasRole(expectedRole: string): boolean {
    return expectedRole === this.userRole;
  }

}
