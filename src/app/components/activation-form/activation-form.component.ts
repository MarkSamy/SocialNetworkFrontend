import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activation-form',
  templateUrl: './activation-form.component.html',
  styleUrls: ['./activation-form.component.scss']
})
export class ActivationFormComponent implements OnInit {
  message: string;
  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addMessage(message) {
    console.log(message);
    this.userService.addForgiveMessage(message).subscribe(
      response => {
        console.log(message);
        console.log(response);
        this.toastr.success('Activation message added and under review');
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Error in sending activation message please try again');

        console.log(error);
      }
    );
  }
}
