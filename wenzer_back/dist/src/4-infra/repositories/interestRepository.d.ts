import { Interests } from "../../3-domain/entities/interests";
import { Orm } from "./orm";
import { IInterestRepository } from "../irepositories/IinterestRepository";
import { InterestUser } from "../../3-domain/entities/interestUser";
import { ProjectInterests } from "../../3-domain/entities/projectInterests";
export declare class InterestRepository extends Orm<Interests> implements IInterestRepository {
    createLinkToUser(userInterests: any[]): Promise<void>;
    deleteLinkToUser(userInterests: string[]): Promise<void>;
    createLinkToProject(projectInterests: any[]): Promise<void>;
    deleteLinkToProject(projectInterests: string[]): Promise<void>;
    findLinkUserToInterests(userId: string): Promise<InterestUser[]>;
    findLinkProjectToInterests(projectId: string): Promise<ProjectInterests[]>;
    getInterestsByUser(idUser: string): Promise<Interests[]>;
    getInterestsByProject(idProject: string): Promise<Interests[]>;
    handleArrayResult(result: Interests[]): any[];
    handleResult(results: Interests): Interests | null;
    handleInterestUserArrayResult(results: InterestUser[]): any[];
    handleProjectInterestArrayResult(results: ProjectInterests[]): any[];
}
