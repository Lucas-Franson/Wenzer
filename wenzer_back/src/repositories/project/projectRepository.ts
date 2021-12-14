import { Project } from "../../domain/project";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IProjectRepository } from "./IprojectRepository";

export class ProjectRepository extends Orm<Project> implements IProjectRepository, IOrm<Project> {
    
    async validateObject(object: Project):Promise<boolean> {
        let isValid = true;

        if (object.id == null) {
            isValid = false;
        }

        if (object.name == null) {
            isValid = false;
        }

        if (object.description == null) {
            isValid = false;
        }

        if (object.photo == null) {
            isValid = false;
        }

        if (object.active == null) {
            isValid = false;
        }

        if (object.public == null) {
            isValid = false;
        }

        return isValid;
    }
}