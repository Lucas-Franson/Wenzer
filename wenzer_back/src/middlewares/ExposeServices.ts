import FeedAppService from "../2-application/services/FeedAppService";
import LoginAppService from "../2-application/services/LoginAppService";
import NotificationAppService from "../2-application/services/NotificationAppService";
import ProfileAppService from "../2-application/services/ProfileAppService";
import ProjectAppService from "../2-application/services/ProjectAppService";
import { Connections } from "../3-domain/entities/conections";
import EmailMarketingService from "../3-domain/services/EmailMarketingService";
import InterestService from "../3-domain/services/InterestService";
import NotificationService from "../3-domain/services/NotificationService";
import PostService from "../3-domain/services/PostService";
import ProjectService from "../3-domain/services/ProjectService";
import UserService from "../3-domain/services/UserService";
import { ConnectionRepository } from "../4-infra/repositories/connectionRepository";
import EmailMarketingRepository from "../4-infra/repositories/emailMarketingRepository";
import { FollowerRepository } from "../4-infra/repositories/followerRepository";
import { InterestRepository } from "../4-infra/repositories/interestRepository";
import { PostRepository } from "../4-infra/repositories/postRepository";
import { ProjectRepository } from "../4-infra/repositories/projectRepository";
import UserRepository from "../4-infra/repositories/userRepository";

const userService = new UserService(new UserRepository(), new ConnectionRepository());
const emailMarketingService = new EmailMarketingService(new EmailMarketingRepository());
const postService = new PostService(new PostRepository());
const projectService = new ProjectService(new ProjectRepository(), new FollowerRepository(), new InterestRepository(), new PostRepository());
const interestService = new InterestService(new InterestRepository());
const notificationService = new NotificationService(new PostRepository(), new UserRepository());

const loginAppService = new LoginAppService(userService, emailMarketingService);
const feedAppService = new FeedAppService(userService, postService, projectService, interestService);
const profileAppService = new ProfileAppService(userService, interestService, projectService, postService);
const projectAppService = new ProjectAppService(projectService, interestService, postService, userService);
const notificationAppService = new NotificationAppService(notificationService, userService);

const service = () => {
    return Object.freeze({
        loginAppService,
        feedAppService,
        profileAppService,
        projectAppService,
        notificationAppService
    });
};

export default function ExposeServices(app: any) {
    app.use((req: any, res: any, next: any) => {
        req.service = service();
        next();
    });
}