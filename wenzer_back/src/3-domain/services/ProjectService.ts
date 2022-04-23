import { IFollowerRepository } from "../../4-infra/irepositories/IfollowerRepository";
import { IInterestRepository } from "../../4-infra/irepositories/IinterestRepository";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { IProjectRepository } from "../../4-infra/irepositories/IprojectRepository";
import { Followers } from "../entities/followers";
import { Interests } from "../entities/interests";
import { Project } from "../entities/project";
import IProjectService from "../Iservices/IProjectService";

export default class ProjectService implements IProjectService {
    
    constructor(
        private readonly projectRepository: IProjectRepository, 
        private readonly followerRepository: IFollowerRepository,
        private readonly interestRepository: IInterestRepository,
        private readonly postRepository: IPostRepository
    ) {

    }

    async getById(_id: string): Promise<Project | null> {
        return await this.projectRepository.getById(_id);
    }

    async getProjectsByUser(userId: string) {
        return await this.projectRepository.getProjectsByUser(userId);
    }

    async create(project: Project) {
        await this.projectRepository.insert(project);
    }

    async update(project: Project) {
        await this.projectRepository.update(project);
    }
    
    async delete(projectId: string) {
        const interests = await this.interestRepository.findLinkProjectToInterests(projectId);
        const idLinkInterestToProject: string[] = [];

        interests.map((data) => {
            idLinkInterestToProject.push(data._id);
        });

        const posts = await this.postRepository.getPostsByProject(projectId);
        const idsPost: string[] = [];
        
        posts.map((data) => {
            idsPost.push(data._id);
        });

        if (idsPost.length > 0) 
            this.postRepository.deleteListPost(idsPost);
        if (idLinkInterestToProject.length > 0)
            await this.interestRepository.deleteLinkToProject(idLinkInterestToProject);
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

    async followerByIdExist(userId: string, idProject: string): Promise<Followers | null> {
        const where = { idUser: userId, idProject };
        const follower = await this.followerRepository.getByWhereClause(where);
        if (follower && follower.length > 0) {
            return this.followerRepository.handleResult(follower[0]);
        }
        return null;
    }

    async getProjectsByInterests(interests: string[]) {
        return await this.projectRepository.getProjectsByInterests(interests);
    }

    async getProjectsMarketing(interests: string[]) {
        return await this.projectRepository.getProjectsMarketing(interests);
    }

    async getCountOfProjectsByUser(idUser: string): Promise<{count: number}> {
        return await this.projectRepository.getCountProjectsByUser(idUser);
    }

    async getCountOfParticipatingByUser(idUser: string): Promise<{count: number}> {
        return await this.projectRepository.getCountParticipatingByUser(idUser);
    }

    async verifyIfUserIsFollowingProject(idUser: string, idProject: string): Promise<boolean> {
        return await this.projectRepository.verifyIfUserIsFollowingProject(idUser, idProject);
    }

}