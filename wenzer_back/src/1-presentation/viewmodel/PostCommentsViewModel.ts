import { UserPostCommentViewModel } from "./UserPostCommentViewModel";

export class PostCommentsViewModel {
    
    constructor(
        public _id: string,
        public idUser: string,
        public idPost: string,
        public text: string,
        public usuario: UserPostCommentViewModel,
        public createdAt: Date,
    ) {

    }



}