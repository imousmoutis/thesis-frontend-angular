import {Component, OnInit} from '@angular/core';
import {HomeService} from '../config/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  serverStatus = 'Connecting with server...';

  constructor(public homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.GetServerStatus().subscribe(res => {
      this.serverStatus = res;
    });
  }

}
