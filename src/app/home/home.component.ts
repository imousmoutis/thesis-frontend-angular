import {Component, OnInit} from '@angular/core';

import {IndexService} from '../config/index.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serverStatus = 'Connecting with server...';

  constructor(public homeService: IndexService) {
  }

  ngOnInit(): void {
    this.homeService.getServerStatus().subscribe(res => {
      this.serverStatus = res;
    }, error => {
      this.serverStatus = 'Server is down. Contact the administrator.';
    });
  }

}
