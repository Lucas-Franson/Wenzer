import { InterestsFormViewModel } from "./InterestsFormViewModel";


export class ProjectCreateViewModel {
    
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public photo: any,
        public active: boolean,
        public publicProject: boolean,
        public marketing: boolean,
        public tags: InterestsFormViewModel[],
        public created_at: Date,
        public countGoodIdea: number,
        public userId: string = "",
        public following: boolean = false,
        public user: any = null,
        public goodIdea: boolean = false,
        public participating: boolean = false
    ) {

    }
}