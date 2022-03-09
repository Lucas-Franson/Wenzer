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
const ProfileViewModel_1 = require("../viewmodel/ProfileViewModel");
class ProfileController {
    getAllInterests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const interests = req.service.profileService.getAllInterests();
                res.status(200).json(interests);
            }
            catch (err) {
                next(err);
            }
        });
    }
    editProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, bio, photo, title, interests } = req.body;
            const profile = new ProfileViewModel_1.ProfileViewModel(name, bio, photo, title, interests);
            try {
                profile.validateModel();
                req.service.profileService.editProfile(req.session.userId, profile);
                res.status(200).json();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProfileController;
//# sourceMappingURL=ProfileController.js.map