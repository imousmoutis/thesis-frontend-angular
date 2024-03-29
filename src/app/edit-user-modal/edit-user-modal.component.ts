import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {UniqueUsernameValidator} from '../validator/unique-username.validator';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  editUserForm: FormGroup;

  existingUsername: string;

  constructor(public matDialog: MatDialogRef<EditUserModalComponent>, @Inject(MAT_DIALOG_DATA) public user: User,
              private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog,
              private translateService: TranslateService, private uniqueUsernameValidator: UniqueUsernameValidator) {
    this.existingUsername = user.username;
  }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required, this.uniqueUsernameValidator.checkUsername.bind(this)),
      fullName: new FormControl({value: this.user.findAttribute('fullName'), disabled: true}),
      email: new FormControl({value: this.user.findAttribute('email'), disabled: true}),
      status: new FormControl(this.user.status === 1)
    });
  }

  onNoClick(): void {
    this.matDialog.close();
  }

  update() {
    this.user.username = this.editUserForm.controls.username.value;

    if (this.editUserForm.valid) {
      this.userService.updateUser(this.user).subscribe(res => {
        this.snackBar.open(this.translateService.instant('saveUserSuccessful'), this.translateService.instant('close'), {
          panelClass: ['success-snackbar']
        });
        this.matDialog.close(res);
      });
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: this.translateService.instant('deleteUserConfirmation')
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.userService.deleteUser(this.user.id).subscribe(res => {
          this.snackBar.open(this.translateService.instant('deleteUserSuccessful'), this.translateService.instant('close'), {
            panelClass: ['success-snackbar']
          });
          this.matDialog.close(res);
        });
      }
    });
  }

}
