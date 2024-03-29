import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UserList} from '../model/user-list';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(page: number, size: number, sort: string, sortDirection: string, username: string): Observable<UserList> {
    return this.http.get<UserList>(environment.baseUrl + 'user', {
      headers: {Authorization: localStorage.getItem('jwt')},
      params: new HttpParams().set('page', String(page)).set('size', String(size)).set('sortColumn', sort).set('sortOrder',
        sortDirection).set('username', username)
    }).pipe(
      map(res => new UserList().deserialize(res))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.post(environment.baseUrl + 'user', user, {
      headers: {Authorization: localStorage.getItem('jwt')}
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(environment.baseUrl + 'user/' + userId, {
      headers: {Authorization: localStorage.getItem('jwt')}
    });
  }

  uniqueUser(term: string): Observable<boolean> {
    return this.http.get<boolean>(environment.baseUrl + 'user/unique', {
      params: new HttpParams().set('term', term)
    });
  }

}
