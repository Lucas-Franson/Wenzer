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
        await this.userRepository.save(user);

        const token = await Usuario.criaTokenJWT(user.id, [1, 'h']);
        const rota = '/api/verifica_email/';
        const endereco = `${process.env.BASE_URL}${rota}${token}`;
        const emailVerificacao = new EmailVerificacao(email, endereco);
        
        emailVerificacao.enviaEmail();

        return user.id;
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
        const rota = '/api/alterar_senha/';
        const endereco = `${process.env.BASE_URL}${rota}${token}`;

        const emailVerificacao = new EmailRedefinicaoSenha(userOne, endereco);
        await emailVerificacao.enviaEmail();
    }
}

export { LoginService };