
export class ProjectCreateViewModel {
    
    constructor(
        private id: string,
        private name: string,
        private description: string,
        private photo: any,
        private active: boolean,
        private publicProject: boolean,
        private marketing: boolean,
        private created_at: Date
    ) {

    }
}