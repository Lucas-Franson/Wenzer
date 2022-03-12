import { Project } from "../../3-domain/entities/project";
import { IOrm } from "./Iorm";

export interface IProjectRepository extends IOrm<Project> {
    convertToProjectObject(project: any): Project | null;
}