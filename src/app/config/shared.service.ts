import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LoginUserDTO} from '../dto/login-user-dto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  sendClickEvent(user: LoginUserDTO) {
    this.subject.next(user);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
