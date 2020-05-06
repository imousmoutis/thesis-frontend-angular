import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginPageDto} from '../../dto/login-page.dto';
import {IndexService} from '../../service/index.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthSharedService} from '../../auth/auth-shared.service';
import {Subscription} from 'rxjs';
import {LoginUserDto} from '../../dto/login-user.dto';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Output() loginPage = new EventEmitter<LoginPageDto>();

  @Input() username: string;

  @Input() password: string;

  loginForm: FormGroup;

  loginErrorMessage: boolean;

  clickEventSubscription: Subscription;

  constructor(private indexService: IndexService, private jwtHelper: JwtHelperService, private router: Router,
              private snackBar: MatSnackBar, private authSharedService: AuthSharedService, private translateService: TranslateService) {

    this.clickEventSubscription = this.authSharedService.loginRequest().subscribe((user) => {
      this.performLogin(user);
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }

  get usernameField() {
    return this.loginForm.get('username');
  }

  get passwordField() {
    return this.loginForm.get('password');
  }

  changeLoginPageStatus() {
    const loginPageDto: LoginPageDto = {
      loginPage: false,
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.loginPage.emit(loginPageDto);
  }

  login() {
    this.loginForm.controls.username.markAsTouched();
    this.loginForm.controls.password.markAsTouched();

    if (this.loginForm.valid) {
      this.loginErrorMessage = false;
      this.performLogin(this.loginForm.value);
    }
  }

  performLogin(user: LoginUserDto) {
    this.indexService.login(user).subscribe(res => {
      const jwt = res.headers.get('Authorization');
      localStorage.setItem('jwt', jwt);
      const decodedJwt = this.jwtHelper.decodeToken(jwt);

      this.authSharedService.setUserLoggedIn(true, decodedJwt.sub, decodedJwt.role1);

      this.snackBar.open(this.translateService.instant('loginSuccessful'), this.translateService.instant('close'), {
        panelClass: ['success-snackbar']
      });

      if (decodedJwt.role1 === environment.userAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      this.loginErrorMessage = true;
    });
  }

}
