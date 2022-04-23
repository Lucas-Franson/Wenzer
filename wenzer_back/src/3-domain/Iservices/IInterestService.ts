import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import { Interests } from "../entities/interests";
import { Project } from "../entities/project";

export default interface IInterestService {
    getAllInterests(): Promise<Interests[]>;
    linkUserToInterests(user: any, interests: InterestsFormViewModel[]): void;
    linkProjectToInterests(project: Project, interests: InterestsFormViewModel[]): void;
    getInterestsByUser(idUser: string): Promise<Interests[]>;
    getInterestsByProject(idProject: string): Promise<Interests[]>;
}