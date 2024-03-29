import fs from 'fs';
import { Email } from "./EmailAbstract";
import { promisify } from 'util';
const readFile = promisify(fs.readFile);

export class EmailMarketingSend extends Email {
    constructor(email: string) {
        super(
            '"Wenzer" <wenzer.marketing@gmail.com>',
            email,
            'Bem-vindo ao Wenzer',
            ``,
            ''
        );
    }

    async prepareHTML(link: string): Promise<void> {
        const _self = this;
        const text = await readFile(
            __dirname + "/views/Confirmar_Acesso_Marketing.html", 
            'utf8').then((data: string) => {
            _self.Html = data.replace('$_TOKEN_$', link);
        });
    }
}