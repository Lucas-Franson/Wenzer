import { Interests } from "../../3-domain/entities/interests";
import { InterestUser } from "../../3-domain/entities/interestUser";
import { ProjectInterests } from "../../3-domain/entities/projectInterests";
import { IOrm } from "./Iorm";

export interface IInterestsRepository extends IOrm<Interests> {
    createLinkToUser(userInterests: InterestUser[]): Promise<void>;
    deleteLinkToUser(userInterests: InterestUser[]): Promise<void>;
    createLinkToProject(projectInterests: ProjectInterests[]): Promise<void>;
    deleteLinkToProject(projectInterests: ProjectInterests[]): Promise<void>;
    findLinkUserToInterests(userId: string): Promise<InterestUser[]>;
    findLinkProjectToInterests(projectId: string): Promise<ProjectInterests[]>;
    getInterestsByUser(idUser: string): Promise<{id: string, name: string}[]>;
}