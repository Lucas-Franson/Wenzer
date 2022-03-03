import { IInterestsRepository } from "../../4-infra/irepositories/IinterestsRepository";
import { Interests } from "../entities/interests";
import { InterestUser } from "../entities/interestUser";
import { User } from "../entities/user";
import IInterestService from "../Iservices/IInterestService";

export default class PostService implements IInterestService {

    constructor(private readonly interestsRepository: IInterestsRepository) {
        
    }

    async getAllInterests(): Promise<Interests[]> {
        return await this.interestsRepository.getAll('');
    }

    async linkUserToInterests(user: User, interests: Interests[]): Promise<void> {
        var userInterests: InterestUser[] = [];

        let interestUserAlreadyExist = await this.interestsRepository.findLinkUserToInterests(user.id);
        
        interests
            .filter(n => interestUserAlreadyExist
                .filter(i => i.idInterests === n.id).length === 0)
            .forEach((interest: Interests) => 
        {
            var obj = new InterestUser(
                interest.id,
                user.id,
            );
            userInterests.push(obj);
        });

        this.interestsRepository.createLinkToUser(userInterests);
    }

}