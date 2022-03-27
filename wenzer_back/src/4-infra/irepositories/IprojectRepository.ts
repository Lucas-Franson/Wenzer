import { Project } from "../../3-domain/entities/project";
import { IOrm } from "./Iorm";

export interface IProjectRepository extends IOrm<Project> {
    getProjectsByUser(userId: string): Promise<Project[]>;
    convertToProjectObject(project: any): Project | null;
    getAllProjectsInHigh(): Promise<Project[]>;
    getProjectsByInterests(interests: { id: string, name: string }[]): Promise<Project[]>;
    getProjectsMarketing(interests: { id: string, name: string }[]): Promise<Project[]>;
}