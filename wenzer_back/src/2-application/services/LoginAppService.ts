import { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado, ValideSeuEmail } from '../../erros';
import { createTokenJWT } from '../../1-presentation/utils/jwt/token';
import { IUserService } from '../../3-domain/Iservices/IUserService';
import { IEmailMarketingService } from '../../3-domain/Iservices/IEmailMarketingService';
import { UserRegisterViewModel } from '../../1-presentation/viewmodel/UserRegisterViewModel';

export default class LoginAppService {

    constructor(private readonly userService: IUserService, private readonly emailMarketingService: IEmailMarketingService) {
    }

    async register(userViewModel: UserRegisterViewModel) {
        try {
            var userFound = await this.userService.findUserByEmail(userViewModel.getEmail());
            if (userFound) {
                throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
            }

            var user = userViewModel.convertToUserEntity();
            this.userService.create(user);
            this.userService.sendEmailOfVerification(user);
            return user.id;
        } catch(err) {
            // LOG
            throw err;
        }
    }

    async verifyUser({ email, password }: any) {
        const userFound = await this.userService.findUserByEmail(email);
        if (!userFound) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        var valid = await this.userService.validPasswordOfUser(password, userFound.password);
        if (!valid) {
            throw new NaoAutorizado('Email ou senha não encontrados.');
        }

        if (!userFound.emailValid) {
            throw new ValideSeuEmail("Valide seu email para continuar.");
        }

        const accessToken = createTokenJWT(userFound.id, [1, 'h']);

        return accessToken;
    }

    async logout(session: any) {
        session.destroy((err: any) => {
            console.log(err);
        });
    }

    async recoverPassword({ email }: any) {
        const userFound = await this.userService.findUserByEmail(email);
        if (!userFound) {
            throw new NaoEncontrado('Email não encontrado.');
        }

        try {
            this.userService.sendEmailOfResetPassword(userFound);
        } catch(err) {
            throw err;
        }
    }

    async verifyEmail(token: string) {
        try {
            var user = await this.userService.findUserByToken(token);
            if (!user) {
                throw new NaoEncontrado('Usuário não encontrado na plataforma.');
            }

            this.userService.validateUserEmail(user);
        } catch(err) {
            throw err;
        }
    }

    async alterPassword(token: string, password: string) {
        var user = await this.userService.findUserByToken(token);
        if (!user) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await this.userService.validPasswordOfUser(password, user.password);
        if (valid) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        this.userService.updateUserNewPwd(user, password);
    }

    async salvarEmailMarketing(email: string) {
        var emailMarketing = await this.emailMarketingService.findEmailMarketing(email);
        if(emailMarketing?.id) throw new NaoEncontrado('E-mail já cadastrado, verifique sua caixa de entrada.');
        
        this.emailMarketingService.create(email);
    }

    async confirmarEmailMarketing(token: string) {
        try {
            var emailMarketing = await this.emailMarketingService.findEmailMarketingByToken(token);
            if (!emailMarketing) {
                throw new NaoEncontrado('Email não encontrado na plataforma.');
            }
            
            this.emailMarketingService.validateEmailMarketing(emailMarketing);
        } catch(err) {
            throw err;
        }
    }

}