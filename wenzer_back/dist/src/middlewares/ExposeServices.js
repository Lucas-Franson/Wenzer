"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FeedAppService_1 = __importDefault(require("../2-application/services/FeedAppService"));
const LoginAppService_1 = __importDefault(require("../2-application/services/LoginAppService"));
const ProfileAppService_1 = __importDefault(require("../2-application/services/ProfileAppService"));
const EmailMarketingService_1 = __importDefault(require("../3-domain/services/EmailMarketingService"));
const InterestService_1 = __importDefault(require("../3-domain/services/InterestService"));
const PostService_1 = __importDefault(require("../3-domain/services/PostService"));
const UserService_1 = __importDefault(require("../3-domain/services/UserService"));
const emailMarketingRepository_1 = __importDefault(require("../4-infra/repositories/emailMarketingRepository"));
const interestsRepository_1 = require("../4-infra/repositories/interestsRepository");
const postRepository_1 = require("../4-infra/repositories/postRepository");
const userRepository_1 = __importDefault(require("../4-infra/repositories/userRepository"));
const loginService = new LoginAppService_1.default(new UserService_1.default(new userRepository_1.default()), new EmailMarketingService_1.default(new emailMarketingRepository_1.default()));
const feedService = new FeedAppService_1.default(new UserService_1.default(new userRepository_1.default()), new PostService_1.default(new postRepository_1.PostRepository()));
const profileService = new ProfileAppService_1.default(new UserService_1.default(new userRepository_1.default()), new InterestService_1.default(new interestsRepository_1.InterestsRepository()));
const service = () => {
    return Object.freeze({
        loginService,
        feedService,
        profileService
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