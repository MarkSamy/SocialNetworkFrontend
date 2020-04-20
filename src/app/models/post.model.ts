import { Comment } from './comment.model';
import { User } from './user';

export class Post {
    
    likes: Array<string>;
    hidden: Boolean;
    notify: Boolean;
    _id: string;
    user: string;
    owner: User;
    body: string;
    comments: Array<Comment>;
    __v: Number;
    image: Array<string>;
    date: string;
    text: string;

    constructor(
    ) {

    }
    
}
