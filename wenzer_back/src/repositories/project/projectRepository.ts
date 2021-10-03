import { Project } from "../../domain/project";
import { IOrm } from "../orm/iorm";
import { Orm } from "../orm/orm";
import { IProjectRepository } from "./IprojectRepository";

export class ProjectRepository extends Orm<Project> implements IProjectRepository, IOrm<Project> {
    
    async validateObject(object: Project):Promise<boolean> {
        let isValid = true;

        if (object.ID == null) {
            isValid = false;
        }

        if (object.Name == null) {
            isValid = false;
        }

        if (object.Description == null) {
            isValid = false;
        }

        if (object.Photo == null) {
            isValid = false;
        }

        if (object.Active == null) {
            isValid = false;
        }

        if (object.Public == null) {
            isValid = false;
        }

        return isValid;
    }
}