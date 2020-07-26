import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {NavigationStart, Router} from '@angular/router';
import {IndexService} from '../../service/index.service';
import {RoleService} from '../../auth/role.service';
import {environment} from '../../../environments/environment';
import {AuthSharedService} from '../../auth/auth-shared.service';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {LexiconService} from '../../service/lexicon.service';
import {Language} from '../../model/language';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  languages: Language[];

  selectedLanguage: string;

  constructor(private router: Router, private indexService: IndexService, private authSharedService: AuthSharedService,
              public authService: AuthService, private roleService: RoleService, private title: Title,
              private translateService: TranslateService, private lexiconService: LexiconService, private dateAdapter: DateAdapter<Date>) {
  }

  ngOnInit(): void {

    this.lexiconService.getLanguages().subscribe(res => {
      this.languages = res;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setTitle(event.url);
      }
    });

    this.translateService.onDefaultLangChange.subscribe(event => {
      this.selectedLanguage = event.lang;
      this.setTitle(this.router.url);
      this.setDatePickerLanguage();
    });

    this.translateService.onLangChange.subscribe(event => {
      this.selectedLanguage = event.lang;
      localStorage.setItem('locale', this.selectedLanguage);
      this.setTitle(this.router.url);
      this.setDatePickerLanguage();
    });
  }

  logout(): void {
    this.indexService.logout().subscribe(res => {
      localStorage.removeItem('jwt');
      this.authSharedService.setUserLoggedIn(false, null, null);
      this.router.navigate(['']);
    });
  }

  hasAdministratorRole(): boolean {
    return this.roleService.hasRole(environment.userAdmin);
  }

  hasUserRole(): boolean {
    return this.roleService.hasRole(environment.user);
  }

  setTitle(path: string): void {
    if (path === '/') {
      this.title.setTitle(this.translateService.instant('home'));
    } else if (path === '/login') {
      this.title.setTitle(this.translateService.instant('login'));
    } else if (path === '/admin') {
      this.title.setTitle(this.translateService.instant('admin'));
    } else if (path === '/dashboard') {
      this.title.setTitle(this.translateService.instant('dashboard'));
    }
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  setDatePickerLanguage() {
    if (this.selectedLanguage === 'gr') {
      this.dateAdapter.setLocale('el');
    } else {
      this.dateAdapter.setLocale('en-GB');
    }
  }

}
