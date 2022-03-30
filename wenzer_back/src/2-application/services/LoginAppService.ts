import { NaoAutorizado, NaoEncontrado, UsuarioJaCadastrado, ValideSeuEmail } from '../../erros';
import { createTokenJWT } from '../../1-presentation/utils/jwt/token';
import { IUserService } from '../../3-domain/Iservices/IUserService';
import { IEmailMarketingService } from '../../3-domain/Iservices/IEmailMarketingService';
import { UserRegisterViewModel } from '../../1-presentation/viewmodel/UserRegisterViewModel';
import { User } from '../../3-domain/entities/user';

export default class LoginAppService {

    constructor(private readonly userService: IUserService, private readonly emailMarketingService: IEmailMarketingService) {
    }

    async register(userViewModel: UserRegisterViewModel) {
        try {
            var userFound = await this.userService.findUserByEmail(userViewModel.getEmail());

            if (userFound && userFound.emailIsValid()) {
                throw new UsuarioJaCadastrado("Usuário já cadastrado na plataforma.");
            }

            let user = userViewModel.convertToUserEntity();

            if (userFound && !userFound.emailIsValid()) {
                user = new User(userViewModel.getName(),
                                userViewModel.getEmail(),
                                userViewModel.getPassword(),
                                userFound._title,
                                userFound._photo,
                                userFound._bio,
                                false,
                                userFound.getId(),
                                userFound.getCreatedAt(),
                                new Date()
                                );
                await this.userService.updateUserNewPwd(user, userViewModel.getPassword());
            } else {
                await this.userService.create(user);
            }
            
            await this.userService.sendEmailOfVerification(user);
            return user.getId();
        } catch(err) {
            // LOG
            throw err;
        }
    }

    async verifyUser({ email, password }: any) {
        let found = await this.userService.findUserByEmail(email);

        if (!found) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        var valid = await this.userService.validPasswordOfUser(password, found.getPassword());
        if (!valid) {
            throw new NaoAutorizado('Email ou senha não encontrados.');
        }

        if (!found.emailIsValid()) {
            throw new ValideSeuEmail("Valide seu email para continuar.");
        }

        return this.createLoginReturnJson(found);
    }

    createLoginReturnJson(found: User) {
        const accessToken = createTokenJWT(found.getId());
        const id = found.getId();
        const name = found.getName();
        const email = found.getEmail();
        const photo = found.getPhoto();

        return { id, name, email, photo, accessToken };
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
            await this.userService.sendEmailOfResetPassword(userFound);
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

            await this.userService.validateUserEmail(user);
        } catch(err) {
            throw err;
        }
    }

    async alterPassword(token: string, password: string) {
        var user = await this.userService.findUserByToken(token);
        if (!user) {
            throw new NaoEncontrado('Email ou senha não encontrados.');
        }

        const valid = await this.userService.validPasswordOfUser(password, user.getPassword());
        if (valid) {
            throw new Error("Essa senha é a mesma da sua conta atual.");
        }

        await this.userService.updateUserNewPwd(user, password);
    }

    async salvarEmailMarketing(email: string) {
        var emailMarketing = await this.emailMarketingService.findEmailMarketing(email);
        if(emailMarketing?.getId()) throw new NaoEncontrado('E-mail já cadastrado, verifique sua caixa de entrada.');
        
        await this.emailMarketingService.create(email);
    }

    async confirmarEmailMarketing(token: string) {
        try {
            var emailMarketing = await this.emailMarketingService.findEmailMarketingByToken(token);
            if (!emailMarketing) {
                throw new NaoEncontrado('Email não encontrado na plataforma.');
            }
            
            await this.emailMarketingService.validateEmailMarketing(emailMarketing);
        } catch(err) {
            throw err;
        }
    }

}