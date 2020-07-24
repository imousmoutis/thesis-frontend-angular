import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPageDto} from '../../dto/login-page.dto';
import {IndexService} from '../../service/index.service';
import {AuthSharedService} from '../../auth/auth-shared.service';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UniqueUsernameValidator} from '../../validator/unique-username.validator';
import {UserService} from '../../service/user.service';

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

  existingUsername: string;

  constructor(private indexService: IndexService, private authSharedService: AuthSharedService,
              private translateService: TranslateService, private snackBar: MatSnackBar,
              private uniqueUsernameValidator: UniqueUsernameValidator, private userService: UserService) {
    this.existingUsername = '';
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(this.username, Validators.required, this.uniqueUsernameValidator.checkUsername.bind(this)),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(this.password,
        [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W\\_])[A-Za-z\\d\\W\\_]{8,}$')])
    });
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
    console.log(this.registerForm.controls.username);
    this.registerForm.controls.username.markAsTouched();
    this.registerForm.controls.email.markAsTouched();
    this.registerForm.controls.fullName.markAsTouched();
    this.registerForm.controls.password.markAsTouched();

    if (this.registerForm.valid) {
      this.indexService.register(this.registerForm.value).subscribe(res => {
        this.snackBar.open(this.translateService.instant('registerSuccessful'), this.translateService.instant('close'), {
          panelClass: ['success-snackbar']
        });
        this.authSharedService.sendLoginRequest(this.registerForm.value);
      });
    }
  }

}
