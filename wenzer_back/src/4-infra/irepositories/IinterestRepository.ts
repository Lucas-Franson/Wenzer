import { Interests } from "../../3-domain/entities/interests";
import { InterestUser } from "../../3-domain/entities/interestUser";
import { ProjectInterests } from "../../3-domain/entities/projectInterests";
import { IOrm } from "./Iorm";

export interface IInterestRepository extends IOrm<Interests> {
    createLinkToUser(userInterests: { _id: string }[]): Promise<void>;
    deleteLinkToUser(userInterests: string[]): Promise<void>;
    createLinkToProject(projectInterests: ProjectInterests[]): Promise<void>;
    deleteLinkToProject(projectInterests: string[]): Promise<void>;
    findLinkUserToInterests(userId: string): Promise<InterestUser[]>;
    findLinkProjectToInterests(projectId: string): Promise<ProjectInterests[]>;
    getInterestsByUser(idUser: string): Promise<Interests[]>;
    getInterestsByProject(idProject: string): Promise<Interests[]>;
}