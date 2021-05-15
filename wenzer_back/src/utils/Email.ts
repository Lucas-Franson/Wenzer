const nodemailer = require("nodemailer");

const configuracaoEmailProducao = {
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_SENHA
    },
    secure: true
}

const configuracaoEmailTeste = (contaTeste) => ({
    host: 'smtp.ethereal.email',
    auth: contaTeste,
});

async function criaConfiguracaoEmail() {
    if (process.env.NODE_ENV === 'production') {
        return configuracaoEmailProducao;
    } else {
        const contaTeste = await nodemailer.createTestAccount();
        return configuracaoEmailTeste(contaTeste);
    }
}

class Email {

    constructor(protected from: string, 
        protected to: string,
        protected subject: string,
        protected text: string,
        protected html: string) {}

    async enviaEmail() {
        const configuracaoEmail = await criaConfiguracaoEmail();
        const transportador = nodemailer.createTransport(configuracaoEmail);
    
        const info = await transportador.sendMail(this);
    
        if(process.env.NODE_ENV !== 'production'){
            console.log('URL:' + nodemailer.getTestMessageUrl(info));
        }
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