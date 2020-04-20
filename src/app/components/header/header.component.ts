import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() dispButton = false;
  @Input() dispLoginButton = false;
  @Input() dispLogoutButton = false;
  @Input() dispUsersButton = false;

  @Input() dispButtonImg: string;

  @Output() onButtonClick: EventEmitter<string>;
  @Output() onLogoutButtonClick: EventEmitter<string>;

  constructor(private contextService: ContextService, private router: Router) {
    this.onButtonClick = new EventEmitter<string>();
  }

  ngOnInit() { }

  callButton() {
    this.onButtonClick.emit();
  }

  callLogoutButton() {
    this.router.navigate(['/login']);
  }

  callOpenUsers() {
    this.router.navigate(['/users']);
  }

}
