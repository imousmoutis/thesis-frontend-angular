import {Component, OnInit} from '@angular/core';
import {AuthSharedService} from '../auth/auth-shared.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExpenseService} from '../service/expense.service';
import {ExpenseCategory} from '../model/expense-category';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {Expense} from '../model/expense';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username: string;

  expenseCategories: ExpenseCategory[];

  newExpenseForm: FormGroup;

  today = new Date();

  constructor(private expenseService: ExpenseService, public authSharedService: AuthSharedService, private snackBar: MatSnackBar,
              private translateService: TranslateService, private datePipe: DatePipe) {
    this.username = this.authSharedService.username;
  }

  ngOnInit(): void {

    this.expenseService.getExpenseCategories().subscribe(data => {
      this.expenseCategories = data;
    });

    this.newExpenseForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      date: new FormControl(this.today, Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl()
    });
  }

  submitExpense() {
    this.newExpenseForm.controls.amount.markAsTouched();
    this.newExpenseForm.controls.category.markAsTouched();

    console.log(this.datePipe.transform(this.newExpenseForm.value.date));

    if (this.newExpenseForm.valid) {
      this.expenseService.saveExpense(
        new Expense(this.newExpenseForm.value.amount, this.newExpenseForm.value.category,
          this.datePipe.transform(this.newExpenseForm.value.date, 'dd/MM/yyyy'),
          this.newExpenseForm.value.description)).subscribe(res => {
        this.snackBar.open(this.translateService.instant('newExpenseSuccessful'), this.translateService.instant('close'), {
          panelClass: ['success-snackbar']
        });
      });
    }
  }

}
