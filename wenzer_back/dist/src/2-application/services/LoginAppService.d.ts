import { IUserService } from '../../3-domain/Iservices/IUserService';
import { IEmailMarketingService } from '../../3-domain/Iservices/IEmailMarketingService';
import { UserRegisterViewModel } from '../../1-presentation/viewmodel/UserRegisterViewModel';
export default class LoginAppService {
    private readonly userService;
    private readonly emailMarketingService;
    constructor(userService: IUserService, emailMarketingService: IEmailMarketingService);
    register(userViewModel: UserRegisterViewModel): Promise<string>;
    verifyUser({ email, password }: any): Promise<string>;
    logout(session: any): Promise<void>;
    recoverPassword({ email }: any): Promise<void>;
    verifyEmail(token: string): Promise<void>;
    alterPassword(token: string, password: string): Promise<void>;
    salvarEmailMarketing(email: string): Promise<void>;
    confirmarEmailMarketing(token: string): Promise<void>;
}
