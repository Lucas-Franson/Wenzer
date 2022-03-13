import { InterestsViewModel } from "../../1-presentation/viewmodel/InterestsViewModel";
import { Interests } from "../entities/interests";
import { Project } from "../entities/project";
import { User } from "../entities/user";


export default interface IInterestService {
    getAllInterests(): Promise<Interests[]>;
    linkUserToInterests(user: any, interests: InterestsViewModel[]): void;
    linkProjectToInterests(project: Project, interests: InterestsViewModel[]): void;
    getInterestsByUser(idUser: string): Promise<{id: string, name: string}[]>;
}