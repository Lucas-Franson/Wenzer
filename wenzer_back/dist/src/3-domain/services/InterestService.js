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
const projectInterests_1 = require("../entities/projectInterests");
class InterestService {
    constructor(interestsRepository) {
        this.interestsRepository = interestsRepository;
    }
    getAllInterests() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.interestsRepository.getByWhereClause({});
        });
    }
    linkUserToInterests(user, interests) {
        return __awaiter(this, void 0, void 0, function* () {
            var userInterests = [];
            var deleteUserInterests = [];
            let interestUserAlreadyExist = yield this.interestsRepository.findLinkUserToInterests(user._id);
            interests
                .filter(n => interestUserAlreadyExist
                .filter(i => i.idInterest === n.value).length === 0)
                .forEach((interest) => {
                var obj = new interestUser_1.InterestUser(interest.value, user._id);
                userInterests.push(obj);
            });
            interestUserAlreadyExist
                .filter(i => interests
                .filter(n => n.value === i.idInterest).length === 0)
                .forEach((interest) => {
                deleteUserInterests.push(interest._id);
            });
            if (userInterests.length > 0)
                yield this.interestsRepository.createLinkToUser(userInterests);
            if (deleteUserInterests.length > 0)
                yield this.interestsRepository.deleteLinkToUser(deleteUserInterests);
        });
    }
    getInterestsByUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.interestsRepository.getInterestsByUser(idUser);
        });
    }
    getInterestsByProject(idProject) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.interestsRepository.getInterestsByProject(idProject);
        });
    }
    linkProjectToInterests(project, interests) {
        return __awaiter(this, void 0, void 0, function* () {
            var projectInterests = [];
            var deleteProjectInterests = [];
            let interestProjectsAlreadyExist = yield this.interestsRepository.findLinkProjectToInterests(project._id);
            interests
                .filter(n => interestProjectsAlreadyExist
                .filter(i => i.idInterests === n.value).length === 0)
                .forEach((interest) => {
                var obj = new projectInterests_1.ProjectInterests(project._id, interest.value);
                projectInterests.push(obj);
            });
            interestProjectsAlreadyExist
                .filter(i => interests
                .filter(n => n.value === i.idInterests).length === 0)
                .forEach((interest) => {
                deleteProjectInterests.push(interest._id);
            });
            if (projectInterests.length > 0)
                yield this.interestsRepository.createLinkToProject(projectInterests);
            if (deleteProjectInterests.length > 0)
                yield this.interestsRepository.deleteLinkToProject(deleteProjectInterests);
        });
    }
}
exports.default = InterestService;
//# sourceMappingURL=InterestService.js.map