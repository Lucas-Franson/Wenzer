import { CommentCommentedViewModel } from "./CommentCommentedViewModel";
import { UserPostCommentViewModel } from "./UserPostCommentViewModel";
export declare class PostCommentsViewModel {
    _id: string;
    idUser: string;
    idPost: string;
    text: string;
    usuario: UserPostCommentViewModel;
    subComments: CommentCommentedViewModel[];
    createdAt: Date;
    goodIdea: boolean;
    countGoodIdea: number;
    constructor(_id: string, idUser: string, idPost: string, text: string, usuario: UserPostCommentViewModel, subComments: CommentCommentedViewModel[], createdAt: Date, goodIdea: boolean, countGoodIdea: number);
}
