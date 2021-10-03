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
}

class Email {

    from = '';
    to = '';
    subject = '';
    text = '';
    html = '';

    constructor(from: string, to: string, subject: string, text: string, html: string) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }

    async sendEmail() {
        const transporter = nodemailer.createTransport(configEmailProduction);
        
        const info = await transporter.sendMail({
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text,
            html: this.html,
        });
    }
}

class EmailVerify extends Email {
    constructor(email: string) {
        
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            email,
            'Verificação de e-mail',
            '',
            ''
        );
    }

    async prepareHTML(link: string) {
        const _self = this;
        const text = await readFile(
            './src/views/email-confirmed-community.html', 
            'utf8').then((data: string) => {
            console.log(data);
            _self.html = data.replace('$_TOKEN_$', link);
        });
    }
}

class EmailResetPassword extends Email {
    constructor(user: any, address: string) {
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            user.email,
            'Redefinicação de senha',
            `Olá! Segue o link de redefinição de senha: ${address}`,
            ''
        );
    }
}

class EmailMarketingSend extends Email {
    constructor(email: string) {
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            email,
            'Bem-vindo ao Wenzer',
            ``,
            ''
        );
    }

    async prepareHTML(link: string) {
        const _self = this;
        const text = await readFile(
            './src/views/email-marketing-welcome.html', 
            'utf8').then((data: string) => {
            console.log(data);
            _self.html = data.replace('$_TOKEN_$', link);
        });
    }
}

export = { EmailVerify, EmailResetPassword, EmailMarketingSend };