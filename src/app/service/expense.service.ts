import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ExpenseCategory} from '../model/expense-category';
import {Expense} from '../model/expense';
import {DatePipe} from '@angular/common';
import {ExpenseList} from '../model/expense-list';
import {TotalExpenses} from '../model/total-expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return this.http.get<ExpenseCategory[]>(environment.baseUrl + 'expense/categories', {
      headers: {Authorization: localStorage.getItem('jwt')}
    }).pipe(
      map(data => data.map(expenseCategory => new ExpenseCategory().deserialize(expenseCategory)))
    );
  }

  saveExpense(expense: Expense): Observable<any> {
    const parsedExpense: { date: string; amount: number; description: string; category: number } = {
      amount: expense.amount,
      date: this.datePipe.transform(expense.date, 'dd/MM/yyyy'),
      category: expense.category,
      description: expense.description
    };
    return this.http.post(environment.baseUrl + 'expense', parsedExpense, {
      headers: {Authorization: localStorage.getItem('jwt')}
    });
  }

  getUserTotalExpenses(from: string, to: string): Observable<TotalExpenses> {
    return this.http.get<TotalExpenses>(environment.baseUrl + 'expense/total', {
      headers: {Authorization: localStorage.getItem('jwt')},
      params: new HttpParams().set('from', from).set('to', to)
    }).pipe(
      map(res => new TotalExpenses().deserialize(res))
    );
  }

  getUserExpenses(page: number, size: number): Observable<ExpenseList> {
    return this.http.get<ExpenseList>(environment.baseUrl + 'expense', {
      headers: {Authorization: localStorage.getItem('jwt')},
      params: new HttpParams().set('page', String(page)).set('size', String(size))
    }).pipe(
      map(res => new ExpenseList().deserialize(res))
    );
  }

  deleteExpense(expenseId: string): Observable<any> {
    return this.http.delete(environment.baseUrl + 'expense/' + expenseId, {
      headers: {Authorization: localStorage.getItem('jwt')}
    });
  }

}
