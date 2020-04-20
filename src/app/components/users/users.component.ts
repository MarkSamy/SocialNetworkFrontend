import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchTerm: string;
  users: Array<any>;
  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  getUsers() {
    this.userService.searchUsers(this.searchTerm).subscribe(
      response => {
        this.users = response;
        let myId = localStorage.getItem('user_id');
        this.checkIsFollowing(myId);
        console.log(this.users);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  private checkIsFollowing(myId: string) {
    this.users.map((user, index) => {
      this.userService.getUser(myId).subscribe(response => {
        user.checkFollow = response.following.includes(user._id);
        this[index] = user;
      }, error => {
        console.log(<any>error);
      });
    }, this.users);
  }

  toggleFollow(userId: string) {
    this.userService.toggleFollow(userId).subscribe(
      response => {
        console.log(response);
        let myId = localStorage.getItem('user_id');
        this.checkIsFollowing(myId);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  checkFollow = function (userId: string) {
    return false;

  }

  onHomeClick() {
    this.router.navigate(['/home']);
  }
}
