import { CommentCommentedViewModel } from "./CommentCommentedViewModel";
import { UserPostCommentViewModel } from "./UserPostCommentViewModel";

export class PostCommentsViewModel {
    
    constructor(
        public _id: string,
        public idUser: string,
        public idPost: string,
        public text: string,
        public usuario: UserPostCommentViewModel,
        public subComments: CommentCommentedViewModel[],
        public createdAt: Date,
        public goodIdea: boolean,
        public countGoodIdea: number
    ) {

    }



}