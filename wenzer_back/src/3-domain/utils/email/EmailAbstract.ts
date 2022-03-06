import nodemailer from "nodemailer";

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
}

export abstract class Email {

    From: string = '';
    To: string = '';
    Subject: string = '';
    Text: string = '';
    Html: string = '';

    constructor(_from: string, _to: string, _subject: string, _text: string, _html: string) {
        this.From = _from;
        this.To = _to;
        this.Subject = _subject;
        this.Text = _text;
        this.Html = _html;
    }

    /**
     * @description Cria o transportador e realiza o envio do email
     */
    async sendEmail() {
        const transporter = nodemailer.createTransport(configEmailProduction);
        
        const info = await transporter.sendMail({
            from: this.From,
            to: this.To,
            subject: this.Subject,
            text: this.Text,
            html: this.Html,
        }, (err) => {
            console.log(err);
        });
    }

    /**
     * @description Obtem o html do email e faz suas modificações necessárias
     * @param link Link para substituir no html
     */
    abstract prepareHTML(link: string): void;
}