import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../config/auth/auth.service';
import {Router} from '@angular/router';
import {IndexService} from '../../config/index.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private indexService: IndexService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.indexService.logout().subscribe(res => {
      localStorage.removeItem('jwt');
      this.router.navigate(['']);
    });
  }

}
