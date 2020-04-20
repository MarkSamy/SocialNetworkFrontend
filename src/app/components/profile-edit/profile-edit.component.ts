import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  public user: User;
  showImage: Boolean = false;

  constructor(private userService: UserService, private contextService: ContextService, private router: Router,
    private toastr: ToastrService) { }

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

  onHomeClick() {
    this.router.navigate(['/home']);
  }

  onSubmit(form) {
    this.userService.editProfile(this.user).subscribe(
      response => {
        if (response.status == "success") {
          form.reset();
          this.toastr.success("profile updated successfuly")

          this.router.navigate(['/profile']);

        }
        else
          this.toastr.error("Error Editing profile");
      },
      error => {
        this.toastr.error(error.error.message)

      }
    );

  }
}
