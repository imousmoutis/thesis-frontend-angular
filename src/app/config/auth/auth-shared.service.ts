import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LoginUserDto} from '../../dto/login-user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {

  private loginRequestSubject = new Subject<any>();

  userLoggedIn: Subject<boolean> = new Subject<boolean>();

  userRole: Subject<string> = new Subject();

  username: string;

  sendLoginRequest(user: LoginUserDto) {
    this.loginRequestSubject.next(user);
  }

  loginRequest(): Observable<any> {
    return this.loginRequestSubject.asObservable();
  }

  setUserLoggedIn(loggedIn: boolean, username: string, userRole: string) {
    this.userLoggedIn.next(loggedIn);
    this.userRole.next(userRole);
    this.username = username;
  }
}
