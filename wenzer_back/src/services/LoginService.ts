import { getCustomRepository, Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario';
import { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado } from '../erros';
import { ILogin, ILoginCadastro } from '../interfaces/ILogin';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { EmailRedefinicaoSenha, EmailVerificacao } from '../utils/Email';

class LoginService {
    private userRepository: Repository<Usuario>;

    constructor() {
        this.userRepository = getCustomRepository(UsuarioRepository);
    }

    async cadastrar({ nome, email, senha }: ILoginCadastro) {
        const userExists = await this.userRepository.findOne({
            email
        });

        if (userExists) {
            throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
        }

        const senhaHash = await Usuario.gerarSenhaHash(senha);
        
        const user = this.userRepository.create({
            nome, email, emailValidado: false, senha: senhaHash
        });
        
        const token = await Usuario.criaTokenJWT(user.id, [1, 'h']);
        const rota = '/api/verifica-email/';
        const endereco = `${process.env.BASE_URL}${rota}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(endereco);

        try {
            await this.userRepository.save(user);
            const emailVerificacao = new EmailVerificacao(email, endereco);
            emailVerificacao.enviaEmail();

            return user.id;
        } catch(err) {
            throw err;
        }
    }

    async verificarUsuario({ email, senha }: ILogin) {
        const userOne = await this.userRepository.findOne({
            email
        });
        
        if (!userOne) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valido = await Usuario.verificaSenha(senha, userOne.senha);

        if (!valido) {
            throw new NaoAutorizado('Email ou senha não encontrados');
        }
        
        return userOne;
    }

    async recuperarSenha({ email }) {
        const userOne = await this.userRepository.findOne({
            email
        });

        if (!userOne) {
            throw new NaoEncontrado('Email não encontrado.');
        }

        const token = await Usuario.criaTokenJWT(userOne.id, [1, 'h']);
        const rota = '/api/alterar-senha/';
        const endereco = `${process.env.BASE_URL}${rota}${token}`;

        try {
            const emailVerificacao = new EmailRedefinicaoSenha(userOne, endereco);
            await emailVerificacao.enviaEmail();
        } catch(err) {
            throw err;
        }
    }

    async verificaEmail({ id }) {
        const usuario = await this.userRepository.findOne({
            id
        });

        if (!usuario) {
            throw new NaoEncontrado('Email não encontrado na plataforma.');
        }

        if (usuario.emailValidado) {
            throw new Error('Email já validado.');
        }

        try {
            usuario.emailValidado = true;
            this.userRepository.save(usuario);
        } catch(err) {
            throw err;
        }
    }

    async alterarSenha({ id }, senha) {
        const userExists = await this.userRepository.findOne({
            id
        });

        if (!userExists) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valido = await Usuario.verificaSenha(senha, userExists.senha);

        if (valido) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        userExists.senha = await Usuario.gerarSenhaHash(senha);
        this.userRepository.save(userExists);
    }
}

export { LoginService };