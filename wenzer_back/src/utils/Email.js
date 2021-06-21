const nodemailer = require("nodemailer");

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

    constructor(from, to, subject, text, html) {
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
    constructor(email, address) {
        
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            email,
            'Verificação de e-mail',
            '',
            `Olá! Verifique seu e-mail <a href="${address}">aqui</a>`
        );
    }
}

class EmailResetPassword extends Email {
    constructor(user, address) {
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            user.email,
            'Redefinicação de senha',
            `Olá! Segue o link de redefinição de senha: ${address}`,
            ''
        );
    }
}

module.exports = { EmailVerify, EmailResetPassword };