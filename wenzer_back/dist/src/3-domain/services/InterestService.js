"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const interestUser_1 = require("../entities/interestUser");
class PostService {
    constructor(interestsRepository) {
        this.interestsRepository = interestsRepository;
    }
    getAllInterests() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.interestsRepository.getAll('');
        });
    }
    linkUserToInterests(user, interests) {
        return __awaiter(this, void 0, void 0, function* () {
            var userInterests = [];
            let interestUserAlreadyExist = yield this.interestsRepository.findLinkUserToInterests(user._id);
            interests
                .filter(n => interestUserAlreadyExist
                .filter(i => i._idInterests === n._id).length === 0)
                .forEach((interest) => {
                var obj = new interestUser_1.InterestUser(interest._id, user._id);
                userInterests.push(obj);
            });
            this.interestsRepository.createLinkToUser(userInterests);
        });
    }
}
exports.default = PostService;
//# sourceMappingURL=InterestService.js.map