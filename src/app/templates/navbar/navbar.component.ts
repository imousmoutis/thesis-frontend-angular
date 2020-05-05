import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../config/auth/auth.service';
import {Router} from '@angular/router';
import {IndexService} from '../../config/index.service';
import {RoleService} from '../../config/auth/role.service';
import {environment} from '../../../environments/environment';
import {AuthSharedService} from '../../config/auth/auth-shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private indexService: IndexService, private authSharedService: AuthSharedService,
              public authService: AuthService, private roleService: RoleService) {

  }

  ngOnInit(): void {
  }

  logout() {
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

}
