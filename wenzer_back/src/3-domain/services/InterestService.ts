import { InterestsViewModel } from "../../1-presentation/viewmodel/InterestsViewModel";
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

    async linkUserToInterests(user: User, interests: InterestsViewModel[]): Promise<void> {
        var userInterests: InterestUser[] = [];
        var deleteUserInterests: InterestUser[] = [];

        let interestUserAlreadyExist = await this.interestsRepository.findLinkUserToInterests(user._id);
        
        interests
            .filter(n => interestUserAlreadyExist
                .filter(i => i._idInterests === n.id).length === 0)
            .forEach((interest: InterestsViewModel) => 
        {
            var obj = new InterestUser(
                interest.id,
                user._id,
            );
            userInterests.push(obj);
        });

        interestUserAlreadyExist
            .filter(i => interests
                .filter(n => n.id === i._idInterests).length === 0)
            .forEach((interest: InterestUser) => 
        {
            deleteUserInterests.push(interest);
        });

        if (userInterests.length > 0) await this.interestsRepository.createLinkToUser(userInterests);

        if (deleteUserInterests.length > 0) await this.interestsRepository.deleteLinkToUser(deleteUserInterests);
    }

}