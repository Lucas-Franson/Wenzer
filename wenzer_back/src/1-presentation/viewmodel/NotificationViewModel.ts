
export class NotificationViewModel {
    
    constructor(
        public type: NotificationType,
        public text: string,
        public _id: string,
        public created_at: Date
    ) {

    }
}

export enum NotificationType {
    FriendRequest,
    CommentedOnYourComment,
    CommentedOnYourPost
}