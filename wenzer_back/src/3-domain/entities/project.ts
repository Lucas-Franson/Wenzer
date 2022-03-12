import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class Project extends DomainBase {

    constructor(
        public _name: string,
        public _description: string,
        public _photo: Blob,
        public _active: boolean,
        public _publicProject: boolean,
        public _marketing: boolean,
        public _userId: string,
        public _id: string = uuid(),
        public _created_at: Date = new Date(),
        public _updated_at: Date = new Date()
    ) {

        super(_id, _created_at, _updated_at);
    }

    getId = () => { return this._id }

    validateObject = () => {
        return true;
    }

}