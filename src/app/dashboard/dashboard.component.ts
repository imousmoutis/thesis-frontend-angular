import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthSharedService} from '../auth/auth-shared.service';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ExpenseService} from '../service/expense.service';
import {ExpenseCategory} from '../model/expense-category';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {ExpenseList} from '../model/expense-list';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {TotalExpenses} from '../model/total-expenses';

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

  selectedPage = 0;

  pageSize = 25;

  userExpenses = new ExpenseList();

  currentlyOpenedItemIndex = -1;

  expensesPaginatedPages: number[];

  dateFrom: Date;

  dateTo: Date;

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartData = [];

  barChartLabels = [];

  totalUserExpenses = Object.assign(new TotalExpenses(), {
    totalExpenses: [],
    dates: []
  });

  @ViewChild('paginator') paginator: MatPaginator;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private expenseService: ExpenseService, public authSharedService: AuthSharedService, private snackBar: MatSnackBar,
              private translateService: TranslateService, private datePipe: DatePipe) {
    this.username = this.authSharedService.username;
    this.userExpenses.size = 0;
    this.dateFrom = this.today;
    this.dateTo = this.today;
  }

  ngOnInit(): void {
    this.expenseService.getExpenseCategories().subscribe(data => {
      this.expenseCategories = data;
    });
    this.initNewExpenseForm();
    this.loadUserExpenses();
    this.getTotalExpenses();
  }

  initNewExpenseForm() {
    this.newExpenseForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      date: new FormControl(this.today, Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl()
    });
  }

  submitExpense() {
    if (this.newExpenseForm.valid) {
      this.expenseService.saveExpense(this.newExpenseForm.value).subscribe(res => {
        this.snackBar.open(this.translateService.instant('newExpenseSuccessful'), this.translateService.instant('close'), {
          panelClass: ['success-snackbar']
        });
        this.formGroupDirective.resetForm();
        this.initNewExpenseForm();
        this.loadUserExpenses();
        this.getTotalExpenses();
      });
    }
  }

  loadUserExpenses() {
    this.expenseService.getUserExpenses(this.selectedPage, this.pageSize).subscribe(res => {
      this.userExpenses = res;

      if (this.userExpenses.size > 0) {
        this.generateExpensesPagination();
      }
    });
  }

  setOpened(itemIndex) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex) {
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

  getTranslatedCategory(id) {
    return this.translateService.instant(this.expenseCategories[this.expenseCategories.findIndex(x => x.id === id)].name);
  }

  deleteExpense(id) {
    this.expenseService.deleteExpense(id).subscribe(res => {
      this.snackBar.open(this.translateService.instant('deleteExpenseSuccessful'), this.translateService.instant('close'), {
        panelClass: ['success-snackbar']
      });
      this.loadUserExpenses();
      this.getTotalExpenses();
    });
  }

  changePage(e) {
    this.selectedPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadUserExpenses();
  }

  generateExpensesPagination() {
    this.expensesPaginatedPages = [];

    for (let i = 0; i < Math.ceil(this.userExpenses.size / this.pageSize); i++) {
      this.expensesPaginatedPages.push(i);
    }

    if (this.expensesPaginatedPages.indexOf(this.selectedPage) < 0) {
      this.selectedPage = this.expensesPaginatedPages[this.expensesPaginatedPages.length - 1];
      this.paginator.pageIndex = this.selectedPage;
      this.loadUserExpenses();
    }
  }

  getTotalExpenses() {
    this.expenseService.getUserTotalExpenses(this.datePipe.transform(this.dateFrom, 'dd/MM/yyyy'),
      this.datePipe.transform(this.dateTo, 'dd/MM/yyyy')).subscribe(res => {

      this.barChartData = [];

      this.totalUserExpenses = res;

      let i = 1;
      for (const expense of this.totalUserExpenses.totalExpenses) {
        this.barChartData.push({data: expense, label: this.getTranslatedCategory(i)});
        i++;
      }
      this.barChartLabels = this.totalUserExpenses.dates;
    });
  }

}
