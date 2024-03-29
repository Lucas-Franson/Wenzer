import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class Post extends DomainBase {

    constructor(
        public idUser: string,
        public countViews: number,
        public title: string,
        public description: string,
        public photo: any,
        public idProject: string,
        public publicPost: boolean,
        public _id: string = uuid(),
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {
        
        super(_id, created_at, updated_at);
    }

    validateObject = () => {
        return true;
    }

}