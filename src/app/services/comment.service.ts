import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { ContextService } from './context.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentService {

    public url: string;

    constructor(public httpClient: HttpClient,
        private contextService: ContextService) {
        this.url = GLOBAL.url;
    }

    addComment(comment: Comment): Observable<any> {
        let params = JSON.stringify(comment);
        let headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', this.contextService.getToken());
        return this.httpClient.post(this.url + 'users/comment', params, { headers });
    }

    uncomment(postId: string, commentId: string): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('x-access-token', this.contextService.getToken());
        return this.httpClient.delete(this.url + 'users/comment/' + postId + '/' + commentId, { headers });
    }

}