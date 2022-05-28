export default class UserViewModel {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    title: string;
    photo: any;
    bio: string;
    emailValid: boolean;
    created_at: Date;
    constructor(_id: string, name: string, lastName: string, email: string, password: string, title: string, photo: any, bio: string, emailValid: boolean, created_at: Date);
}
