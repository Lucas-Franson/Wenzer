import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import { IInterestsRepository } from "../../4-infra/irepositories/IinterestsRepository";
import { Interests } from "../entities/interests";
import { InterestUser } from "../entities/interestUser";
import { Project } from "../entities/project";
import { ProjectInterests } from "../entities/projectInterests";
import { User } from "../entities/user";
import IInterestService from "../Iservices/IInterestService";

export default class PostService implements IInterestService {

    constructor(private readonly interestsRepository: IInterestsRepository) {
        
    }

    async getAllInterests(): Promise<Interests[]> {
        return await this.interestsRepository.getAll('');
    }
    
    async linkUserToInterests(user: User, interests: InterestsFormViewModel[]): Promise<void> {
        var userInterests: InterestUser[] = [];
        var deleteUserInterests: InterestUser[] = [];
        
        let interestUserAlreadyExist = await this.interestsRepository.findLinkUserToInterests(user._id);
        
        interests
        .filter(n => interestUserAlreadyExist
            .filter(i => i._idInterests === n.value).length === 0)
            .forEach((interest: InterestsFormViewModel) => 
            {
                var obj = new InterestUser(
                    interest.value,
                    user._id,
                );
                userInterests.push(obj);
            });
                
        interestUserAlreadyExist
        .filter(i => interests
            .filter(n => n.value === i._idInterests).length === 0)
            .forEach((interest: InterestUser) => 
            {
                deleteUserInterests.push(interest);
            });
            
        if (userInterests.length > 0) await this.interestsRepository.createLinkToUser(userInterests);
        
        if (deleteUserInterests.length > 0) await this.interestsRepository.deleteLinkToUser(deleteUserInterests);
    }

    async getInterestsByUser(idUser: string): Promise<{id: string, name: string}[]> {
        return await this.interestsRepository.getInterestsByUser(idUser);
    }

    async linkProjectToInterests(project: Project, interests: InterestsFormViewModel[]): Promise<void> {
        var projectInterests: ProjectInterests[] = [];
        var deleteProjectInterests: ProjectInterests[] = [];
        
        let interestProjectsAlreadyExist = await this.interestsRepository.findLinkProjectToInterests(project._id);
        
        interests
        .filter(n => interestProjectsAlreadyExist
            .filter(i => i._idInterests === n.value).length === 0)
            .forEach((interest: InterestsFormViewModel) => 
            {
                var obj = new ProjectInterests(
                    project._id,
                    interest.value
                );
                projectInterests.push(obj);
            });
                
            interestProjectsAlreadyExist
        .filter(i => interests
            .filter(n => n.value === i._idInterests).length === 0)
            .forEach((interest: ProjectInterests) => 
            {
                deleteProjectInterests.push(interest);
            });
            
        if (projectInterests.length > 0) await this.interestsRepository.createLinkToProject(projectInterests);
        
        if (deleteProjectInterests.length > 0) await this.interestsRepository.deleteLinkToProject(deleteProjectInterests);
    }
                
}