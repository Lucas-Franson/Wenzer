import { InterestsFormViewModel } from "./InterestsFormViewModel";


export class ProjectCreateViewModel {
    
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public photo: any,
        public active: boolean,
        public marketing: boolean,
        public tags: InterestsFormViewModel[],
        public created_at: Date
    ) {

    }
}