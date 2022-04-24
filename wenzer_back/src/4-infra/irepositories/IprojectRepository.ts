import { Interests } from "../../3-domain/entities/interests";
import { Project } from "../../3-domain/entities/project";
import { UserProjectGoodIdea } from "../../3-domain/entities/userProjectGoodIdea";
import { IOrm } from "./Iorm";

export interface IProjectRepository extends IOrm<Project> {
    getProjectsByUser(userId: string): Promise<Project[]>;
    getAllProjectsInHigh(): Promise<Project[]>;
    getProjectsByInterests(interests: string[]): Promise<Project[]>;
    getProjectsMarketing(interests: string[]): Promise<Project[]>;
    getCountProjectsByUser(idUser: string): Promise<{count: number}>;
    getCountParticipatingByUser(idUser: string): Promise<{count: number}>;
    verifyIfUserIsFollowingProject(idUser: string, idProject: string): Promise<boolean>;
    setProjectGoodIdea(userProjectGoodIdea: UserProjectGoodIdea): void;
    deleteProjectGoodIdea(goodIdea: UserProjectGoodIdea): void;
    findUserProjectGoodIdeaById(idUser: string, idProject: string): Promise<UserProjectGoodIdea>;
}