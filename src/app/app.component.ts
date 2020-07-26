import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('locale')) {
      this.translateService.setDefaultLang(localStorage.getItem('locale'));
    } else {
      this.translateService.setDefaultLang('en');
    }
  }
}
