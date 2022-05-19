import UserViewModel from "./UserViewModel";
export default class PostViewModel {
    _id: string;
    idUser: string;
    countViews: number;
    title: string;
    description: string;
    photo: any;
    idProject: string;
    created_at: Date;
    goodIdea: boolean;
    user: UserViewModel;
    countGoodIdea: number;
    constructor(_id: string, idUser: string, countViews: number, title: string, description: string, photo: any, idProject: string, created_at: Date, goodIdea: boolean, user: UserViewModel, countGoodIdea: number);
}
