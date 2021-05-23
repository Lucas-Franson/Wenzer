import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado, ValideSeuEmail } from '../erros';
import { ILogin, ILoginCadastro } from '../interfaces/ILogin';
import { UserRepository } from '../repositories/UserRepository';
import { EmailResetPassword, EmailVerify } from '../utils/Email';

class LoginService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async register({ name, email, password }: ILoginCadastro) {
        const userExists = await this.userRepository.findOne({
            email
        });

        if (userExists) {
            throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
        }

        const passwordHash = await User.generatePasswordHash(password);
        
        const user = this.userRepository.create({
            name, email, emailValid: false, password: passwordHash
        });
        
        const token = await User.createTokenJWT(user.id, [1, 'h']);
        const route = '/welcome?token=';
        const address = `${process.env.BASE_URL_WEB}${route}${token}`;
        
        if (process.env.ENVIRONMENT === 'desenv') console.log(address);

        try {
            await this.userRepository.save(user);
            const emailVerify = new EmailVerify(email, address);
            emailVerify.sendEmail();

            return user.id;
        } catch(err) {
            throw err;
        }
    }

    async verifyUsuario({ email, password }: ILogin) {
        const userOne = await this.userRepository.findOne({
            email
        });
        
        if (!userOne) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        if (!userOne.emailValid) {
            throw new ValideSeuEmail("Valide seu email para continuar.");
        }

        const valid = await User.verifyPassword(password, userOne.password);

        if (!valid) {
            throw new NaoAutorizado('Email ou senha não encontrados');
        }
        
        return userOne;
    }

    async recoverPassword({ email }) {
        const userOne = await this.userRepository.findOne({
            email
        });

        if (!userOne) {
            throw new NaoEncontrado('Email não encontrado.');
        }

        const token = await User.createTokenJWT(userOne.id, [1, 'h']);
        const route = '/api/alterar-senha/';
        const address = `${process.env.BASE_URL}${route}${token}`;

        try {
            const emailVerify = new EmailResetPassword(userOne, address);
            await emailVerify.sendEmail();
        } catch(err) {
            throw err;
        }
    }

    async verifyEmail({ id }) {
        const user = await this.userRepository.findOne({
            id
        });

        if (!user) {
            throw new NaoEncontrado('Email não encontrado na plataforma.');
        }

        if (user.emailValid) {
            throw new Error('Email já validado.');
        }

        try {
            user.emailValid = true;
            this.userRepository.save(user);
        } catch(err) {
            throw err;
        }
    }

    async alterPassword({ id }, password) {
        const userExists = await this.userRepository.findOne({
            id
        });

        if (!userExists) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await User.verifyPassword(password, userExists.password);

        if (valid) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        userExists.password = await User.generatePasswordHash(password);
        this.userRepository.save(userExists);
    }

    async excluir(email) {
        const userExists = await this.userRepository.findOne({
            email
        });

        if (!userExists) {
            throw new NaoEncontrado('Email não encontrado');
        }

        await this.userRepository.delete({ email });
    }
}

export { LoginService };