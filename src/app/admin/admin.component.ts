import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../config/user.service';
import {User} from '../model/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AuthSharedService} from '../config/auth/auth-shared.service';
import {MatDialog} from '@angular/material/dialog';
import {EditUserModalComponent} from '../edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  users: User[];

  usersLength: number;

  username: string;

  displayedColumns: string[] = ['username', 'fullName', 'email', 'status', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, public authSharedService: AuthSharedService, private matDialog: MatDialog) {
    this.username = this.authSharedService.username;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fetchData(0, this.paginator.pageSize, this.sort.active, this.sort.start);

    this.sort.sortChange.subscribe(data => {
      this.paginator.pageIndex = 0;
      this.fetchData(0, this.paginator.pageSize, data.active, data.direction);
    });
  }

  fetchData(page: number, size: number, sort: string, sortDirection: string) {
    this.userService.getUsers(page, size, sort, sortDirection)
    .subscribe(data => {
      this.users = data.content;
      this.paginator.length = data.totalElements;
      this.usersLength = data.totalElements;
    });
  }

  changePage() {
    this.fetchData(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active,
      this.sort.start);
  }

  editUser(user: User){
    const dialogRef = this.matDialog.open(EditUserModalComponent, {
      width: '85%',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result){
       this.changePage();
     }
    });
  }

}
