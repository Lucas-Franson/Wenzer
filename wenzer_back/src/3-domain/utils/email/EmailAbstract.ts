import Logger from '../../../4-infra/utils/logger';
import nodemailer from 'nodemailer';

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
        var transporter = nodemailer.createTransport({
          host: 'smtp.hostinger.com',
          port: 465,
          secure: true,
          auth: {
            user: 'suporte@wenzer.com.br',
            pass: 'Wenzer#2022!'
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
            new Logger('Send Email Error', err?.message).log();
          } else {
            new Logger('Sent Email', info?.messageId).log();
          }
        });
    }

    /**
     * @description Obtem o html do email e faz suas modificações necessárias
     * @param link Link para substituir no html
     */
    abstract prepareHTML(link: string): void;
}