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
exports.EmailVerify = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const logger_1 = __importDefault(require("../../../4-infra/utils/logger"));
const EmailAbstract_1 = require("./EmailAbstract");
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
class EmailVerify extends EmailAbstract_1.Email {
    constructor(email) {
        super('"Wenzer" <wenzer.marketing@gmail.com>', email, 'Verificação de e-mail', '', '');
    }
    prepareHTML(link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _self = this;
                const text = yield readFile(__dirname + "/views/email-confirmed-community.html", 'utf8').then((data) => {
                    _self.Html = data.replace('$_TOKEN_$', link);
                });
            }
            catch (err) {
                new logger_1.default('Get View Email Error', err === null || err === void 0 ? void 0 : err.message).log();
            }
        });
    }
}
exports.EmailVerify = EmailVerify;
//# sourceMappingURL=EmailVerify.js.map