import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginPage: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.loginPage = true;
  }

  changeLoginPageStatus($event) {
    this.loginPage = $event;
  }

}
