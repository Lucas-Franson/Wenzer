"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerRepository = void 0;
const followers_1 = require("../../3-domain/entities/followers");
const orm_1 = require("./orm");
class FollowerRepository extends orm_1.Orm {
    handleArrayResult(result) {
        if (result && result instanceof Array && result.length > 0) {
            let followers = [];
            result.forEach((value) => {
                let follower = new followers_1.Followers(value.idProject, value.idUser, value._id, value.created_at, value.updated_at);
                followers.push(follower);
            });
            return followers;
        }
        else {
            return [];
        }
    }
    handleResult(results) {
        if (results && !(results instanceof Array)) {
            return new followers_1.Followers(results.idProject, results.idUser, results._id, results.created_at, results.updated_at);
        }
        else {
            return null;
        }
    }
}
exports.FollowerRepository = FollowerRepository;
//# sourceMappingURL=followerRepository.js.map