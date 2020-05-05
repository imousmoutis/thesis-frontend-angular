import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPageDto} from '../../dto/login-page.dto';
import {IndexService} from '../../config/index.service';
import {AuthSharedService} from '../../config/auth/auth-shared.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../login.component.scss']
})
export class RegisterPageComponent implements OnInit {

  @Output() loginPage = new EventEmitter<LoginPageDto>();

  @Input() username: string;

  @Input() password: string;

  registerForm: FormGroup;

  constructor(private indexService: IndexService, private authSharedService: AuthSharedService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(this.password,
        [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W\\_])[A-Za-z\\d\\W\\_]{8,}$')])
    });
  }

  get usernameField() {
    return this.registerForm.get('username');
  }

  get emailField() {
    return this.registerForm.get('email');
  }

  get fullNameField() {
    return this.registerForm.get('fullName');
  }

  get passwordField() {
    return this.registerForm.get('password');
  }

  changeLoginPageStatus() {
    const loginPageDto: LoginPageDto = {
      loginPage: true,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    this.loginPage.emit(loginPageDto);
  }

  register() {
    this.registerForm.controls.username.markAsTouched();
    this.registerForm.controls.email.markAsTouched();
    this.registerForm.controls.fullName.markAsTouched();
    this.registerForm.controls.password.markAsTouched();

    if (this.registerForm.valid) {
      this.indexService.register(this.registerForm.value).subscribe(res => {
        this.authSharedService.sendLoginRequest(this.registerForm.value);
      });
    }
  }

}
