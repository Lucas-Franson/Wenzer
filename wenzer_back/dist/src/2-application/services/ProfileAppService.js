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
class ProfileAppService {
    constructor(userService, interestsService) {
        this.userService = userService;
        this.interestsService = interestsService;
    }
    getAllInterests() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.interestsService.getAllInterests();
        });
    }
    editProfile(userId, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield this.userService.findUserById(userId);
            if (!user)
                throw new Error('Usuário não encontrado.');
            this.userService.updateUserByProfile(user, profile);
        });
    }
}
exports.default = ProfileAppService;
//# sourceMappingURL=ProfileAppService.js.map