import AWS from 'aws-sdk';

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
        AWS.config.update({region: 'us-east-1'});

        const params = {
            Destination: { 
              ToAddresses: [
                this.To
              ]
            },
            Message: {
              Body: { 
                Html: {
                 Charset: "UTF-8",
                 Data: this.Html
                }
               },
               Subject: {
                Charset: 'UTF-8',
                Data: this.Subject
               }
              },
            Source: this.From
        };

        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

        sendPromise.then(
            function(data) {
              console.log(data.MessageId);
            }).catch(
              function(err) {
              console.error(err, err.stack);
            });
    }

    /**
     * @description Obtem o html do email e faz suas modificações necessárias
     * @param link Link para substituir no html
     */
    abstract prepareHTML(link: string): void;
}