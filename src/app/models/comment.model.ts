import { User } from './user';

export class Comment {
    
    pId: string;
    text: string;
    _id: string;
    user: string;
    date: string;
    owner: User;

    constructor(
        pId: string,
        text: string
    ) {
        this.pId = pId;
        this.text = text;
    }
}
