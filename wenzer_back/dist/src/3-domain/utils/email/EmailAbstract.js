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
exports.Email = void 0;
const logger_1 = __importDefault(require("../../../4-infra/utils/logger"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USUARIO = process.env.EMAIL_USUARIO;
const EMAIL_SENHA = process.env.EMAIL_SENHA;
class Email {
    constructor(_from, _to, _subject, _text, _html) {
        this.From = '';
        this.To = '';
        this.Subject = '';
        this.Text = '';
        this.Html = '';
        this.From = _from;
        this.To = _to;
        this.Subject = _subject;
        this.Text = _text;
        this.Html = _html;
    }
    /**
     * @description Cria o transportador e realiza o envio do email
     */
    sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var transporter = nodemailer_1.default.createTransport({
                    host: EMAIL_HOST,
                    port: 465,
                    secure: true,
                    auth: {
                        user: EMAIL_USUARIO,
                        pass: EMAIL_SENHA
                    }
                });
                var mailOptions = {
                    from: '"Wenzer" <suporte@wenzer.com.br>',
                    to: this.To,
                    subject: this.Subject,
                    html: this.Html
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        new logger_1.default('Transporter Send Email Error', err === null || err === void 0 ? void 0 : err.message).log();
                    }
                    else {
                        new logger_1.default('Transporter Sent Email', info === null || info === void 0 ? void 0 : info.messageId).log();
                    }
                });
            }
            catch (err) {
                new logger_1.default('Send Email Error', err === null || err === void 0 ? void 0 : err.message).log();
            }
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=EmailAbstract.js.map