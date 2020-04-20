import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'socialnetworkapp';
  public role;
  public url: string;

  constructor(
    private userService: UserService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    this.title = 'SOCIAL';
    this.url = GLOBAL.url;
    iconRegistry.addSvgIcon(
      'login',
      sanitizer.bypassSecurityTrustResourceUrl('assets/login.svg'));
      iconRegistry.addSvgIcon(
        'account-search',
        sanitizer.bypassSecurityTrustResourceUrl('assets/account-search.svg'));
  }

  ngOnInit() {
    this.role = this.userService.getRole();
  }

  ngDoCheck() {
    this.role = this.userService.getRole();
  }

  logout() {
    localStorage.clear();
    this.role = null;
  }
}
