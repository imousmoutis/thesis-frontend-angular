import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getServerStatus(): Observable<string> {
    return this.http.get(environment.baseUrl, {responseType: 'text'})
    .pipe(
      retry(1),
      catchError(this.errorHandle)
    );
  }

  login(user): Observable<any> {
    return this.http.post(environment.baseUrl + 'login', user, {observe: 'response'})
    .pipe(
      catchError(this.errorHandle)
    );
  }

  register(user): Observable<string> {
    return this.http.post(environment.baseUrl + 'register', user, {responseType: 'text'})
    .pipe(
      catchError(this.errorHandle)
    );
  }

  errorHandle(error) {
    if (error.status === 403) {
      console.log('dude');
    } else {
      console.log('EI');
    }
    return throwError(error);
  }
}
