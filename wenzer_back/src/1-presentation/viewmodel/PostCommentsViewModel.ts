import { UserPostCommentViewModel } from "./UserPostCommentViewModel";

export class PostCommentsViewModel {
    
    constructor(
        public id: string,
        public idUser: string,
        public idPost: string,
        public usuario: UserPostCommentViewModel,
        public createdAt: Date,
    ) {

    }



}