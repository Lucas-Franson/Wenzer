import { IFollowerRepository } from "../../4-infra/irepositories/IfollowerRepository";
import { IInterestRepository } from "../../4-infra/irepositories/IinterestRepository";
import { IParticipantRepository } from "../../4-infra/irepositories/IparticipantRepository";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { IProjectRepository } from "../../4-infra/irepositories/IprojectRepository";
import { Followers } from "../entities/followers";
import { Participant } from "../entities/participant";
import { Project } from "../entities/project";
import { User } from "../entities/user";
import { UserProjectGoodIdea } from "../entities/userProjectGoodIdea";
import IProjectService from "../Iservices/IProjectService";
export default class ProjectService implements IProjectService {
    private readonly projectRepository;
    private readonly followerRepository;
    private readonly interestRepository;
    private readonly postRepository;
    private readonly participantRepository;
    constructor(projectRepository: IProjectRepository, followerRepository: IFollowerRepository, interestRepository: IInterestRepository, postRepository: IPostRepository, participantRepository: IParticipantRepository);
    getById(_id: string): Promise<Project | null>;
    getProjectsByUser(userId: string): Promise<Project[]>;
    create(project: Project): Promise<void>;
    update(project: Project): Promise<void>;
    delete(projectId: string): Promise<void>;
    highProjects(): Promise<Project[]>;
    follow(idUser: string, idProject: string): Promise<void>;
    unfollow(idFollower: string): Promise<void>;
    followerByIdExist(userId: string, idProject: string): Promise<Followers | null>;
    getProjectsByInterests(interests: string[]): Promise<Project[]>;
    getProjectsMarketing(interests: string[]): Promise<Project[]>;
    getCountOfProjectsByUser(idUser: string): Promise<{
        count: number;
    }>;
    getCountOfParticipatingByUser(idUser: string): Promise<{
        count: number;
    }>;
    verifyIfUserIsFollowingProject(idUser: string, idProject: string): Promise<boolean>;
    setUserProjectGoodIdea(idUser: string, idProject: string, userProjectAlreadyExist: boolean): void;
    userProjectGoodIdeaAlreadyExist(idUser: string, idProject: string): Promise<UserProjectGoodIdea>;
    sumCountOfGoodIdeia(idProject: string, userProjectExist: boolean): Promise<void>;
    search(userId: string, search: string): Promise<Project[]>;
    getParticipants(_id: string): Promise<User[]>;
    acceptParticipant(idProject: string, idUserRequest: string, role: string): Promise<void>;
    rejectParticipant(idProject: string, idUserRequest: string): Promise<void>;
    requestParticipant(idUserServer: string, idProject: string): Promise<void>;
    removeParticipant(idProject: string, idUserRequest: string): Promise<void>;
    createParticipantLeader(proj: Project): Promise<void>;
    getParticipantByProjectAndUser(idProject: string, idUserRequest: string): Promise<Participant>;
}
