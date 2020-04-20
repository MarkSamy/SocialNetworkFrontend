import { roleEnum } from './roles';

export class User {
    username: String;
    email: String;
    password: String;
    image: String;
    location: String;
    dateOfBirth: Date;
    notifications: Array<String>;
    blocked: Boolean;
    bad_post_count: Number;
    following: Array<User>;
    role: roleEnum;
    message: string;

    constructor(
        username: String,
        email: String,
        password: String,
        image: String,
        location: String,
        dateOfBirth: Date,
        notifications: Array<String>,
        blocked: Boolean,
        bad_post_count: Number,
        following: Array<User>,
        role: roleEnum,
        message: string
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.image = image;
        this.location = location;
        this.dateOfBirth = dateOfBirth;
        this.notifications = notifications;
        this.blocked = blocked;
        this.bad_post_count = bad_post_count;
        this.following = following;
        this.role = role;
        this.message = message
    }
}
