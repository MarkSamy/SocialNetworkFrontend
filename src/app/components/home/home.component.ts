import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { Post } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model';
import { ContextService } from 'src/app/services/context.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[];
  commentText: string;
  searchText: string;
  page = 1;

  constructor(private postService: PostService, private dialog: MatDialog, private commentService: CommentService, private router: Router
    , private contextService: ContextService) { }
  ngOnInit(): void {
    this.postService.readPosts(this.page).subscribe(
      response => {
        this.posts = response;
        console.log(this.posts);
      },
      error => {
        console.log(<any>error);
      }
    );
    this.page++;
  }

  showImage(user: User) {
    if (user !== undefined && user.image !== undefined && user.image !== '') {
      return true;
    }
    return false;
  }

  checkLike(likes: string[]) {
    return likes.includes(this.contextService.getUserId());
  }

  checkComment(user: string) {
    return user === this.contextService.getUserId();
  }

  onScroll() {
    console.log('scrolled!!');
    this.postService.readPosts(this.page).subscribe(
      response => {
        console.log(response);
        let newPosts: Post[] = response;
        if (newPosts.length !== 0) {
          console.log('here!!');
          newPosts.forEach(newPost => {
            this.posts.push(newPost);
          });
          this.page++;
        }
        console.log(this.posts);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onLikeClick(postId: string) {
    let isLike = false;
    this.postService.likePost(postId).subscribe(
      response => {
        console.log(this.posts);
        this.posts.forEach(post => {
          if (post._id === postId) {
            isLike = this.checkLike(post.likes);
            if (isLike) {
              const index: number = post.likes.indexOf(this.contextService.getUserId());
              if (index !== -1) {
                post.likes.splice(index, 1);
              }
            } else {
              post.likes.push(this.contextService.getUserId());
            }
          }
        });
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onDeleteCommentClick(postId: string, comment: Comment) {
    console.log('Delete Comment!!');
    this.commentService.uncomment(postId, comment._id).subscribe(
      response => {
        console.log(this.posts);
        console.log(response);
        this.posts.forEach(post => {
          if (post._id === postId) {
            const index = post.comments.indexOf(comment);
            if (index !== -1) {
              post.comments.splice(index, 1);
            }
          }
        });
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onCommentClick(postId: string) {
    console.log('New Comment!!');
    let comment: Comment;
    comment = new Comment(postId, this.commentText);
    this.commentService.addComment(comment).subscribe(
      response => {
        console.log(this.posts);
        console.log(response);
        this.posts.forEach(post => {
          if (post._id === postId) {
            post.comments = new Array();
            response.result.comments.forEach(comment => {
              post.comments.push(comment);
            });
            console.log(response.result);
            console.log(response.result);
            console.log(post);
          }
        });
        this.commentText = undefined;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSearchClick() {
    console.log('Search!!');
    if (this.searchText === undefined || this.searchText === '') {
      this.page = 1;
      this.postService.readPosts(this.page).subscribe(
        response => {
          this.posts = response;
          console.log(this.posts);
        },
        error => {
          console.log(<any>error);
        }
      );
      this.page++;
    }
    this.postService.searchPosts(this.searchText).subscribe(
      response => {
        console.log(this.posts);
        console.log(response);
        this.posts = response;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(PostDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        var post: Post;
        post = new Post();
        post.text = data.value.description;
        post.image = data.images;
        post.notify = data.followers;
        this.postService.addPost(post).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  searchUser() {
    this.router.navigate(['/users']);
  }
}
