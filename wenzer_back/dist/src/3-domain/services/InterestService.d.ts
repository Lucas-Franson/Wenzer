import { IInterestsRepository } from "../../4-infra/irepositories/IinterestsRepository";
import { Interests } from "../entities/interests";
import { User } from "../entities/user";
import IInterestService from "../Iservices/IInterestService";
export default class PostService implements IInterestService {
    private readonly interestsRepository;
    constructor(interestsRepository: IInterestsRepository);
    getAllInterests(): Promise<Interests[]>;
    linkUserToInterests(user: User, interests: Interests[]): Promise<void>;
}
