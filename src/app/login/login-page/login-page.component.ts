import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Output() loginPage = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeLoginPageStatus() {
    this.loginPage.emit(false);
  }

}
