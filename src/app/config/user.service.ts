import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UserList} from '../model/user-list';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(page: number, size: number, sort: string, sortDirection: string): Observable<UserList> {
    return this.http.get<UserList>(environment.baseUrl + 'user/', {
      headers: {Authorization: localStorage.getItem('jwt')},
      params: new HttpParams().set('page', String(page)).set('size', String(size)).set('sortColumn', sort).set('sortOrder', sortDirection)
    }).pipe(
      map(res => new UserList().deserialize(res))
    );
  }

}