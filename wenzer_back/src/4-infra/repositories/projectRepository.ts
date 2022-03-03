import { Project } from "../../3-domain/entities/project";
import { IOrm } from "../irepositories/Iorm";
import { Orm } from "./orm";
import { IProjectRepository } from "../irepositories/IprojectRepository";

export class ProjectRepository extends Orm<Project> implements IProjectRepository {
    
}