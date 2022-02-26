import { Interests } from "../entities/interests";
import { User } from "../entities/user";


export default interface IInterestService {
    getAllInterests(): Promise<Interests[]>;
    linkUserToInterests(user: User, interests: Interests[]): void;
}