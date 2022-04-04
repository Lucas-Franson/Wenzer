import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class Connections extends DomainBase {

    constructor(
        public idUser: string,
        public idFollower: string,
        public accepted: boolean,
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