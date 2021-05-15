const nodemailer = require("nodemailer");

const configuracaoEmailProducao = {
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

    constructor(protected from: string, 
        protected to: string,
        protected subject: string,
        protected text: string,
        protected html: string) {}

    async enviaEmail() {
        const transportador = nodemailer.createTransport(configuracaoEmailProducao);
        
        const info = await transportador.sendMail({
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text,
            html: this.html,
        });
    }
}

class EmailVerificacao extends Email {
    constructor(email, endereco) {
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            email,
            'Verificação de e-mail',
            `Olá! Verifique seu e-mail aqui: ${endereco}`,
            ''
        );
    }
}

class EmailRedefinicaoSenha extends Email {
    constructor(usuario) {
        super(
            '"Wenzer" <noreply@wenzer.com.br>',
            usuario.email,
            'Redefinicação de senha',
            `Olá! Você pediu para redefinir sua senha`,
            ''
        );
    }
}

export { EmailVerificacao, EmailRedefinicaoSenha };