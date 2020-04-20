import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ContextService } from 'src/app/services/context.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { roleEnum } from '../../models/roles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  showImage: Boolean = false;
  showFollow: Boolean = false;

  constructor(private userService: UserService, private contextService: ContextService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = new User("", "", "", "", "", new Date("2020-01-16") ,new Array<String>(), false, 0, new Array<User>(),
    roleEnum.user, ''); 

    this.userService.getUser(this.contextService.getUserId()).subscribe(
      response => {
        this.user = response;
        console.log(response);
        console.log(this.user);
        if (this.user && !this.user.image) {
          this.showImage = true;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  formatDate(date: Date) {
    return date.toString().split('T', 1);
  }

  onHomeClick() {
    this.router.navigate(['/home']);
  }

  editProfile() {
    this.router.navigate(['/editprofile']);
  }

}
