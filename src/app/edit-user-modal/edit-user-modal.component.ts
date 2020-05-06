import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../config/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  editUserForm: FormGroup;

  constructor(public matDialog: MatDialogRef<EditUserModalComponent>, @Inject(MAT_DIALOG_DATA) public user: User,
              private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      fullName: new FormControl({value: this.user.findAttribute('fullName'), disabled: true}),
      email: new FormControl({value: this.user.findAttribute('email'), disabled: true})
    });
  }

  get usernameField() {
    return this.editUserForm.get('username');
  }

  onNoClick(): void {
    this.matDialog.close();
  }

  changeStatus(event) {
    this.user.status = event.checked ? 1 : 0;
    this.editUserForm.markAsDirty();
  }

  update() {
    this.user.username = this.editUserForm.controls.username.value;
    this.userService.saveUser(this.user).subscribe(res => {
      this.snackBar.open('User successfully saved.', 'Close', {
        panelClass: ['success-snackbar']
      });
      this.matDialog.close(res);
    });
  }

}
