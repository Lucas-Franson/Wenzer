
export class NotificationViewModel {
    
    constructor(
        public type: Type,
        public text: string,
        public _id: string,
        public created_at: Date
    ) {

    }
}

export enum Type {
    FriendRequest,
    CommentedOnYourComment,
    CommentedOnYourPost
}