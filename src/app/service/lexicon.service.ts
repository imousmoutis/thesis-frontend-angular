import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Language} from '../model/language';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LexiconService {

  constructor(private http: HttpClient) {
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(environment.baseUrl + 'lexicon/languages').pipe(
      map(data => data.map(language => new Language().deserialize(language)))
    );
  }

}
