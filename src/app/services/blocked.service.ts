import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BlockedService {
  public url: string;

  constructor(public httpClient: HttpClient, private userService: UserService) {
    this.url = GLOBAL.url;
   }
  getBadWords(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-access-token', this.userService.getToken());
      console.log(this.url + 'users/bad');
    return this.httpClient.get(this.url + 'users/bad', { headers: headers });
  }
  addBadWord(badWord: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-access-token', this.userService.getToken()); 
      console.log(badWord)     
      let params :{
        word : string
      } = {word: badWord};
    return this.httpClient.post(this.url + 'users/bad', params, { headers: headers });
  }
  deleteBadWord(badWordId: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-access-token', this.userService.getToken());
      let params = badWordId;
    return this.httpClient.delete(this.url + 'users/bad/' + params, { headers: headers });
  }
}
