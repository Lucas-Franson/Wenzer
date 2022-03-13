import { Followers } from "../entities/followers";
import { Project } from "../entities/project";

export default interface IProjectService {
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
}