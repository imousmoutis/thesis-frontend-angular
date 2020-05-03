import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../login.component.scss']
})
export class RegisterPageComponent implements OnInit {

  @Output() loginPage = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeLoginPageStatus() {
    this.loginPage.emit(true);
  }

}
