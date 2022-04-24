import { UserPostCommentViewModel } from "./UserPostCommentViewModel";

export class CommentCommentedViewModel {
    
    constructor(
        public _id: string,
        public idUser: string,
        public idPostComment: string,
        public text: string,
        public usuario: UserPostCommentViewModel,
        public createdAt: Date,
    ) {

    }



}