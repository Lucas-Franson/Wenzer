export declare class NotificationViewModel {
    type: NotificationType;
    text: string;
    _id: string;
    created_at: Date;
    constructor(type: NotificationType, text: string, _id: string, created_at: Date);
}
export declare enum NotificationType {
    FriendRequest = 0,
    CommentedOnYourComment = 1,
    CommentedOnYourPost = 2
}
