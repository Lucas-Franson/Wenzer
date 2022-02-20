import { Email } from "./EmailAbstract";

export class EmailResetPassword extends Email {
    constructor(user: any, address: string) {
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            user.email,
            'Redefinicação de senha',
            `Olá! Segue o link de redefinição de senha: ${address}`,
            ''
            );
    }

    async prepareHTML(link: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}