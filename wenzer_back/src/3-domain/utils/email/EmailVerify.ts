import fs from 'fs';
import { promisify } from 'util';
import { Email } from './EmailAbstract';
import { IEmail } from "./IEmail";

const readFile = promisify(fs.readFile);

export class EmailVerify extends Email implements IEmail {
    constructor(email: string) {
        
        super(
            '"Wenzer" <wenzer.marketing@gmail.com>',
            email,
            'Verificação de e-mail',
            '',
            ''
        );
    }

    async prepareHTML(link: string): Promise<void> {
        const _self = this;
        const text = await readFile(
            './src/1-presentation/views/email-confirmed-community.html', 
            'utf8').then((data: string) => {
            _self.Html = data.replace('$_TOKEN_$', link);
        });
    }
}