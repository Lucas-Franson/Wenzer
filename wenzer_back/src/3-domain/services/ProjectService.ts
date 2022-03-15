import { IProjectRepository } from "../../4-infra/irepositories/IprojectRepository";
import { Project } from "../entities/project";
import IProjectService from "../Iservices/IProjectService";

export default class ProjectService implements IProjectService {
    
    constructor(private readonly projectRepository: IProjectRepository) {

    }

    async create(project: Project) {
        project._updated_at = new Date();
        project._created_at = new Date();
        await this.projectRepository.insert(project);
    }

    async update(project: Project) {
        project._updated_at = new Date();
        await this.projectRepository.update(project);
    }
    
    async delete(projectId: string) {
        await this.projectRepository.delete(projectId);
    }

    convertToProjectObject(project: any) {
        if (!project) throw new Error("Projeto está em formato inválido.");
        return  this.projectRepository.convertToProjectObject(project)!;
    }

}