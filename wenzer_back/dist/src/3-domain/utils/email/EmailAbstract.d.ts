export declare abstract class Email {
    From: string;
    To: string;
    Subject: string;
    Text: string;
    Html: string;
    constructor(_from: string, _to: string, _subject: string, _text: string, _html: string);
    /**
     * @description Cria o transportador e realiza o envio do email
     */
    sendEmail(): Promise<void>;
    /**
     * @description Obtem o html do email e faz suas modificações necessárias
     * @param link Link para substituir no html
     */
    abstract prepareHTML(link: string): void;
}
