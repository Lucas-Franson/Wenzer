export default class PostCreateViewModel {
    _id: string;
    countViews: number;
    title: string;
    description: string;
    publicPost: string;
    photo: any;
    idProject: string;
    created_at: Date;
    constructor(_id: string, countViews: number, title: string, description: string, publicPost: string, photo: any, idProject: string, created_at: Date);
}
