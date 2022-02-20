import LoginService from "../2-application/services/LoginAppService";
import EmailMarketingService from "../3-domain/services/EmailMarketingService";
import UserService from "../3-domain/services/UserService";
import EmailMarketingRepository from "../4-infra/repositories/emailMarketingRepository";
import UserRepository from "../4-infra/repositories/userRepository";

const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository()));

const service = () => {
    return Object.freeze({
        loginService
    });
};

export default function ExposeServices(app: any) {
    app.use((req: any, res: any, next: any) => {
        req.service = service();
        next();
    });
}