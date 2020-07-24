import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ExpenseCategory} from '../model/expense-category';
import {Expense} from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {
  }

  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return this.http.get<ExpenseCategory[]>(environment.baseUrl + 'expense/categories', {
      headers: {Authorization: localStorage.getItem('jwt')}
    }).pipe(
      map(data => data.map(expenseCategory => new ExpenseCategory().deserialize(expenseCategory)))
    );
  }

  saveExpense(expense: Expense): Observable<any> {
    return this.http.post(environment.baseUrl + 'expense', expense, {
      headers: {Authorization: localStorage.getItem('jwt')}
    });
  }

}
