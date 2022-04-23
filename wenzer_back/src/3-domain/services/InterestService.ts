import { InterestsFormViewModel } from "../../1-presentation/viewmodel/InterestsFormViewModel";
import { IInterestRepository } from "../../4-infra/irepositories/IinterestRepository";
import { Interests } from "../entities/interests";
import { InterestUser } from "../entities/interestUser";
import { Project } from "../entities/project";
import { ProjectInterests } from "../entities/projectInterests";
import { User } from "../entities/user";
import IInterestService from "../Iservices/IInterestService";

export default class InterestService implements IInterestService {

    constructor(private readonly interestsRepository: IInterestRepository) {
        
    }

    async getAllInterests(): Promise<Interests[]> {
        return await this.interestsRepository.getByWhereClause({});
    }
    
    async linkUserToInterests(user: User, interests: InterestsFormViewModel[]): Promise<void> {
        var userInterests: InterestUser[] = [];
        var deleteUserInterests: string[] = [];
        
        let interestUserAlreadyExist = await this.interestsRepository.findLinkUserToInterests(user._id);
        
        interests
        .filter(n => interestUserAlreadyExist
            .filter(i => i.idInterest === n.value).length === 0)
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
            .filter(n => n.value === i.idInterest).length === 0)
            .forEach((interest: InterestUser) => 
            {
                deleteUserInterests.push(interest._id);
            });
            
        if (userInterests.length > 0) await this.interestsRepository.createLinkToUser(userInterests);
        
        if (deleteUserInterests.length > 0) await this.interestsRepository.deleteLinkToUser(deleteUserInterests);
    }

    async getInterestsByUser(idUser: string): Promise<Interests[]> {
        return await this.interestsRepository.getInterestsByUser(idUser);
    }

    async getInterestsByProject(idProject: string): Promise<Interests[]> {
        return await this.interestsRepository.getInterestsByProject(idProject);
    }

    async linkProjectToInterests(project: Project, interests: InterestsFormViewModel[]): Promise<void> {
        var projectInterests: ProjectInterests[] = [];
        var deleteProjectInterests: string[] = [];
        
        let interestProjectsAlreadyExist = await this.interestsRepository.findLinkProjectToInterests(project._id);
        
        interests
            .filter(n => interestProjectsAlreadyExist
                .filter(i => i.idInterests === n.value).length === 0)
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
                .filter(n => n.value === i.idInterests).length === 0)
                .forEach((interest: ProjectInterests) => 
                {
                    deleteProjectInterests.push(interest._id);
                });
            
        if (projectInterests.length > 0) await this.interestsRepository.createLinkToProject(projectInterests);
        
        if (deleteProjectInterests.length > 0) await this.interestsRepository.deleteLinkToProject(deleteProjectInterests);
    }
                
}