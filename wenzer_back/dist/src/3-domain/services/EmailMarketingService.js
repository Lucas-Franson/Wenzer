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
const token_1 = require("../../1-presentation/utils/jwt/token");
const emailMarketing_1 = require("../entities/emailMarketing");
const EmailMarketingSend_1 = require("../utils/email/EmailMarketingSend");
class EmailMarketingService {
    constructor(emailMarketingRepository) {
        this.emailMarketingRepository = emailMarketingRepository;
    }
    findEmailMarketing(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = { email };
            const emailMarketing = yield this.emailMarketingRepository.getByWhereClause(where);
            if (emailMarketing.length > 0) {
                return emailMarketing[0];
            }
            return null;
        });
    }
    findEmailMarketingByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = (0, token_1.verifyTokenJWT)(token);
            const where = { email };
            const emailMarketing = yield this.emailMarketingRepository.getByWhereClause(where);
            if (emailMarketing.length > 0) {
                return emailMarketing[0];
            }
            return null;
        });
    }
    create(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let emailToCreate = new emailMarketing_1.EmailMarketing(email);
            this.emailMarketingRepository.insert(emailToCreate);
        });
    }
    validateEmailMarketing(emailMarketing) {
        return __awaiter(this, void 0, void 0, function* () {
            if (emailMarketing.emailIsValid()) {
                throw new Error('Email já validado.');
            }
            emailMarketing.validateEmail();
            yield this.emailMarketingRepository.update(emailMarketing);
        });
    }
    sendEmailMarketingVerification(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, token_1.createTokenJWT)(email);
            const route = '?token=';
            const address = `${process.env.BASE_URL_WEB}${route}${token}`;
            if (process.env.ENVIRONMENT === 'desenv')
                console.log(address);
            const sendEmail = new EmailMarketingSend_1.EmailMarketingSend(email);
            yield sendEmail.prepareHTML(address);
            sendEmail.sendEmail();
        });
    }
}
exports.default = EmailMarketingService;
//# sourceMappingURL=EmailMarketingService.js.map