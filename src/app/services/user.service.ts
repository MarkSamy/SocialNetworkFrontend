import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';
import { ContextService } from './context.service';

@Injectable()
export class UserService {
    public url: string;
    public token;
    public role;

    constructor(public httpClient: HttpClient, private contextService: ContextService) {
        this.url = GLOBAL.url;
    }

    register(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post(this.url + 'auth/signup/', params, { headers: headers });
    }
    login(user: User): Observable<any> {
        let params = JSON.stringify(user);
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post(this.url + 'auth/signin/', params, { headers: headers });
    }
    logout() {
        localStorage.removeItem('access_token');
    }

    getUser(userID: string): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', this.contextService.getToken());
        return this.httpClient.get(this.url + 'users/' + userID, { headers });
    }

    getToken() {
        let token = localStorage.getItem('access_token');
        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    getRole() {
        let role = JSON.parse(localStorage.getItem('role'));

        if (role != "undefined") {
            this.role = role;
        } else {
            this.role = null;
        }
        return this.role;
    }
    getBlockedUsers(): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('x-access-token', this.getToken());
        console.log(this.url + 'users/forgive');
      return this.httpClient.get(this.url + 'users/forgive', { headers: headers });
    }
    unblockUser(user: any): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('x-access-token', this.getToken());
        let params = user;
        return this.httpClient.post(this.url + 'users/forgive/accept', params,{ headers: headers });
    }
    addForgiveMessage(message: any): Observable<any>{
        let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('x-access-token', this.getToken());
        let params :{
            message: string
        } = {
            message: message
        } 
        return this.httpClient.post(this.url + 'users/forgive', params,{ headers: headers });
    }
    
    searchUsers(searchTerm: string): Observable<any>
    {
        let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('x-access-token', this.contextService.getToken());
        return this.httpClient.get(this.url + 'users/search/' + searchTerm, {headers: headers});
    }

    toggleFollow(userId: string): Observable<any>
    {
        let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('x-access-token', this.getToken());
        let params :{
            id: string
        } = {
            id: userId
        } 
        return this.httpClient.post(this.url + 'users/follow', params, {headers: headers});
    }

    editProfile(user: User): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('x-access-token', this.getToken());
        let params = JSON.stringify(user);
        return this.httpClient.put(this.url + 'users/' + this.contextService.getUserId(), params, { headers: headers });
    }
}