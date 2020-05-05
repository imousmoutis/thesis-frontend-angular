import {Injectable} from '@angular/core';
import {AuthSharedService} from './auth-shared.service';

@Injectable()
export class AuthService {

  userLoggedIn: boolean;

  constructor(private authSharedService: AuthSharedService) {
    this.authSharedService.userLoggedIn.subscribe(data => {
      this.userLoggedIn = data;
    });
  }

  public isAuthenticated(): boolean {
    return this.userLoggedIn;
  }

}
