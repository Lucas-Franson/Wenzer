import { Project } from "../../3-domain/entities/project";
import { Orm } from "./orm";
import { IProjectRepository } from "../irepositories/IprojectRepository";
export declare class ProjectRepository extends Orm<Project> implements IProjectRepository {
}
