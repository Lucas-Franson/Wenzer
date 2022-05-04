"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserViewModel {
    constructor(_id, name, email, password, title, photo, bio, emailValid, created_at) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.title = title;
        this.photo = photo;
        this.bio = bio;
        this.emailValid = emailValid;
        this.created_at = created_at;
    }
}
exports.default = UserViewModel;
//# sourceMappingURL=UserViewModel.js.map