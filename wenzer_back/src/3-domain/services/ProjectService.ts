import { IFollowersRepository } from "../../4-infra/irepositories/IfollowersRepository";
import { IProjectRepository } from "../../4-infra/irepositories/IprojectRepository";
import { Followers } from "../entities/followers";
import { Project } from "../entities/project";
import IProjectService from "../Iservices/IProjectService";

export default class ProjectService implements IProjectService {
    
    constructor(
        private readonly projectRepository: IProjectRepository, 
        private readonly followerRepository: IFollowersRepository
    ) {

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

    async highProjects() {
        return await this.projectRepository.getAllProjectsInHigh();
    }

    async follow(idUser: string, idProject: string) {
        const follower = new Followers(
            idProject,
            idUser
        );
        await this.followerRepository.insert(follower);
    }

    async unfollow(idFollower: string) {
        await this.followerRepository.delete(idFollower);
    }

    async followerByIdExist(userId: string, idProject: string) {
        const follower = await this.followerRepository.get(`WHERE idUser = ${userId.toSql()} and idProject = ${idProject.toSql()}`);
        return this.followerRepository.convertToFollowerObject(follower);
    }

    async getProjectsByInterests(interests: { id: string, name: string }[]) {
        return await this.projectRepository.getProjectsByInterests(interests);
    }

    async getProjectsMarketing(interests: { id: string, name: string }[]) {
        return await this.projectRepository.getProjectsMarketing(interests);
    }

    convertToProjectObject(project: any) {
        if (!project) throw new Error("Projeto está em formato inválido.");
        return  this.projectRepository.convertToProjectObject(project)!;
    }

}