import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.scss']
})
export class BlockedUsersComponent implements OnInit {
  users: Array<User>;
  constructor(private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getBlockedUsers().subscribe(
      response => {
        console.log(response);
        this.users = response;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  unblockUser(user) {
    console.log(user);
    this.userService.unblockUser(user).subscribe(
      response => {
        this.toastr.success("User Acctivated")
        const index = this.users.indexOf(user);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      },
      error => {
        this.toastr.error("Error in activating user")

        console.log(error);
      }
    );
  }
}
