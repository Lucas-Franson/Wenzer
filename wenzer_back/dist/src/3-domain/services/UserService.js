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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../1-presentation/utils/jwt/token");
const EmailVerify_1 = require("../utils/email/EmailVerify");
const EmailResetPassword_1 = require("../utils/email/EmailResetPassword");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = `WHERE Email = '${email}'`;
            return yield this.userRepository.get(where);
        });
    }
    findUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, token_1.verifyTokenJWT)(token);
            return yield this.findUserById(id);
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getById(userId);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPassword = yield this.generatePasswordHash(user.getPassword());
            user.setPassword(newPassword);
            yield this.userRepository.insert(user);
        });
    }
    updateUserByProfile(user, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            user.name = profile.getName();
            user.bio = profile.getBio();
            user.title = profile.getTitle();
            user.photo = profile.getPhoto();
            yield this.updateUser(user);
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.update(user);
        });
    }
    updateUserNewPwd(user, pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPassword = yield this.generatePasswordHash(pwd);
            user.setPassword(newPassword);
            this.userRepository.update(user);
        });
    }
    sendEmailOfVerification(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, token_1.createTokenJWT)(user.getId(), [1, 'h']);
            const route = '/login?token=';
            const address = `${process.env.BASE_URL_WEB}${route}${token}`;
            if (process.env.ENVIRONMENT === 'desenv')
                console.log(address);
            const emailVerify = new EmailVerify_1.EmailVerify(user.getEmail());
            yield emailVerify.prepareHTML(address);
            emailVerify.sendEmail();
        });
    }
    sendEmailOfResetPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, token_1.createTokenJWT)(user.getId(), [1, 'h']);
            const route = '/recover-password?token=';
            const address = `${process.env.BASE_URL_WEB}${route}${token}`;
            if (process.env.ENVIRONMENT === 'desenv')
                console.log(address);
            const emailVerify = new EmailResetPassword_1.EmailResetPassword(user, address);
            yield emailVerify.prepareHTML(address);
            yield emailVerify.sendEmail();
        });
    }
    validPasswordOfUser(pwdSent, pwdSaved) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = yield this.verifyPassword(pwdSent, pwdSaved);
            return valid;
        });
    }
    validateUserEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.emailIsValid()) {
                throw new Error('Email já validado.');
            }
            user.validateEmail();
            yield this.userRepository.update(user);
        });
    }
    verifyPassword(password, passwordHash) {
        const passwordValid = bcrypt_1.default.compare(password, passwordHash);
        return passwordValid;
    }
    generatePasswordHash(password) {
        const custoHash = 12;
        return bcrypt_1.default.hash(password, custoHash);
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map