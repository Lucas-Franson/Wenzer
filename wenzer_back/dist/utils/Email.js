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
const nodemailer = require("nodemailer");
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const configEmailProduction = {
    host: process.env.EMAIL_HOST,
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
    constructor(from, to, subject, text, html) {
        this.from = '';
        this.to = '';
        this.subject = '';
        this.text = '';
        this.html = '';
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
    sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer.createTransport(configEmailProduction);
            const info = yield transporter.sendMail({
                from: this.from,
                to: this.to,
                subject: this.subject,
                text: this.text,
                html: this.html,
            });
        });
    }
}
class EmailVerify extends Email {
    constructor(email) {
        super('"Wenzer" <noreply@wenzer.com.br>', email, 'Verificação de e-mail', '', '');
    }
    prepareHTML(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const _self = this;
            const text = yield readFile('./src/views/email-confirmed-community.html', 'utf8').then((data) => {
                console.log(data);
                _self.html = data.replace('$_TOKEN_$', link);
            });
        });
    }
}
class EmailResetPassword extends Email {
    constructor(user, address) {
        super('"Wenzer" <noreply@wenzer.com.br>', user.email, 'Redefinicação de senha', `Olá! Segue o link de redefinição de senha: ${address}`, '');
    }
}
class EmailMarketingSend extends Email {
    constructor(email) {
        super('"Wenzer" <noreply@wenzer.com.br>', email, 'Bem-vindo ao Wenzer', ``, '');
    }
    prepareHTML(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const _self = this;
            const text = yield readFile('./src/views/email-marketing-welcome.html', 'utf8').then((data) => {
                console.log(data);
                _self.html = data.replace('$_TOKEN_$', link);
            });
        });
    }
}
module.exports = { EmailVerify, EmailResetPassword, EmailMarketingSend };
//# sourceMappingURL=Email.js.map