import { Project } from "../../3-domain/entities/project";
import { IOrm } from "./Iorm";

export interface IProjectRepository extends IOrm<Project> {
    getProjectsByUser(userId: string): Promise<Project[]>;
    getAllProjectsInHigh(): Promise<Project[]>;
    getProjectsByInterests(interests: { id: string, name: string }[]): Promise<Project[]>;
    getProjectsMarketing(interests: { id: string, name: string }[]): Promise<Project[]>;
    getCountProjectsByUser(idUser: string): Promise<{count: number}>;
    getCountParticipatingByUser(idUser: string): Promise<{count: number}>;
}