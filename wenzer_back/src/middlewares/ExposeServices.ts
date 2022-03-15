import FeedAppService from "../2-application/services/FeedAppService";
import LoginAppService from "../2-application/services/LoginAppService";
import ProfileAppService from "../2-application/services/ProfileAppService";
import ProjectAppService from "../2-application/services/ProjectAppService";
import EmailMarketingService from "../3-domain/services/EmailMarketingService";
import InterestService from "../3-domain/services/InterestService";
import PostService from "../3-domain/services/PostService";
import ProjectService from "../3-domain/services/ProjectService";
import UserService from "../3-domain/services/UserService";
import EmailMarketingRepository from "../4-infra/repositories/emailMarketingRepository";
import { InterestsRepository } from "../4-infra/repositories/interestsRepository";
import { PostRepository } from "../4-infra/repositories/postRepository";
import { ProjectRepository } from "../4-infra/repositories/projectRepository";
import UserRepository from "../4-infra/repositories/userRepository";

const loginService = new LoginAppService(new UserService(new UserRepository()), new EmailMarketingService(new EmailMarketingRepository()));
const feedService = new FeedAppService(new UserService(new UserRepository()), new PostService(new PostRepository()));
const profileService = new ProfileAppService(new UserService(new UserRepository()), new InterestService(new InterestsRepository()));
const projectService = new ProjectAppService(new ProjectService(new ProjectRepository()));

const service = () => {
    return Object.freeze({
        loginService,
        feedService,
        profileService,
        projectService
    });
};

export default function ExposeServices(app: any) {
    app.use((req: any, res: any, next: any) => {
        req.service = service();
        next();
    });
}