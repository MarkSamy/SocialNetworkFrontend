import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { roleEnum } from '../../models/roles';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  public title: string;
  public user: User;
  public role;
  public token;

  constructor(private userService: UserService,
    private routerModule: RouterModule,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.user = new User("", "", "", "", "", new Date("2020-01-16"), new Array<String>(), false, 0, new Array<User>(),
      roleEnum.user, "");
  }

  ngOnInit(): void {

  }

  onSubmit(form) {
    this.userService.register(this.user).subscribe(
      response => {
        if (response.status == "success") {
          form.reset();
          this.toastr.success("User created successfuly")

          this.router.navigate(['/login']);

        } else {
          this.toastr.error("Error in registering")

        }
      },
      error => {
        this.toastr.error(error.error.message)

      }
    );

  }
  image: File = null;
  onFileSelected(event, user) {
    this.image = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = function () {
      user.image = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
