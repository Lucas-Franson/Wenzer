import DomainBase from './domainBase';
import { v4 as uuid } from 'uuid';

export class Connections extends DomainBase {

    constructor(
        public _idUser: string,
        public _idFollower: string,
        public _accepted: boolean,
        public _id: string = uuid(),
        public _created_at: Date = new Date(),
        public _updated_at: Date = new Date()
    ) {
            
        super(_id, _created_at, _updated_at);
    }

    validateObject = () => {
        return true;
    }

}