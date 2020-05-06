import {Component, OnInit} from '@angular/core';

import {IndexService} from '../service/index.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serverStatus: string;

  constructor(public homeService: IndexService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.serverStatus = this.translateService.instant('serverConnection');

    this.homeService.getServerStatus().subscribe(res => {
      this.serverStatus = res;
    }, error => {
      this.serverStatus = this.translateService.instant('serverStatus');
    });
  }

}
