"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FeedAppService_1 = __importDefault(require("../2-application/services/FeedAppService"));
const LoginAppService_1 = __importDefault(require("../2-application/services/LoginAppService"));
const NotificationAppService_1 = __importDefault(require("../2-application/services/NotificationAppService"));
const ProfileAppService_1 = __importDefault(require("../2-application/services/ProfileAppService"));
const ProjectAppService_1 = __importDefault(require("../2-application/services/ProjectAppService"));
const EmailMarketingService_1 = __importDefault(require("../3-domain/services/EmailMarketingService"));
const InterestService_1 = __importDefault(require("../3-domain/services/InterestService"));
const NotificationService_1 = __importDefault(require("../3-domain/services/NotificationService"));
const PostService_1 = __importDefault(require("../3-domain/services/PostService"));
const ProjectService_1 = __importDefault(require("../3-domain/services/ProjectService"));
const UserService_1 = __importDefault(require("../3-domain/services/UserService"));
const connectionRepository_1 = require("../4-infra/repositories/connectionRepository");
const emailMarketingRepository_1 = __importDefault(require("../4-infra/repositories/emailMarketingRepository"));
const followerRepository_1 = require("../4-infra/repositories/followerRepository");
const interestRepository_1 = require("../4-infra/repositories/interestRepository");
const postRepository_1 = require("../4-infra/repositories/postRepository");
const projectRepository_1 = require("../4-infra/repositories/projectRepository");
const userRepository_1 = __importDefault(require("../4-infra/repositories/userRepository"));
const userService = new UserService_1.default(new userRepository_1.default(), new connectionRepository_1.ConnectionRepository());
const emailMarketingService = new EmailMarketingService_1.default(new emailMarketingRepository_1.default());
const postService = new PostService_1.default(new postRepository_1.PostRepository());
const projectService = new ProjectService_1.default(new projectRepository_1.ProjectRepository(), new followerRepository_1.FollowerRepository(), new interestRepository_1.InterestRepository(), new postRepository_1.PostRepository());
const interestService = new InterestService_1.default(new interestRepository_1.InterestRepository());
const notificationService = new NotificationService_1.default(new postRepository_1.PostRepository(), new userRepository_1.default());
const loginAppService = new LoginAppService_1.default(userService, emailMarketingService);
const feedAppService = new FeedAppService_1.default(userService, postService, projectService, interestService);
const profileAppService = new ProfileAppService_1.default(userService, interestService, projectService, postService);
const projectAppService = new ProjectAppService_1.default(projectService, interestService, postService, userService);
const notificationAppService = new NotificationAppService_1.default(notificationService, userService);
const service = () => {
    return Object.freeze({
        loginAppService,
        feedAppService,
        profileAppService,
        projectAppService,
        notificationAppService
    });
};
function ExposeServices(app) {
    app.use((req, res, next) => {
        req.service = service();
        next();
    });
}
exports.default = ExposeServices;
//# sourceMappingURL=ExposeServices.js.map