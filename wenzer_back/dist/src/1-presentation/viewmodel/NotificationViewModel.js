"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.NotificationViewModel = void 0;
class NotificationViewModel {
    constructor(type, text, _id, created_at) {
        this.type = type;
        this.text = text;
        this._id = _id;
        this.created_at = created_at;
    }
}
exports.NotificationViewModel = NotificationViewModel;
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["FriendRequest"] = 0] = "FriendRequest";
    NotificationType[NotificationType["CommentedOnYourComment"] = 1] = "CommentedOnYourComment";
    NotificationType[NotificationType["CommentedOnYourPost"] = 2] = "CommentedOnYourPost";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
//# sourceMappingURL=NotificationViewModel.js.map