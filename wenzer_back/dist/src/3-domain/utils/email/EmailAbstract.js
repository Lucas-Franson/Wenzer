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
const nodemailer_1 = __importDefault(require("nodemailer"));
const configEmailProduction = {
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_SENHA
    },
    secure: true,
    tls: {
        rejectUnauthorized: false
    }
};
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
            const transporter = nodemailer_1.default.createTransport(configEmailProduction);
            const info = yield transporter.sendMail({
                from: this.From,
                to: this.To,
                subject: this.Subject,
                text: this.Text,
                html: this.Html,
            }, (err) => {
                console.log(err);
            });
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=EmailAbstract.js.map