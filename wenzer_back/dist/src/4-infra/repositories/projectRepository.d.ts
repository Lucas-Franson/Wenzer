import { Project } from "../../3-domain/entities/project";
import { IProjectRepository } from "../irepositories/IprojectRepository";
import { Orm } from "./orm";
import { UserProjectGoodIdea } from "../../3-domain/entities/userProjectGoodIdea";
export declare class ProjectRepository extends Orm<Project> implements IProjectRepository {
    insert(object: any): Promise<void>;
    getProjectsByUser(userId: string): Promise<Project[]>;
    getAllProjectsInHigh(): Promise<Project[]>;
    getProjectsByInterests(interests: string[]): Promise<Project[]>;
    getProjectsMarketing(interests: string[]): Promise<Project[]>;
    getCountProjectsByUser(idUser: string): Promise<{
        count: number;
    }>;
    getCountParticipatingByUser(idUser: string): Promise<{
        count: number;
    }>;
    verifyIfUserIsFollowingProject(idUser: string, idProject: string): Promise<boolean>;
    findUserProjectGoodIdeaById(idUser: string, idProject: string): Promise<UserProjectGoodIdea>;
    search(userId: string, search: string): Promise<Project[]>;
    deleteProjectGoodIdea(goodIdea: UserProjectGoodIdea): void;
    setProjectGoodIdea(userProjectGoodIdea: any): void;
    handleArrayResult(result: Project[]): any[];
    handleResult(results: Project): Project | null;
}
