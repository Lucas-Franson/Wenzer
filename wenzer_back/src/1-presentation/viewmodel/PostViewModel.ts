import { Post } from "../../3-domain/entities/post";
import { User } from "../../3-domain/entities/user";
import UserViewModel from "./UserViewModel";

export default class PostViewModel {

    constructor(
        public id: string,
        public idUser: string,
        public countViews: number,
        public title: string,
        public description: string,
        public photo: any,
        public idProject: string,
        public created_at: Date,
        public goodIdea: boolean,
        public user: UserViewModel
    ) {

    }

}