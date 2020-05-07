import {FormControl} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UniqueUsernameValidator {

  existingUsername: string;

  userService: UserService;

  constructor() {
  }

  checkUsername(control: FormControl): any {
    return new Promise(resolve => {
      if (control.value !== this.existingUsername) {
        this.userService.uniqueUser(control.value).subscribe((res) => {
          if (res) {
            resolve(null);
          } else {
            resolve({'unique': true});
          }
        }, (err) => {
          resolve(null);
        });
      }
    });
  }

}
