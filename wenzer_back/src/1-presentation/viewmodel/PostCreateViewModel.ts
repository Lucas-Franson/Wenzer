

export default class PostCreateViewModel {

    constructor(
        public _id: string,
        public countViews: number,
        public title: string,
        public description: string,
        public publicPost: string,
        public photo: any,
        public idProject: string,
        public created_at: Date
    ) {

    }

}