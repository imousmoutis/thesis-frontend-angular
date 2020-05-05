import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LoginUserDTO} from '../../dto/login-user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {

  private loginRequestSubject = new Subject<any>();

  userLoggedIn: Subject<boolean> = new Subject<boolean>();

  userRole: Subject<string> = new Subject();

  username: Subject<string> = new Subject();

  sendLoginRequest(user: LoginUserDTO) {
    this.loginRequestSubject.next(user);
  }

  loginRequest(): Observable<any> {
    return this.loginRequestSubject.asObservable();
  }

  setUserLoggedIn(loggedIn: boolean, username: string, userRole: string) {
    this.userLoggedIn.next(loggedIn);
    this.userRole.next(userRole);
    this.username.next(username);
  }
}
