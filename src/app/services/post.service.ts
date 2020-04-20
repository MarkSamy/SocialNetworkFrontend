import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { ContextService } from './context.service';
import { Post } from '../models/post.model';

@Injectable()
export class PostService {

    public url: string;

    constructor(public httpClient: HttpClient,
        private contextService: ContextService) {
        this.url = GLOBAL.url;
    }

    readPosts(page: Number): Observable<any> {
        let params: any;
        let headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', this.contextService.getToken());
        return this.httpClient.get(this.url + 'users/feed?page=' + page, { headers });
    }

    addPost(post: Post): Observable<any> {
        let params = JSON.stringify(post);
        let headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', this.contextService.getToken());
        return this.httpClient.post(this.url + 'users/post', params, { headers });
    }

    likePost(postId: string): Observable<any> {
        let params: {
            pId: string
        } = {
            pId: postId
        };
        let headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', this.contextService.getToken());
        return this.httpClient.post(this.url + 'users/like', params, { headers });
    }

    searchPosts(text: string): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', this.contextService.getToken());
        return this.httpClient.get(this.url + 'users/feed/' + text, { headers });
    }

}