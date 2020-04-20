import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ContextService } from 'src/app/services/context.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

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

  onHomeClick() {
    this.router.navigate(['/home']);
  }

  editProfile() {
    this.router.navigate(['/editprofile']);
  }

}
