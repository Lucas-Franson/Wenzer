import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class Project extends DomainBase {

    constructor(
        public name: string,
        public description: string,
        public photo: Blob,
        public active: boolean,
        public publicProject: boolean,
        public marketing: boolean,
        public userId: string,
        public _id: string = uuid(),
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) {

        super(_id, created_at, updated_at);
    }

    getId = () => { return this._id }

    validateObject = () => {
        return true;
    }

}