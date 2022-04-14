import { Followers } from "../entities/followers";
import { Interests } from "../entities/interests";
import { Project } from "../entities/project";

export default interface IProjectService {
    getProjectsByUser(userId: string): Promise<Project[]>
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
}