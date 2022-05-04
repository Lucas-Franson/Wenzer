import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import { IInterestRepository } from "../../4-infra/irepositories/IinterestRepository";
import { Interests } from "../entities/interests";
import { Project } from "../entities/project";
import { User } from "../entities/user";
import IInterestService from "../Iservices/IInterestService";
export default class InterestService implements IInterestService {
    private readonly interestsRepository;
    constructor(interestsRepository: IInterestRepository);
    getAllInterests(): Promise<Interests[]>;
    linkUserToInterests(user: User, interests: InterestsFormViewModel[]): Promise<void>;
    getInterestsByUser(idUser: string): Promise<Interests[]>;
    getInterestsByProject(idProject: string): Promise<Interests[]>;
    linkProjectToInterests(project: Project, interests: InterestsFormViewModel[]): Promise<void>;
}
