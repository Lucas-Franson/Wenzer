import FeedAppService from "../2-application/services/FeedAppService";
import LoginAppService from "../2-application/services/LoginAppService";
import ProfileAppService from "../2-application/services/ProfileAppService";
import ProjectAppService from "../2-application/services/ProjectAppService";
import { Connections } from "../3-domain/entities/conections";
import EmailMarketingService from "../3-domain/services/EmailMarketingService";
import InterestService from "../3-domain/services/InterestService";
import PostService from "../3-domain/services/PostService";
import ProjectService from "../3-domain/services/ProjectService";
import UserService from "../3-domain/services/UserService";
import { ConnectionsRepository } from "../4-infra/repositories/connectionsRepository";
import EmailMarketingRepository from "../4-infra/repositories/emailMarketingRepository";
import { FollowersRepository } from "../4-infra/repositories/followersRepository";
import { InterestsRepository } from "../4-infra/repositories/interestsRepository";
import { PostRepository } from "../4-infra/repositories/postRepository";
import { ProjectRepository } from "../4-infra/repositories/projectRepository";
import UserRepository from "../4-infra/repositories/userRepository";

const userService = new UserService(new UserRepository(), new ConnectionsRepository());
const emailMarketingService = new EmailMarketingService(new EmailMarketingRepository());
const postService = new PostService(new PostRepository());
const projectService = new ProjectService(new ProjectRepository(), new FollowersRepository());
const interestService = new InterestService(new InterestsRepository());

const loginAppService = new LoginAppService(userService, emailMarketingService);
const feedAppService = new FeedAppService(userService, postService, projectService, interestService);
const profileAppService = new ProfileAppService(userService, interestService);
const projectAppService = new ProjectAppService(projectService, interestService, postService);

const service = () => {
    return Object.freeze({
        loginAppService,
        feedAppService,
        profileAppService,
        projectAppService
    });
};

export default function ExposeServices(app: any) {
    app.use((req: any, res: any, next: any) => {
        req.service = service();
        next();
    });
}