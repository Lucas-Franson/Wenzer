import { Followers } from "../entities/followers";
import { Interests } from "../entities/interests";
import { Participant } from "../entities/participant";
import { Project } from "../entities/project";
import { User } from "../entities/user";
import { UserProjectGoodIdea } from "../entities/userProjectGoodIdea";

export default interface IProjectService {
    getProjectsByUser(userId: string): Promise<Project[]>;
    getById(_id: string): Promise<Project | null>;
    create(project: Project): Promise<void>;
    update(project: Project): Promise<void>;
    delete(projectId: string): Promise<void>;
    highProjects(): Promise<Project[]>;
    follow(userId: string, idProject: string): Promise<void>;
    unfollow(idFollower: string): Promise<void>;
    followerByIdExist(userId: string, idProject: string): Promise<Followers | null>;
    getProjectsByInterests(interests: string[]): Promise<Project[]>;
    getProjectsMarketing(interests: string[]): Promise<Project[]>;
    getCountOfProjectsByUser(idUser: string): Promise<{count: number}>;
    getCountOfParticipatingByUser(idUser: string): Promise<{count: number}>;
    verifyIfUserIsFollowingProject(idUser: string, idProject: string): Promise<boolean>;
    setUserProjectGoodIdea(idUser: string, idProject: string, userProjectAlreadyExist: boolean): void;
    userProjectGoodIdeaAlreadyExist(idUser: string, idProject: string): Promise<UserProjectGoodIdea>;
    sumCountOfGoodIdeia(idProject: string, userProjectExist: boolean): void;
    search(userId: string, search: string): Promise<Project[]>;
    getParticipants(_id: string): Promise<User[]>;
    acceptParticipant(idProject: string, idUserRequest: string, role: string): Promise<void>;
    rejectParticipant(idProject: string, idUserRequest: string): Promise<void>;
    requestParticipant(idUserServer: string, idProject: string): Promise<void>;
    removeParticipant(idProject: string, idUserRequest: string): Promise<void>;
    createParticipantLeader(proj: Project): Promise<void>;
    getParticipantByProjectAndUser(idProject: string, idUserRequest: string): Promise<Participant>;
}