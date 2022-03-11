import { InterestsViewModel } from "../../1-presentation/viewmodel/InterestsViewModel";
import { Interests } from "../entities/interests";
import { User } from "../entities/user";


export default interface IInterestService {
    getAllInterests(): Promise<Interests[]>;
    linkUserToInterests(user: any, interests: InterestsViewModel[]): void;
}