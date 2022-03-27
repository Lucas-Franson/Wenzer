

export default class PostCreateViewModel {

    constructor(
        public _id: string,
        public _countViews: number,
        public _title: string,
        public _description: string,
        public _photo: any,
        public _idProject: string,
        public _created_at: Date
    ) {

    }

}