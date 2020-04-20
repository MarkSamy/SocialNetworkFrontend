import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { roleEnum } from '../../models/roles';
import { Router } from '@angular/router';
import { OneSignalService } from 'src/app/services/push-notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public  role;
  public token;

  constructor(private userService: UserService,
    private router: Router, private push: OneSignalService,
    private toastr: ToastrService) {
    this.user = new User("", "", "", "", "", new Date("2020-01-16") ,new Array<String>(), false, 0, new Array<User>(),
    roleEnum.user, ''); 
   }

  ngOnInit(): void {

  }

  activate(){
    this.router.navigate(['/activate']);
  }
  onSubmit() {
    this.userService.login(this.user).subscribe(
      response => {
        this.toastr.success("Welcome "+ response.username);
        console.log(response);
        console.log(response.roles[0]);
        console.log(response.accessToken);
        this.role = response.roles[0];
        localStorage.setItem('role', JSON.stringify(this.role));
        this.token = response.accessToken;
        localStorage.setItem('access_token', this.token);
        localStorage.setItem('user_id', response.id);
        if(this.role == "ROLE_ADMIN")
          this.router.navigate(['/dashboard']); // change to dashboard
        else if(response.blocked){
            this.router.navigate(['/activate'])
        }else{
          this.router.navigate(['/home']);
          this.push.init();
        }

      },
      error => {
        this.toastr.error("User not found")
      }
    );
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }
}
