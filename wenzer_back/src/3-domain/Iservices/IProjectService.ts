import { Followers } from "../entities/followers";
import { Project } from "../entities/project";

export default interface IProjectService {
    getProjectsByUser(userId: string): Promise<Project[]>
    create(project: Project): Promise<void>;
    update(project: Project): Promise<void>;
    delete(projectId: string): Promise<void>;
    convertToProjectObject(project: any): Project;
    highProjects(): Promise<Project[]>;
    follow(userId: string, idProject: string): Promise<void>;
    unfollow(idFollower: string): Promise<void>;
    followerByIdExist(userId: string, idProject: string): Promise<Followers | null>;
    getProjectsByInterests(interests: { id: string, name: string }[]): Promise<Project[]>;
    getProjectsMarketing(interests: { id: string, name: string }[]): Promise<Project[]>;
    getCountOfProjectsByUser(idUser: string): Promise<{count: number}>;
    getCountOfParticipatingByUser(idUser: string): Promise<{count: number}>;
}