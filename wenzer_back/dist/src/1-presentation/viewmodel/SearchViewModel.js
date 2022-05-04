"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchType = exports.SearchViewModel = void 0;
class SearchViewModel {
    constructor(_id, name, bio, type, photo) {
        this._id = _id;
        this.name = name;
        this.bio = bio;
        this.type = type;
        this.photo = photo;
    }
}
exports.SearchViewModel = SearchViewModel;
var SearchType;
(function (SearchType) {
    SearchType[SearchType["People"] = 0] = "People";
    SearchType[SearchType["Project"] = 1] = "Project";
    SearchType[SearchType["Post"] = 2] = "Post";
})(SearchType = exports.SearchType || (exports.SearchType = {}));
//# sourceMappingURL=SearchViewModel.js.map