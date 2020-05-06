import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) {
  }

  getServerStatus(): Observable<string> {
    return this.http.get(environment.baseUrl, {responseType: 'text'});
  }

  login(user): Observable<any> {
    return this.http.post(environment.baseUrl + 'login', user, {observe: 'response'});
  }

  register(user): Observable<string> {
    return this.http.post(environment.baseUrl + 'register', user, {responseType: 'text'});
  }

  logout(): Observable<any> {
    return this.http.delete(environment.baseUrl + 'logout/', {headers: {Authorization: localStorage.getItem('jwt')}});
  }
}
