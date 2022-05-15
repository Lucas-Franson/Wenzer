import { IFollowerRepository } from "../../4-infra/irepositories/IfollowerRepository";
import { IInterestRepository } from "../../4-infra/irepositories/IinterestRepository";
import { IParticipantRepository } from "../../4-infra/irepositories/IparticipantRepository";
import { IPostRepository } from "../../4-infra/irepositories/IpostRepository";
import { IProjectRepository } from "../../4-infra/irepositories/IprojectRepository";
import { Followers } from "../entities/followers";
import { Interests } from "../entities/interests";
import { Participant } from "../entities/participant";
import { Project } from "../entities/project";
import { User } from "../entities/user";
import { UserProjectGoodIdea } from "../entities/userProjectGoodIdea";
import IProjectService from "../Iservices/IProjectService";

export default class ProjectService implements IProjectService {
    
    constructor(
        private readonly projectRepository: IProjectRepository, 
        private readonly followerRepository: IFollowerRepository,
        private readonly interestRepository: IInterestRepository,
        private readonly postRepository: IPostRepository,
        private readonly participantRepository: IParticipantRepository
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

    setUserProjectGoodIdea(idUser: string, idProject: string, userProjectAlreadyExist: boolean): void {
        let goodIdea = new UserProjectGoodIdea(
            idUser,
            idProject
        );
        if(userProjectAlreadyExist) {
            this.projectRepository.deleteProjectGoodIdea(goodIdea);
        } else {
            this.projectRepository.setProjectGoodIdea(goodIdea);
        }
    }

    async userProjectGoodIdeaAlreadyExist(idUser: string, idProject: string): Promise<UserProjectGoodIdea> {
        let userProject = await this.projectRepository.findUserProjectGoodIdeaById(idUser, idProject);
        return userProject;
    }

    async sumCountOfGoodIdeia(idProject: string, userProjectExist: boolean) {
        const project: any = await this.projectRepository.getById(idProject);
        if (!project) throw new Error("Project não encontrado.");

        if (userProjectExist) {
            project!.countGoodIdea--;
        } else {
            project!.countGoodIdea++;
        }
        await this.projectRepository.update(project!);
    }

    async search(userId: string, search: string): Promise<Project[]> {
        return await this.projectRepository.search(userId, search);
    }

    async getParticipants(_id: string): Promise<User[]> {
        return await this.participantRepository.getParticipants(_id);
    }
    
    async acceptParticipant(idProject: string, idUserRequest: string, role: string): Promise<void> {
        let participantRequest = await this.participantRepository.getByProjectAndUser(idProject, idUserRequest);

        if (!participantRequest) throw new Error("Solicitação não encontrada para aceitar.");

        if (participantRequest.accepted) throw new Error("Solicitação já foi aceito.");

        participantRequest.accepted = true;
        participantRequest.role = role;

        await this.participantRepository.updateParticipant(participantRequest);
    }

    async rejectParticipant(idProject: string, idUserRequest: string): Promise<void> {
        let participantRequest = await this.participantRepository.getByProjectAndUser(idProject, idUserRequest);

        if (!participantRequest) throw new Error("Solicitação não encontrada para rejeitar.");
        
        await this.participantRepository.removeParticipant(participantRequest);
    }

    async requestParticipant(idUserServer: string, idProject: string): Promise<void> {
        let participant = new Participant(
            idProject,
            idUserServer,
            false,
            ''
        );
        await this.participantRepository.requestParticipant(participant);
    }

    async removeParticipant(idProject: string, idUserRequest: string): Promise<void> {
        let participantRequest = await this.participantRepository.getByProjectAndUser(idProject, idUserRequest);

        if (!participantRequest) throw new Error("Participante não encontrada para remover.");
        
        await this.participantRepository.removeParticipant(participantRequest);
    }

}