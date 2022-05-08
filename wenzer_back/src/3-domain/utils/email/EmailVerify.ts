import fs from 'fs';
import { promisify } from 'util';
import Logger from '../../../4-infra/utils/logger';
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
        try {
            
            const _self = this;
            const text = await readFile(
                __dirname + "/views/email-confirmed-community.html", 
                'utf8').then((data: string) => {
                _self.Html = data.replace('$_TOKEN_$', link);
            });
        } catch (err: any) {
            new Logger('Get View Email Error', err?.message).log();
        }
    }
}