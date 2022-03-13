import { InterestsViewModel } from "./InterestsViewModel";

export class ProjectCreateViewModel {
    
    constructor(
        private id: string,
        private name: string,
        private description: string,
        private photo: any,
        private active: boolean,
        private publicProject: boolean,
        private marketing: boolean,
        public tags: InterestsViewModel[],
        private created_at: Date
    ) {

    }
}