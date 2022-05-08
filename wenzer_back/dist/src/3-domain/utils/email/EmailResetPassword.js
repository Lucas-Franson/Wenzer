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
exports.EmailResetPassword = void 0;
const EmailAbstract_1 = require("./EmailAbstract");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
class EmailResetPassword extends EmailAbstract_1.Email {
    constructor(user, address) {
        super('"Wenzer" <wenzer.marketing@gmail.com>', user.email, 'Redefinicação de senha', `Olá! Segue o link de redefinição de senha: ${address}`, '');
    }
    prepareHTML(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const _self = this;
            const text = yield readFile('../../../1-presentation/views/Alterar_Senha.html', 'utf8').then((data) => {
                _self.Html = data.replace('$_URL_UPDATE_$', link);
            });
        });
    }
}
exports.EmailResetPassword = EmailResetPassword;
//# sourceMappingURL=EmailResetPassword.js.map