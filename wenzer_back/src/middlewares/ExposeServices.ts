import FeedAppService from "../2-application/services/FeedAppService";
import LoginService from "../2-application/services/LoginAppService";
import EmailMarketingService from "../3-domain/services/EmailMarketingService";
import PostService from "../3-domain/services/PostService";
import UserService from "../3-domain/services/UserService";
import EmailMarketingRepository from "../4-infra/repositories/emailMarketingRepository";
import { PostRepository } from "../4-infra/repositories/postRepository";
import UserRepository from "../4-infra/repositories/userRepository";

const loginService = new LoginService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository()));
const feedService = new FeedAppService(new UserService(new UserRepository()), new PostService(new PostRepository()));

const service = () => {
    return Object.freeze({
        loginService,
        feedService
    });
};

export default function ExposeServices(app: any) {
    app.use((req: any, res: any, next: any) => {
        req.service = service();
        next();
    });
}