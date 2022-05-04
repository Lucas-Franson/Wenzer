import { UserPostCommentViewModel } from "./UserPostCommentViewModel";
export declare class CommentCommentedViewModel {
    _id: string;
    idUser: string;
    idPostComment: string;
    text: string;
    usuario: UserPostCommentViewModel;
    createdAt: Date;
    constructor(_id: string, idUser: string, idPostComment: string, text: string, usuario: UserPostCommentViewModel, createdAt: Date);
}
