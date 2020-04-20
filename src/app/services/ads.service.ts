import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Ads } from 'src/app/models/ads';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  public url: string;

  constructor(public httpClient: HttpClient, private userService: UserService) {
    this.url = GLOBAL.url;
  }
  addAds(ad: Ads): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-access-token', this.userService.getToken()); 
      console.log(ad)     
    return this.httpClient.post(this.url + 'users/adv', ad, { headers: headers });
  }

}
